from .vt_validate.vt_api import *
from app.models import *

def validate():
    qrinfo = QRInfo.objects.get(url='http://5.188.231.47/1/')
    vt_api_info= getVirInfo("http://5.188.231.47/1/")
    try:
        #save virInfo
        #virInfo = VirusTotalInfo(qrInfo=qrinfo,scanDate=vt_api_info['scanDate'],positives=vt_api_info['positives'],total=vt_api_info['total'])
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
        print('save completed!')
    except Exception as e:
        print('validate error : ',e)


