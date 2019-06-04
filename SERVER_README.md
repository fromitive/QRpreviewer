# Server Readme
#
#
## 1. ������Ʈ ����
* QR�ڵ带 ��ĵ�Ͽ� ����ڰ� �ش� ��ũ�� ����Ǳ� ����, ��ũ���� ������ �ش� ����Ʈ�� ���� �� �Ǽ�����Ʈ ������ �Ǻ��� ����ڿ��� �˸��� �̸����� �ý����� �����ø����̼����� ����
---
## 2. ������Ʈ ����
* django - �� ���� (RESTful, ssl����)
* screenshoter - ���� �������� ��ũ������ ����
* whois API - �� �������� ������ ����
* virustotal API - �� �������� �Ǽ� ���� ������ ����
---
## 3. ������Ʈ ��ġ
#####	1) ������Ű��
* django - Django �� ������ �����ϱ� ���� �ʼ� ��Ű���̴�.
* djangorestframework - ������ Ŭ���̾�Ʈ�� RESTFUL API�� ����ϱ� ���� ��Ű���̴�.
* django-sslserver - MediaDevice�� ����ϱ� ���� Django web-server�� SSL�� �����Ű�� ��Ű���̴�.
* selenium - Ŭ���̾�Ʈ ��� ����Ʈ�� �����Ͽ� ��ũ������ ĸó�ϱ� ���� ��Ű���̴�.
* requests - HTTP ��û�� ������ Python ��Ű���̸�, Whois,Virustotal API�� ��Ȱ�� ����ϱ� ���� �ʿ��ϴ�.

#####	2) ��ġ ���
* 2-1) ����ȯ�� ����

    �� �� ������Ʈ������ Python 3.7.3 ������ ����Ͽ���, �Ʒ��� ��ġ ����� Python�� ��ġ�Ǿ��ٰ� ������ ���� ��ġ ����Դϴ�. ���� Python�� ��ġ�Ǿ����� �ʴٸ�, ���� Python�� ��ġ�Ͽ� �ֽñ� �ٶ��ϴ�.
    * Linux
        ```sh
        $ python3 -m venv env
        $ source env/bin/activate
        ```
    * Windows
        ```sh
        $ python -m venv env
        $ env/Scripts/activate
        ```
    #
    ```sh
    (env)$ 
    ```
    ���� ���� ��� ������Ʈ ������ ����ȯ�� �̸��� ���´ٸ� ����ȯ�� ������ �Ϸ�� ���̴�.

* 2-2) ��Ű�� ��ġ

    �� ��� ��Ű�� ��ġ�� ����ȯ�濡�� �̷������.
    * pip ���� ���׷��̵�
         * Linux
            ```sh
            (env)$ pip install --upgrade pip
            ```
        * Windows
            ```sh
            (env)$ python -m pip install --upgrade pip
            ```
    * django ��Ű�� ��ġ - �� ������Ʈ������ Django 2.0.0 ������ ����Ͽ���.
        ```sh
        (env)$ pip install django~=2.0.0
        ```
    * djangorestframework ��Ű�� ��ġ
         ```sh
        (env)$ pip install djangorestframework
        ```
    * django-sslserver ��Ű�� ��ġ
        ```sh
        (env)$ pip install django-sslserver
        ```
    * selenium ��Ű�� ��ġ
        ```sh
        (env)$ pip install selenium
        ```
    * requests ��Ű�� ��ġ
        ```sh
        (env)$ pip install requests
        ```
    
* 2-3) django ����
    * makemigrations - ���� ��������� ���Ϸ� ����
        ```sh
        (env)$ python manage.py makemigrations app
        ```
    * migrate - ������ ������� ������ DB�� ����
        ```sh
        (env)$ python manage.py migrate
        ```
* 2-4) Screenshoter ����
    * ȯ�� ���� ����
    selenium�� webdriver�� ������ �ν��ϱ� ���ؼ��� ȯ�溯���� ������ �ʿ䰡 �ִ�. webdriver�� ���� Ǯ� �ش� ���丮�� PATH ������ �߰����ش�. Linux �������� Ȩ ���丮 �ȿ� �ڽ��� bash���� ����Ѵٸ� .bashrc�� ������ ���� ���� �߰����ش�.
    
         ```sh
        PATH=$PATH:/path/to/webdriver/directory
        ```
#####	3) ���� ���
* 3-1) �׽�Ʈ ���� ���
    ssl�� ������ ������ �����ϴ� ����� �Ʒ��� ����.
    ```sh
    (env)$ python manage.py runsslserver
    ```
* 3-2) ����� ���� ���
    settings.py �� ���� ALLOWED_HOSTS �� �Ʒ��� ���� ����� �������� �߰��Ѵ�.
    ```sh
    # settings.py
    
    ALLOWED_HOSTS = [
        ...,
        '.moosong.iptime.org',
    ]
    ```
    �Ʒ��� ���� ��Ʈ��ȣ�� ������ ������ �����Ѵ�.
    ```sh
    (env)$ python manage.py runserver 0.0.0.0:8000
    ```