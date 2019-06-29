import os
import sys
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from datetime import datetime
mobile_emulation = {
"deviceMetrics": { "width": 360, "height": 640, "pixelRatio": 3.0 },
"userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19" 
}
session = 'session.tmp'

class WebDriver():
    def __init__(self):
        self.driver = None
    def openDriver(self):
        try:
            chrome_options = ChromeOptions()
            #chrome_options.add_argument("headless")
            chrome_options.add_argument("window-size=360,640")
            chrome_options.add_argument("disable-gpu")
            chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
            capabilities = chrome_options.to_capabilities()
            driver = webdriver.Remote('http://127.0.0.1:4444/wd/hub',desired_capabilities=capabilities)
            self.driver = driver        
            if not os.path.exists(session):     
                with open(session,'w') as f:
                    f.write(driver.session_id)
                print("webdriver up!")
            else:
                self.driver.close()
                with open(session,'r') as f:
                    self.driver.session_id = f.read()
                    print("webdriver up!")
                    
                    
            """
            execute_script("return window.location.origin")
            page_source
            """
            #driver.get(self.url)
            
            #now = str(datetime.now().timestamp())
            #driver.implicitly_wait(3)
            #what = driver.save_screenshot(full_path)

            #print(what)
            #driver.close()
            #return self.img_name
        except Exception as e:
            print("[debug] WebDriver open ERROR :",e)


