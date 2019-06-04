var constraints = window.constraints = {
  video:{
	  facingMode:{
		  exact:'environment'
	  }
  }
}; // 카메라를 사용하기위해 constraints 속성을 설정해준다.
var video = document.getElementById('video'); // video tag assign
var canvas = document.getElementById('qr-canvas'); // for capturing picture
var context = canvas.getContext('2d'); //for capturing picture 2
var current_decoded="";//디코딩한 결과 저장
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints); //사용 가능한 카메라를 불러온다,
    handleSuccess(stream); //불러오는데 성공했다면 이 함수를 호출한다.
  } catch (e) {
    alert('cannot open camera :' + e);
  }
  qrcode.callback = read;
}

function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function read(result) {
  current_decoded = result;
  var infoData = sendURL(result); // return JSON data
  modifyModalTitle(result);
  parse(infoData);
  if(infoData.virusInfo.positives > 0){
	  changeModalTheme('danger');
  }
  else{
	  changeModalTheme('info');
  }
	
  autoModal(current_decoded);
}
function modifyModalTitle(title){
	if(title.length > 25){
		title[25] = 0;
		title+="...";
	}
	$('#modalTitle').text(title);
}
// autoModal
function autoModal(result_url) {
  if (result_url != 0) {
    $(document).ready(function() {
      // Show modal on page load
      $("#qrResult").modal('show');
    });
    document.getElementById("web_print").innerHTML = result_url;

  } 
  else {
    return;
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

//MODAL FUNCTION
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
//MODAL FUNCTION END

//START PARSE FUNCTION
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
	if(whoisInfo === null){
		clearText();
		return;
	}
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
		else{
			jqueryElement.text('');
		}
}

//end whoisInfo
//parse virusInfo
function parseVirusTotal(virusInfo){
	if(virusInfo === null){
		clearText();
		return;
	}
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
//END PARSE FUNCTION
function captureToCanvas() {
  try {
    context.drawImage(video, 0, 0);
    qrcode.decode();
    setTimeout(captureToCanvas, 1000);
  } catch (e) {
    console.log(e)
    setTimeout(captureToCanvas, 1000);
  }
}
//event handle
setTimeout(captureToCanvas, 1000);

$("#btnopen").on("click",function(){
 window.open(current_decoded, "_blank");
});
$("#btnclose").click(function() {
  $("#qrResult").modal('hide');
});
