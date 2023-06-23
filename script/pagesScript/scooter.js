// home page content

let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
let ContainerClothing = document.getElementById("containerClothing");
let ContainerAccessories = document.getElementById("containerAccessories");

async function FetchData() {
  try {
    let res = await fetch("https://6495d4bdb08e17c91792bd9f.mockapi.io/scooter");
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