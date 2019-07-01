from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,renderer_classes
from rest_framework.renderers import JSONRenderer
from .serializers import * # include models module
from .vt_validate.vt_api import * #for vt_api
from .webDriver.launchWebDriver import WebDriver #for WebDriver
from datetime import datetime
import whois
import os
import sys
def mainPage(request):
    return render(request,'main/main.html',{})

def ServicesPage(request):
    return render(request,'main/services.html',{})

def aboutPage(request):
    return render(request,'main/about.html',{})

def contactPage(request):
    return render(request,'main/contact.html',{})

@api_view(['GET'])
@renderer_classes((JSONRenderer,))
def processing(request,url):
    print(url)
    if QRInfo.objects.filter(url=url).exists():
        print("exist!!!") 
        qrinfo = QRInfo.objects.get(url=url) 
        serial = TestSerializer(qrinfo)
        return Response(serial.data)
    else:
        try:
            #Critical Section Start
            print('-'*40,'entering Critical Section')
            while CriticalSection.objects.get(pk=1).lock:
                pass
            c = CriticalSection.objects.get(pk=1)
            c.lock=True
            c.save()

            w = WebDriver() 
            #connect web site
            w.openDriver()
            w.driver.get(url)
            #get original url
            original_url = w.driver.execute_script("return window.location.href") 
            url_dict = {'url':url,'original_url':original_url}
            qrseri = QRInfoSerializer(data=url_dict) 
            
            #validate url
            qrseri.is_valid(raise_exception=True) 
            qrinfo = QRInfo()
            qrinfo = qrseri.save(qrinfo)
            #1. get screenshot
            saveScreenshotInfo(qrinfo,w)
            c.lock=False
            c.save()
            print('-'*40,'relase Critical Section')
            #Critical Section End
            #2 call virustotal api
            saveVirusTotalInfo(qrinfo)
            #3 call whoisapi from url
            saveWhoisInfo(qrinfo)
            #4 generate serializer
            result = TestSerializer(qrinfo)
            print('data is :',result.data)
            return Response(result.data)
        except Exception as e:
           _,_, tb = sys.exc_info()
           print("[DEBUG] validate error : ",e)
           print("[DEBUG] error line no =",tb.tb_lineno)
           qrinfo.delete()
           return Response(qrseri.errors,status=status.HTTP_400_BAD_REQUEST)  #todo : 500 error
# Create your views here.

def saveVirusTotalInfo(qrinfo):
    try:
        vt_api_info = getVirInfo(qrinfo.original_url) # dict형
        print(vt_api_info)
        virInfo = VirusTotalInfo(qrInfo=qrinfo,scanDate=vt_api_info['scanDate'],positives=vt_api_info['positives'],total=vt_api_info['total'])
        virInfo.save()
        #machineName save & scanInfo save
        for mname in vt_api_info['scanInfo'].keys():
            if not machineName.objects.filter(name=mname).exists():
                print(mname,"not saved")
                mnameModel = machineName(name=mname)
                mnameModel.save()
            mnameModel = machineName.objects.get(name=mname)
            sinfo = ScanInfo(vInfo=virInfo,machineName=mnameModel,detected=vt_api_info['scanInfo'][mname]['detected'],result=vt_api_info['scanInfo'][mname]['result'])
            sinfo.save()
    except Exception as e:
        print("DEBUG virustotal api error",e)

def saveWhoisInfo(qrinfo):
    try:
        whoisRAWInfo = whois.whois(qrinfo.original_url)

        wInfo = WhoisInfo(qrInfo=qrinfo, registrar=whoisRAWInfo['registrar'], 
                org=whoisRAWInfo['org'], address=whoisRAWInfo['address'], 
                city=whoisRAWInfo['city'], country=whoisRAWInfo['country'])
        

        #2-4 winfo.save()
        wInfo.save()

        #2-5 Save domainname 
        if type(whoisRAWInfo['domain_name']) == list:
            for domainName in whoisRAWInfo['domain_name']:
                dn = DomainName(name=domainName,wInfo=wInfo)
                dn.save()
        else:
            dn = DomainName(name=whoisRAWInfo['domain_name'],wInfo=wInfo)
            dn.save()
        
        #2-6 Save emails
        if type(whoisRAWInfo['emails']) == list:
            for email in whoisRAWInfo['emails']:
                eInfo = EmailInfo(email=email,wInfo=wInfo)
                eInfo.save()
        else:
            eInfo = EmailInfo(email=whoisRAWInfo['emails'],wInfo=wInfo)
            eInfo.save()
    except Exception as e:
        print("[debug] whois api error!",e)

def saveScreenshotInfo(qrinfo,w):
    try:
        dir_path = 'app/static/images'
        now = str(datetime.now().timestamp())  
        imgPath=''.join([now,'_image.png'])
        fullPath = os.path.join(dir_path,imgPath)
        #saveScreenshot
        status = w.driver.save_screenshot(fullPath) 
        print('Screenshot Captured : ',status)
        sinfo = ScreenshotInfo(qrInfo=qrinfo,imgPath=imgPath)
        sinfo.save() 
    except Exception as e:
        print("[debug] screenshot error",e)
