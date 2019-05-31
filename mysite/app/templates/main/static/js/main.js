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
