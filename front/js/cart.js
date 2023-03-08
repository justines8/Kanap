let productList = [];
async function getProductList() {
  const data = await fetch(`http://localhost:3000/api/products`);
  productList = await data.json();
}
async function createCartDom(id, imageUrl, name, price, color, quantity) {
  //creation section element
  const sectionElement = document.getElementById("cart__items");
  //creation article element
  const articleElement = document.createElement("article");
  articleElement.className = "cart__item";
  //reattachment article element to section element
  sectionElement.appendChild(articleElement); 
  //creation image div
  const imageDiv = document.createElement("div");
  imageDiv.className = "cart__item__img";
  //reattachment image div to article element
  articleElement.appendChild(imageDiv);
  //creation image element
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  //reattachment image element to image div
  imageDiv.appendChild(imageElement);
  //creation content div
  const contentDiv = document.createElement("div");
  contentDiv.className = "cart__item__content";
  //reattachment content div to article element
  articleElement.appendChild(contentDiv);
  //creation description div
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "cart__item__content__description";
  //reattachment description div to content div
  contentDiv.appendChild(descriptionDiv);
  //creation title element
  const titleElement = document.createElement("h2");
  titleElement.innerText = name;
  //reattachment title element to description div
  descriptionDiv.appendChild(titleElement);
  //creation color element
  const colorElement = document.createElement("p");
  colorElement.innerText = color;
  //reattachment color element to description div
  descriptionDiv.appendChild(colorElement);
  //creation price element
  const priceElement = document.createElement("p");
  priceElement.innerText = price + '€';
  //reattachment price element to description div
  descriptionDiv.appendChild(priceElement);
  //creation settings div
  const settingsDiv = document.createElement("div");
  settingsDiv.className = "cart__item__content__settings";
  //reattachment settings div to content div
  contentDiv.appendChild(settingsDiv);
  //creation settings quantity div
  const settingsQuantityDiv = document.createElement("div");
  settingsQuantityDiv.className = "cart__item__content__settings__quantity";
  //reattachment settings quantity div to settings div
  settingsDiv.appendChild(settingsQuantityDiv);
  //creation quantity element
  const quantityElement = document.createElement("p");
  quantityElement.innerText = "Qté : ";
  //reattachment quantity element to settings quantity div
  settingsQuantityDiv.appendChild(quantityElement);
  //creation input element
  const inputElement = document.createElement("input");
  inputElement.className = "itemQuantity";
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("name", "itemQuantity");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "100");
  inputElement.setAttribute("value", quantity);
  //reattachment input element to settings quantity
  settingsQuantityDiv.appendChild(inputElement);
  //Listen to quantity input changes and retrieve the values 
  inputElement.addEventListener("change", function (event) {
    event.preventDefault();
    updateQuantity(id, color, inputElement);
    });
  //creation delete div
  const deleteDiv = document.createElement("div");
  deleteDiv.className = "cart__item__content__settings__delete";
  //reattachment delete div to settings div
  settingsDiv.appendChild(deleteDiv);
  //creation delete element
  const deleteElement = document.createElement("p");
  deleteElement.className = "deleteItem";
  deleteElement.innerText = "Supprimer";
  //reattachment delete element to delete div
  deleteDiv.appendChild(deleteElement);
  //Listen to the click on the "deleteItem" button and delete the products
  deleteElement.addEventListener("click", function (event) {
    event.preventDefault();
    deleteItem(id, color);
  });
}
function updateQuantity(id, color, inputElement) {   
  const dataCart = JSON.parse(localStorage.getItem("command"));
  dataCart[id][color] = parseInt(inputElement.value);
  localStorage.setItem("command", JSON.stringify(dataCart));
  getPrice();
  window.location.reload();
}
function deleteItem(id, color) {
  const dataCart = JSON.parse(localStorage.getItem("command"));
  delete dataCart[id][color];
  localStorage.setItem("command", JSON.stringify(dataCart));
  getPrice();
  window.location.reload();
}
function getPrice() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  let quantity = 0;
  let price = 0;
  //recovery of order in local storage
  const getOrder = JSON.parse(localStorage.getItem("command"));
  //browse all sofa IDs in order
  for (let ID in getOrder) {
    //retrieve sofa corresponding to ID from API
    const product = productList.find(function(item) {
      if (item['_id'] === ID) {
        return item;
      }
    });
    //browse product colors
    for (let colors in getOrder[ID]) {
      //add quantity
      quantity += getOrder[ID][colors];
      //add product price
      price += product.price * getOrder[ID][colors];
    }
  }
  totalQuantity.innerText = quantity;
  totalPrice.innerText = price;
}
function getCart() {
  //recovery of order in local storage
  const dataCart = JSON.parse(localStorage.getItem("command"));
  //browse product ID in order
  for (let dataID in dataCart) {
    //retrieve data from ordered product
    const dataItem = dataCart[dataID];
    //retrieve sofa corresponding to ID from API
    const product = productList.find(function(item) {
      if (item['_id'] === dataID) {
      return item;
      }
    });
    //if product exists
    if (product) {
      //browse list of ordered colors
      for (let dataColors in dataItem) {
      //adding HTML elements to cart
      createCartDom(dataID, product.imageUrl, product.name, product.price, dataColors, dataItem[dataColors]);
      }
    }
  }
  getPrice();
}
async function execute() {
  await getProductList();
  getCart();
}
execute();

