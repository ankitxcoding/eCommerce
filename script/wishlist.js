let CartArr = JSON.parse(localStorage.getItem("cart")) || [];
let CartList = document.getElementById("cart-list");
let ClearCartBtn = document.getElementById("clear-cart");

function updateCart() {
  CartList.innerHTML = "";
  CartArr.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.id="box";
    let productImage = document.createElement("img");
    let productInfo = document.createElement("div");
    let productName = document.createElement("h3");
    let productPrice = document.createElement("h2");
    let productBrand = document.createElement("h4");

    productImage.src = item.preview;
    productName.textContent = item.name;
    productPrice.textContent = `Rs. ${item.price}`;
    productBrand.textContent = item.brand;

    cartItem.appendChild(productImage);
    productInfo.appendChild(productName);
    productInfo.appendChild(productBrand);
    productInfo.appendChild(productPrice);
    cartItem.appendChild(productInfo);
    CartList.appendChild(cartItem);
  });
  CartList.classList.add("inline-list");
}

function clearCart() {
  CartArr = [];
  localStorage.removeItem("cart");
  updateCart();
}

ClearCartBtn.addEventListener("click", clearCart);

updateCart();