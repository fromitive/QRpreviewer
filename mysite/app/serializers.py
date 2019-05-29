from .models import *
from rest_framework import serializers


class QRInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRInfo
        fields = ('url',)
    def save(self,instance):
        instance.url = self.validated_data['url'] 
        instance.save()
        return instance
        
class ScreenshotInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScreenshotInfo
        fields = ('imgPath',) 
       
        
class DomainNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainName
        fields = ('name',)
class EmailInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailInfo
        fields = ('email',)

class WhoisInfoSerializer(serializers.ModelSerializer):
    domainNames = DomainNameSerializer(many=True,read_only=True)
    emails = EmailInfoSerializer(many=True,read_only=True)
    class Meta:
        model = WhoisInfo
        fields = ('registrar','org','address','city','country','domainNames','emails',)

class machineNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = machineName
        fields = '__all__'

class ScanInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanInfo
        fields = ('machineName','detected','result') 

class VirusTotalInfoSerializer(serializers.ModelSerializer):
    scanResult= ScanInfoSerializer(many=True,read_only=True)
    class Meta:
        model = VirusTotalInfo
        fields = ('scanDate','positives','total','scanResult',) 
"""
class TestSerializer(serializers.ModelSerializer):
    whoisInfo = WhoisInfoSerializer(read_only=True)
    virusInfo = VirusTotalInfoSerializer(read_only=True)
    class Meta:
        model = QRInfo
        fields = ('url','whoisInfo','virusInfo')
"""
class TestSerializer(serializers.ModelSerializer):
    scrInfo = ScreenshotInfoSerializer(read_only=True)
    whoisInfo = WhoisInfoSerializer(read_only=True)
    virusInfo = VirusTotalInfoSerializer(read_only=True)
    class Meta:
        model = QRInfo
        fields = ('url','scrInfo','whoisInfo','virusInfo')
