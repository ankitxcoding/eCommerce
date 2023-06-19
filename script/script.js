// global variable

let data;

// categories

document.addEventListener('DOMContentLoaded', function() {
  var categoryDetails = document.querySelectorAll('.categories details');
  categoryDetails.forEach(function(details) {
      var summary = details.querySelector('summary');

      details.addEventListener('mouseover', function() {
          if (!summary.hasAttribute('clicked')) {
              this.setAttribute('open', '');
          }
      });
      details.addEventListener('mouseout', function() {
          if (!summary.hasAttribute('clicked')) {
              this.removeAttribute('open');
          }
      });

      summary.addEventListener('click', function(e) {
          e.preventDefault();
          if (details.hasAttribute('open')) {
              details.removeAttribute('open');
              summary.removeAttribute('clicked');
          } else {
              details.setAttribute('open', '');
              summary.setAttribute('clicked', '');
          }

          categoryDetails.forEach(function(otherDetails) {
              if (otherDetails !== details) {
                  otherDetails.removeAttribute('open');
                  var otherSummary = otherDetails.querySelector('summary');
                  otherSummary.removeAttribute('clicked');
              }
          });
      });
  });
});

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

// home page slider

$(document).ready(function() {
  $('#containerSlider').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    });
});

// home page content

let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
let ContainerClothing = document.getElementById("containerClothing");
let ContainerAccessories = document.getElementById("containerAccessories");

async function FetchData() {
  try {
    let res = await fetch("https://648050cdf061e6ec4d490d80.mockapi.io/product");
    if (res.ok) {
      data = await res.json();
      DisplayProducts(data);
    } else {
      console.log("Request failed with status:", res.status);
    }
  } catch (err) {
    console.log(err);
  }
}

FetchData();

function DisplayProducts(data) {
  ContainerClothing.innerHTML = "";
  ContainerAccessories.innerHTML = "";

  data.forEach((product) => {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");

    let imgTag = document.createElement("img");
    imgTag.src = product.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(product.name);
    h3.appendChild(h3Text);

    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(product.brand);
    h4.appendChild(h4Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("Rs. " + product.price);
    h2.appendChild(h2Text);

    let add_to_cart = document.createElement("button");
    add_to_cart.textContent = "Wishlist";

    add_to_cart.addEventListener("click", () => {
      if (checkDuplicate(product)) {
        alert("Product Already in Wishlist");
      } else {
        CartArr.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(CartArr));
        alert("Product Added To Wishlist");
      }
    });

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);
    detailsDiv.appendChild(add_to_cart);

    if (product.isAccessory) {
      ContainerAccessories.appendChild(boxDiv);
    } else {
      ContainerClothing.appendChild(boxDiv);
    }
  });
}

function checkDuplicate(product) {
  for (let i = 0; i < CartArr.length; i++) {
    if (CartArr[i].id === product.id) {
      return true;
    }
  }
  return false;
}

// search functionality

var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  var searchTerm = searchInput.value.toLowerCase();
  var filteredData = data.filter(function(product) {
    return product.name.toLowerCase().includes(searchTerm);
  });
  DisplayProducts(filteredData);
});

FetchData();