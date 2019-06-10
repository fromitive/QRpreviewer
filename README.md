# QR-shield(QR previewer)
qr코드를 스캔하여 웹 접속 없이 미리볼 수 있는 웹 앱 기반 서비스
# Demo
![Alt Text](https://github.com/fromitive/QRpreviewer/raw/master/resource/demo.gif)

# 특징
- 이용자가 대상 qr코드의 url에 직접 접근 없이 내용물을 볼 수 있다.
- 웹 앱 기반 서비스로서 별도의 앱 설치 없이 이용 할 수 있다.
- 서버 정보 제공을 RESTful API 기반으로 제공하기 때문에 여러 플랫폼으로 개발 가능하다.

# Tech
### client
- [webQR](https://github.com/LazarSoft/jsqrcode) - javascript QR코드 스캔 모듈
- [webRCT](https://webrtc.org/start/) - QR코드를 찍기 위한 카메라 모듈 
- [mdbootstrap](https://mdbootstrap.com/) - 서비스 화면 디자인

### server
- [django](https://www.djangoproject.com/) - 파이썬 기반 웹 서버 프레임 워크
- [djangosslserver](https://github.com/teddziuba/django-sslserver) - 카메라 모듈 이용을 위한 django용 ssl적용 모듈
- [djangorestframework](https://www.django-rest-framework.org/) - RESTful API 제공을 위한 django용 프레임 워크
- [pywhois](https://pypi.org/project/pywhois/) - 사이트 정보 제공을 위한 파이썬 기반 모듈
- [virustotal API](https://developers.virustotal.com/reference) - 악성 사이트 여부를 판단하기 위한 RESTful API
- [selenium](https://www.seleniumhq.org/) - 웹 페이지의 스크린샷을 찍기 위한 모듈

# Installation
[SERVER_README.md](https://github.com/fromitive/QRpreviewer/blob/master/SERVER_README.md) 참고

# 개발 가이드
[Guides](https://github.com/fromitive/QRpreviewer/tree/master/Guides)폴더에서 각 구성 별 가이드를 제공합니다. 제공하는 항목은 다음과 같습니다.

| 가이드 명 | 내용 |
| ------ | ------ |
| Client 개발 가이드.pdf | 클라이언트에 대한 전체적인 구조를 설명 |
| Django 서버 구축 가이드.pdf | django 환경을 설치하는 방법 설명|
| DjangoRESTful API 개발 가이드.pdf | django에서 RESTfulAPI를 적용하는 방법에 대한 설명 |
| VirusTotal_API 사용 가이드.pdf | virustotal API 사용과 적용 가이드 |
| Whois_API 사용 가이드.pdf | whois모듈 사용과 적용 가이드 |
| 스크린샷 모듈(screenshoter) 사용 가이드.pdf| 스크린샷 모듈 환경 설치와 적용 가이드 |

# 만든이들
**2019 케이실드 주니어 2기 좋은징조 팀**

이무송,이태희,김도엽,김형훈,윤도훈



