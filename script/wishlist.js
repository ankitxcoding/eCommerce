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
    let productName = document.createElement("h4");
    let productPrice = document.createElement("h4");
    let productQuantity = document.createElement("h4");

    productImage.src = item.preview;
    productName.textContent = item.name;
    productPrice.textContent = `Price: Rs. ${item.price}`;
    productQuantity.textContent = `Quantity: ${item.quantity}`;

    cartItem.appendChild(productImage);
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productQuantity);
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