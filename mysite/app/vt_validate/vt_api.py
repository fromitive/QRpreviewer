import requests
import os
import datetime
#return json virustotal info
def requestVirAPI(resource): # API이용해 데이터 가져옴
    url = 'https://www.virustotal.com/vtapi/v2/url/report'
    #1. open api key
    try:
        print(os.getcwd())
        with open('apikey.txt','r') as f:
            key = f.read()
            key = key.replace("\n","")
            print(key)
            params = {'apikey':key, 'resource':resource}
            response = requests.get(url, params=params)
            return response.json() # JSON형태를 dict형태로 return
    except Exception as e:
        print('[DEBUG] VT_API error:', e)

def extractScanInfo(scanInfo): # vInfo, machineName, detected, result
    # parsing ScanInfo
    result = dict()
    for machineName in scanInfo.keys():
        if scanInfo[machineName]['detected']:
            # 서버안전을 위해 일단은 not으로 test함 원래는 탐지된것만 파싱
            result.update({machineName:scanInfo[machineName]})
    return result # dict형

def getVirInfo(resource):
    # 이 함수가 위의 두 함수의 내용을 포함하고 있음
    result = dict()
    jsonData=requestVirAPI(resource)
    if jsonData['response_code'] == 1:
        result.update({'scanDate':jsonData['scan_date']})
        result.update({'positives':jsonData['positives']})
        result.update({'total':jsonData['total']})
        scanInfo = extractScanInfo(jsonData['scans'])
        result.update({'scanInfo':scanInfo})
        return result # dict형
    else:
        result.update({'scanDate':str(datetime.datetime.now())})
        result.update({'positives':0})
        result.update({'total':0})
        result.update({'scanInfo':{}})
        return result # dict형

