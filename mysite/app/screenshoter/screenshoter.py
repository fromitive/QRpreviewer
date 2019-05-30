import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from datetime import datetime
mobile_emulation = {

"deviceMetrics": { "width": 360, "height": 640, "pixelRatio": 3.0 },

"userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19" }

class Screenshoter:
    def __init__(self,url,dir_path):
        self.url = url    
        self.dir_path = dir_path 
        self.img_name = None

    def shot(self):
        try:
            chrome_options = Options()
            chrome_options.add_argument("headless")
            chrome_options.add_argument("window-size=360,640")
            chrome_options.add_argument("disable-gpu")
            chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
            driver = webdriver.Chrome(chrome_options = chrome_options)
            print("webdriver up!")
            driver.get(self.url)

            now = str(datetime.now().timestamp())
            self.img_name = ''.join([now,'_image.png'])
            full_path = os.path.join(self.dir_path,self.img_name) 
            driver.implicitly_wait(3)
            what = driver.save_screenshot(full_path)

            print(what)
            driver.close()
            return self.img_name
        except Exception as e:
            print("[debug] driver load ERROR :",e) 
