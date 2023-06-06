// login form js

var modal = document.getElementById("account");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// camera access

function openCam() {
  let All_mediaDevices = navigator.mediaDevices;
  if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }

  All_mediaDevices.getUserMedia({ audio: true, video: true })
    .then(function (vidStream) {
      var video = document.getElementById("videoCam");
      if ("srcObject" in video) {
        video.srcObject = vidStream;
      } else {
        video.src = window.URL.createObjectURL(vidStream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
      };

      document.getElementById("camera").style.display = "block";
    })
    .catch(function (e) {
      console.log(e.name + ": " + e.message);
    });
}

function closeCam() {
  var video = document.getElementById("videoCam");
  if (video.srcObject) {
    video.pause();
    video.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    video.srcObject = null;
  }

  document.getElementById("camera").style.display = "none";
}

window.onclick = function (event) {
  var camera = document.getElementById("camera");
  if (event.target == camera) {
    closeCam();
  }
};