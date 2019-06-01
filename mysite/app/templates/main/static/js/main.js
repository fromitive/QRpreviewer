var constraints = window.constraints = {
  video:{
	  facingMode:{
		  exact:'environment'
	  }
  }
}; // 카메라를 사용하기위해 constraints 속성을 설정해준다.
var infoNaver = {"url":"http://www.naver.com","scrInfo":{"imgPath":"1559125048.284063_image.png"},"whoisInfo":{"registrar":"Gabia, Inc.","org":"NAVER Corp.","address":"6 Buljung-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, 463-867, Korea","city":"Gyeonggi","country":"KR","domainNames":[{"name":"NAVER.COM"},{"name":"naver.com"}],"emails":[{"email":"white.4818@navercorp.com"},{"email":"dl_ssl@navercorp.com"},{"email":"abuse@gabia.com"}]},"virusInfo":{"scanDate":"2019-05-29T09:26:17Z","positives":0,"total":66,"scanResult":[]}}; 
var infoMalsite = {"url":"http://5.188.231.47/1","scrInfo":{"imgPath":"malsite"},"whoisInfo":{"registrar":null,"org":null,"address":null,"city":null,"country":null,"domainNames":[{"name":null}],"emails":[{"email":null}]},"virusInfo":{"scanDate":"2019-05-29T23:16:18Z","positives":9,"total":67,"scanResult":[{"machineName":"BitDefender","detected":true,"result":"malware site"},{"machineName":"Trustwave","detected":true,"result":"malicious site"},{"machineName":"CyRadar","detected":true,"result":"malicious site"},{"machineName":"Malc0de Database","detected":true,"result":"malicious site"},{"machineName":"Avira","detected":true,"result":"phishing site"},{"machineName":"Forcepoint ThreatSeeker","detected":true,"result":"malicious site"},{"machineName":"Sophos","detected":true,"result":"malicious site"},{"machineName":"CRDF","detected":true,"result":"malicious site"},{"machineName":"Fortinet","detected":true,"result":"malware site"}]}};
var infoNomal =  {"url":"https://kshieldjr.org","scrInfo":{"imgPath":"1559206199.657372_image.png"},"whoisInfo":{"registrar":"Megazone Corp., dba HOSTING.KR","org":"HAN DONGHO","address":"50, 602-302(dangye-dong, sung-il apt) Moraenae-gil,  Wonju-si","city":"Gangwon-do","country":"KR","domainNames":[{"name":"KSHIELDJR.ORG"},{"name":"kshieldjr.org"}],"emails":[{"email":"abuse@hosting.kr"},{"email":"help@hosting.kr"},{"email":"mobitant@gmail.com"}]},"virusInfo":{"scanDate":"2019-05-30T08:49:54.716740Z","positives":0,"total":0,"scanResult":[]}}

var video = document.getElementById('video'); // video tag assign
var canvas = document.getElementById('qr-canvas'); // for capturing picture
var context = canvas.getContext('2d'); //for capturing picture 2
async function init() {
}

function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function read(result) {
  var result_url = result
  var infoData = sendURL(result); // return JSON data
  autoModal(result_url);
  autoModal_attr(result_url);
}

// autoModal
function autoModal(result_url) {
  if (result_url != 0) {
    $(document).ready(function() {
      // Show modal on page load
      $("#qrResult").modal('show');

      // Hide modal on button click
      $(".hide-modal").click(function() {
        $("#qrResult").modal('hide');
      });
    });
    document.getElementById("web_print").innerHTML = result_url;
    var urlMove = document.getElementById("modal_yes_btn");
    urlMove.onclick = function() {
      window.open(result_url, "_blank");
    }



  } else {
    return;
  }
}


function autoModal_attr(result_url)
{
  var modal_level=document.getElementById("modal_level");
  var modal_yes_btn=document.getElementById("modal_yes_btn");
  var modal_no_btn=document.getElementById("modal_no_btn");

  if(result_url!=0)
  {
    modal_level.className='modal-dialog modal-dialog-centered modal-lg modal-notify modal-success'
    modal_yes_btn.className='btn btn-success'
    modal_no_btn.className='btn btn-outline-success waves-effect'
  }/*
  else if(result_url!=0)
  {
    modal_level.className='modal-dialog modal-dialog-centered modal-lg modal-notify modal-danger'
    modal_yes_btn.className='btn btn-danger'
    modal_no_btn.className='btn btn-outline-danger waves-effect'
  }
  else (result_url!=0)
  {
    modal_level.className='modal-dialog modal-dialog-centered modal-lg modal-notify modal-warning'
    modal_yes_btn.className='btn btn-warning'
    modal_no_btn.className='btn btn-outline-warning waves-effect'
  }
  */
}
function captureToCanvas() {
  try {
    context.drawImage(video, 0, 0);
    qrcode.decode();
    setTimeout(captureToCanvas, 3000);
  } catch (e) {
    console.log(e)
    setTimeout(captureToCanvas, 3000);
  }
}

//GET JSON DATA about URL
function sendURL(url){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","https://moosong.iptime.org:8000/processing/"+url,false);
	xhttp.send();
	var raw = xhttp.responseText 
	return JSON.parse(raw);
}
//display modal-info or modal-danger
function changeThemeClass(classList,className,elem){
	for(var i = 0; i < classList.length ; i++){
		if(elem.classList.contains(classList[i])){
			elem.classList.remove(classList[i])
		}
	}
	elem.classList.add(className);
}
function changeModalTheme(themeName){
	var elemBtn  = $("#btnopen")[0];
	var elemOutlineBtn = $("#btnclose")[0];
        var elemModalColor = $("#modal-color")[0];		

 	titleclassList = ['modal-info','modal-danger'];	
	btnClassList = ['btn-primary','btn-danger'];
	btnOutlineClassList = ['btn-outline-primary','btn-outline-danger'];
	switch(themeName){
		case 'info':
			changeThemeClass(titleclassList,'modal-info',elemModalColor);
			elemBtn.style.display="";
			changeInfoNameColor("#0062CC");
			changeThemeClass(btnOutlineClassList,'btn-outline-primary',elemOutlineBtn);
		break;
		case 'danger':
			changeThemeClass(titleclassList,'modal-danger',elemModalColor);
			changeInfoNameColor("red");
			elemBtn.style.display="none";
			changeThemeClass(btnOutlineClassList,'btn-outline-danger',elemOutlineBtn);
		break;
	}
}
function changeInfoNameColor(color){
	var elemInfoName = $(".infoName");	
	for(var i =0 ; i < elemInfoName.length ;i++){
		elemInfoName[i].style.color=color;	
	}
}
//modal js end
//parsing jsoninfo and accept into modal
function parse(infoData){
	parsescrInfo(infoData.scrInfo);
	parseWhois(infoData.whoisInfo);
	parseVirusTotal(infoData.virusInfo);
}
//parse scrInfo
function parsescrInfo(scrInfo){
	var elSiteImage = $("#siteImage")[0];
	if(scrInfo.imgPath === "malsite"){
		elSiteImage.setAttribute('src','static/images/malsite.png');	
	}
	else{
		elSiteImage.setAttribute('src','static/images/'+scrInfo.imgPath);
	}
}
//end scrInfo
function clearText(){
	//whois info
	var elDomainNames = $('#wDomainNames');	
	var elRegistar = $('#wRegistar');
	var elOrg = $('#wOrg');
	var elCountry = $('#wCountry');
	var elCity = $('#wCity');
	var elAddress = $('#wAddress');
	var elEmails = $('#wEmails');
	//virustotal info
	var elScanDate = $("#vScanDate");
	var elPositivesAndTotal = $("#vPositivesAndTotal");
	var elScanResults = $("#vScanResults");
	//clear whois info
	acceptText(elDomainNames,"");
	acceptText(elRegistar,"");
	acceptText(elOrg,"");
	acceptText(elCountry,"");
	acceptText(elCity,"");
	acceptText(elAddress,"");
	acceptText(elEmails,"");
	//clear virustotal info
	acceptText(elScanDate,"");
	acceptText(elPositivesAndTotal,"");
	clearScanResult();
}
//parse whoisInfo
function parseWhois(whoisInfo){
	clearText();
	var elDomainNames = $('#wDomainNames');	
	var elRegistar = $('#wRegistar');
	var elOrg = $('#wOrg');
	var elCountry = $('#wCountry');
	var elCity = $('#wCity');
	var elAddress = $('#wAddress');
	var elEmails = $('#wEmails');
	acceptText(elDomainNames,whoisInfo.domainNames);
	acceptText(elRegistar,whoisInfo.registrar);
	acceptText(elOrg,whoisInfo.org);
	acceptText(elCountry,whoisInfo.country);
	acceptText(elCity,whoisInfo.city);
	acceptText(elAddress,whoisInfo.address);
	acceptText(elEmails,whoisInfo.emails);
}
function whoisObjectsToString(objects){
	try{

		var contents = Array();
		for(var i = 0; i < objects.length; i++){
			contents = contents.concat(objects[i].name || objects[i].email);
		}
		return contents.join('<br>');
	}
	catch(e){
		console.log(e);
		return "";
	}
			
}
function acceptText(jqueryElement,Content){
	if(typeof Content === 'object'){
		jqueryElement.html(whoisObjectsToString(Content));
	}
	else if(typeof Content === 'string'){//string
		jqueryElement.text(Content);
	}
}

//end whoisInfo
//parse virusInfo
function parseVirusTotal(virusInfo){
	var elScanDate = $("#vScanDate");
	var elPositivesAndTotal = $("#vPositivesAndTotal");
	var positivesAndTotal = virusInfo.positives+' / '+virusInfo.total;
	var elScanResults = $("#vScanResults");
	acceptText(elScanDate,virusInfo.scanDate);
	acceptText(elPositivesAndTotal,positivesAndTotal);
	addScanResult(elScanResults,virusInfo.scanResult);
}

function addScanResult(elScanResults,arrScanResults){
	//clear ScanResult before add scan result
	clearScanResult();	
	if(arrScanResults.length === 0) // if not detected
		return; // pass
	else{
		$('#vScanResults').empty();// remove scanResults		
		for(var i = 0; i < arrScanResults.length ;i ++){
			//create div element and parse Machine Name
			elMachineName = document.createElement('div');
			elMachineName.setAttribute('class','col-4');
			elMachineName.textContent = arrScanResults[i].machineName;

			//create div element and parse Scan Result
			elResult = document.createElement('div');
			elResult.setAttribute('class','col-8');
			elResult.textContent = arrScanResults[i].result;
			
			//add scanresults
			elScanResults.append(elMachineName);
			elScanResults.append(elResult);
			elScanResults.append("<hr>");
		}
	}
}
function clearScanResult(){
	var elScanResults = $('#vScanResults');
	var elNoResult = document.createElement('div');
	
	elNoResult.setAttribute('class','col-12');
	elNoResult.textContent = "발견되지 않음";
	elScanResults.empty();
	elScanResults.append(elNoResult);
	
}
//end virusInfo
