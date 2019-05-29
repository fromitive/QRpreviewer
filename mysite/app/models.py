from django.db import models

# Create your models here.
class QRInfo(models.Model):
    url = models.URLField(primary_key = True)
    
class ScreenshotInfo(models.Model):
    qrInfo = models.OneToOneField(QRInfo,related_name='scrInfo',on_delete=models.CASCADE,primary_key= True) 
    imgPath = models.CharField(max_length=200)
    
class WhoisInfo(models.Model):
    qrInfo = models.OneToOneField(QRInfo, related_name='whoisInfo', on_delete=models.CASCADE, primary_key=True)
    registrar = models.TextField(null=True)
    org = models.TextField(null=True)
    address = models.TextField()
    city = models.TextField()
    country = models.TextField(null=True)

class DomainName(models.Model):
    name = models.CharField(max_length=100,null=True) 
    wInfo = models.ForeignKey(WhoisInfo,related_name='domainNames',on_delete=models.CASCADE)

class EmailInfo(models.Model):
    email = models.EmailField()
    wInfo = models.ForeignKey(WhoisInfo,related_name='emails',on_delete=models.CASCADE)

class VirusTotalInfo(models.Model):
    qrInfo = models.OneToOneField(QRInfo,related_name='virusInfo',on_delete=models.CASCADE,primary_key= True) 
    scanDate= models.DateTimeField()        
    positives = models.IntegerField()
    total = models.IntegerField()
     
    #virustotal info here 
    
class machineName(models.Model):   
    name = models.CharField(max_length=100,primary_key=True) 

class ScanInfo(models.Model):
    vInfo = models.ForeignKey(VirusTotalInfo,related_name='scanResult',on_delete=models.CASCADE)
    machineName = models.OneToOneField(machineName,related_name='machineName',on_delete=models.CASCADE)
    detected = models.NullBooleanField()
    result = models.CharField(max_length=100)
    

