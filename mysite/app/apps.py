from django.apps import AppConfig


class AppConfig(AppConfig):
    name = 'app'
    def ready(self):
        from app.models import CriticalSection
        from app.webDriver.launchWebDriver import WebDriver
        print('[INFO] INIT ciritcalSection')
        CriticalSection = self.get_model('CriticalSection')
        c = CriticalSection.objects.get(pk=1)
        c.lock = False
        c.save()
        print('[INFO] INIT webDriver')
        first = WebDriver()
        first.openDriver()
