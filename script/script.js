// login form js

var modal = document.getElementById('account');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// camera access

function openCam(){
    let All_mediaDevices=navigator.mediaDevices
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
       console.log("getUserMedia() not supported.");
       return;
    }
    All_mediaDevices.getUserMedia({
       audio: true,
       video: true
    })
    .then(function(vidStream) {
       var video = document.getElementById('videoCam');
       if ("srcObject" in video) {
          video.srcObject = vidStream;
       } else {
          video.src = window.URL.createObjectURL(vidStream);
       }
       video.onloadedmetadata = function(e) {
          video.play();
       };
    })
    .catch(function(e) {
       console.log(e.name + ": " + e.message);
    });
}

var modal = document.getElementById('camera');
window.onclick = function(event) {
    if (event.target == webcam) {
        modal.style.display = "none";
    }
}