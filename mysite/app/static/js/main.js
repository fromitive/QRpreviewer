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

//GET JSON DATA about URL
function sendURL(url){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","https://moosong.iptime.org:8000/processing/"+url,false);
	xhttp.send();
	var raw = xhttp.responseText 
	return JSON.parse(raw);
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

setTimeout(captureToCanvas, 3000);
