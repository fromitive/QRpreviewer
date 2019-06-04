# Server Readme


## 1. 프로젝트 개요
* QR코드를 스캔하여 사용자가 해당 링크로 연결되기 전에, 스크린샷 정보와 해당 사이트의 정보 및 악성사이트 유무를 판별해 사용자에게 알리는 미리보기 시스템을 웹어플리케이션으로 개발
---
## 2. 프로젝트 구성
* django - 웹 서버 (RESTful, ssl적용)
* screenshoter - 메인 페이지의 스크린샷을 찍음
* whois API - 웹 페이지의 정보를 제공
* virustotal API - 웹 페이지의 악성 유무 정보를 제공
---
## 3. 프로젝트 설치
#####	1) 의존패키지
* django - Django 웹 서버를 구축하기 위한 필수 패키지이다.
* djangorestframework - 서버와 클라이언트가 RESTFUL API로 통신하기 위한 패키지이다.
* django-sslserver - MediaDevice를 사용하기 위해 Django web-server에 SSL을 적용시키는 패키지이다.
* selenium - 클라이언트 대신 사이트에 접속하여 스크린샷을 캡처하기 위한 패키지이다.
* requests - HTTP 요청을 보내는 Python 패키지이며, Whois,Virustotal API를 원활히 사용하기 위해 필요하다.

#####	2) 설치 방법
* 2-1) 가상환경 구성

    ※ 본 프로젝트에서는 Python 3.7.3 버전을 사용하였고, 아래의 설치 방법은 Python이 설치되었다고 가정한 후의 설치 방법입니다. 만일 Python이 설치되어있지 않다면, 먼저 Python을 설치하여 주시기 바랍니다.
    * Linux
        ```sh
        $ python3 -m venv env
        $ source env/bin/activate
        ```
    * Windows
        ```sh
        > python -m venv env
        > env/Scripts/activate
        ```
    #
    ```sh
    (env)$
    ```
    위와 같이 명령 프롬프트 좌측에 가상환경 이름이 나온다면 가상환경 적용이 완료된 것이다.

* 2-2) 패키지 설치

    ※ 모든 패키지 설치는 가상환경에서 이루어진다.
    * pip 버전 업그레이드
         * Linux
            ```sh
            (env)$ pip install --upgrade pip
            ```
        * Windows
            ```sh
            (env)> python -m pip install --upgrade pip
            ```
    * django 패키지 설치 - 본 프로젝트에서는 Django 2.0.0 버전을 사용하였다.
        ```sh
        (env)$ pip install django~=2.0.0
        ```
    * djangorestframework 패키지 설치
         ```sh
        (env)$ pip install djangorestframework
        ```
    * django-sslserver 패키지 설치
        ```sh
        (env)$ pip install django-sslserver
        ```
    * selenium 패키지 설치
        ```sh
        (env)$ pip install selenium
        ```
    * requests 패키지 설치
        ```sh
        (env)$ pip install requests
        ```
    
* 2-3) django 설정
    * makemigrations - 모델의 변경사항을 파일로 생성
        ```sh
        (env)$ python manage.py makemigrations app
        ```
    * migrate - 생성된 변경사항 파일을 DB에 적용
        ```sh
        (env)$ python manage.py migrate
        ```
* 2-4) Screenshoter 설정
    * 환경 변수 설정
    selenium이 webdriver를 온전히 인식하기 위해서는 환경변수를 설정할 필요가 있다. webdriver를 압축 풀어서 해당 디렉토리를 PATH 변수에 추가해준다. Linux 기준으로 홈 디렉토리 안에 자신이 bash쉘을 사용한다면 .bashrc에 다음과 같은 줄을 추가해준다.
    
         ```sh
        PATH=$PATH:/path/to/webdriver/directory
        ```
#####	3) 실행 방법
* 3-1) 테스트 실행 방법
    ssl을 적용해 서버를 실행하는 방법은 아래와 같다.
    ```sh
    (env)$ python manage.py runsslserver
    ```
* 3-2) 모바일 실행 방법
    settings.py 를 열고 ALLOWED_HOSTS 에 아래와 같이 사용할 도메인을 추가한다.
    ```sh
    # settings.py
    
    ALLOWED_HOSTS = [
        ...,
        '도메인 이름 또는 IP',
    ]
    ```
    아래와 같이 포트번호를 지정해 서버를 실행한다.
    ```sh
    (env)$ python manage.py runsslserver 0.0.0.0:8000
    ```
