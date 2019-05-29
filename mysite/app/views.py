from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,renderer_classes
from rest_framework.renderers import JSONRenderer
from .serializers import *
from .screenshoter.screenshoter import Screenshoter
from .vt_validate.vt_api import * #for vt_api
import whois

def mainPage(request):
    return render(request,'main/main.html',{})

@api_view(['GET'])
@renderer_classes((JSONRenderer,))
def processing(request,url):
    print(url)
    url_dict = {'url':url}
    if QRInfo.objects.filter(url=url).exists():
       print("exist!!!") 
       qrinfo = QRInfo.objects.get(url=url) 
       serial = TestSerializer(qrinfo)
       return Response(serial.data)
    else:
       qrseri = QRInfoSerializer(data=url_dict) 
       try:
            #validate url
            qrseri.is_valid(raise_exception=True) 
            qrinfo = QRInfo()
            qrinfo = qrseri.save(qrinfo)
            #1 call virustotal api
            virInfo=saveVirusTotalInfo(qrinfo)
            #2 call whoisapi from url
            saveWhoisInfo(qrinfo)
            #3. get screenshot
            if virInfo.positives:
                sinfo = ScreenshotInfo(qrInfo=qrinfo,imgPath="malsite")
                sinfo.save() 
            else:
                saveScreenshotInfo(qrinfo)

            #4 generate serializer
            result = TestSerializer(qrinfo)
            return Response(result.data)
       except Exception as e:
           print("[DEBUG] validate error : ",e)
           return Response(qrseri.errors,status=status.HTTP_400_BAD_REQUEST)  #todo : 500 error
# Create your views here.

def saveVirusTotalInfo(qrinfo):
    vt_api_info = getVirInfo(qrinfo.url) # dict형
    virInfo = VirusTotalInfo(qrInfo=qrinfo,scanDate=vt_api_info['scanDate'],positives=vt_api_info['positives'],total=vt_api_info['total'])
    virInfo.save()
    #machineName save & scanInfo save
    for mname in vt_api_info['scanInfo'].keys():
        mnameModel = None
        if not machineName.objects.filter(name=mname).exists():
            print(mname,"not saved")
            mnameModel = machineName(name=mname)
            mnameModel.save()
        else:
            mnameModel = machineName.objects.get(name=mname)
        sinfo = ScanInfo(vInfo=virInfo,machineName=mnameModel,detected=vt_api_info['scanInfo'][mname]['detected'],result=vt_api_info['scanInfo'][mname]['result'])
        sinfo.save()
    return virInfo

def saveWhoisInfo(qrinfo):
    whoisRAWInfo = whois.whois(qrinfo.url)

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
        eInfo = EmailInfo(name=whoisRAWInfo['emails'],wInfo=wInfo)
        eInfo.save()

def saveScreenshotInfo(qrinfo):
    dir_path = 'app/static/images'
    shoter = Screenshoter(qrinfo.url,dir_path) 
    imgPath= shoter.shot()
    sinfo = ScreenshotInfo(qrInfo=qrinfo,imgPath=imgPath)
    sinfo.save() 
