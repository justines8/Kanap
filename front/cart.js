let productList = [];

/**
 * It fetches the data from the API and then stores it in the productList variable
 */
async function getProductList() {
  try {
    const data = await fetch(`http://localhost:3000/api/products`);
    productList = await data.json();
  } catch (err) {
    document.querySelector("#cart__items").innerText = "Erreur dans le chargement des données.";
  }
}

/**
 * It creates an element, sets the className, innerText, and attributes if they are provided.
 * @param elt - the element to create
 * @param [className=null] - the class name of the element
 * @param [text=null] - The text to be displayed in the element
 * @param [attributes=null] - [{name: "href", value: "https://www.google.com"}, {name: "target", value:
 * "_blank"}]
 * @returns The created element.
 */
const genericCreateElement = (elt, className = null, text = null, attributes = null) => {
  if (!elt) throw new Error("You must provide an element to create");
  const createdElt = document.createElement(elt);
  if (className) createdElt.className = className;
  if (text) createdElt.innerText = text;
  if (attributes) {
    for (let i = 0; i < attributes.length; i++) {
      createdElt.setAttribute(attributes[i].name, attributes[i].value);
    }
  }
  return createdElt;
}

/**
 * It creates a DOM element for each item in the cart.
 * @param id - the id of the product
 * @param imageUrl - "https://www.nike.com/t/air-max-270-react-mens-shoe-KZvnJL/AO4971-001"
 * @param name - "T-shirt noir"
 * @param price - number
 * @param color - "red"
 * @param quantity - the quantity of the item in the cart
 */
async function createCartDom(id, imageUrl, name, price, color, quantity) {
  const sectionElement = document.getElementById("cart__items");

  const articleElement = genericCreateElement("article", "cart__item");
  const imageDiv = genericCreateElement("div", "cart__item__img");
  const imageElement = genericCreateElement("img", null, null, [{name: "src", value: imageUrl}]);
  const contentDiv = genericCreateElement("div", "cart__item__content");
  const descriptionDiv = genericCreateElement("div", "cart__item__content__description");
  const titleElement = genericCreateElement("h2", null, name);
  const colorElement = genericCreateElement("p", null, color);
  const priceElement = genericCreateElement("p", null, `${price} €`);
  const settingsDiv = genericCreateElement("div", "cart__item__content__settings");
  const settingsQuantityDiv = genericCreateElement("div", "cart__item__content__settings__quantity");
  const quantityElement = genericCreateElement("p", null, "Qté : ");
  const inputElement = genericCreateElement("input", "itemQuantity", null, [{name: "type", value: "number"}, {name: "name", value: "itemQuantity"}, {name: "min", value: "1"}, {name: "max", value: "100"}, {name: "value", value: quantity}]);
  const deleteDiv = genericCreateElement("div", "cart__item__content__settings__delete");
  const deleteElement = genericCreateElement("p", "deleteItem", "Supprimer");

  sectionElement.appendChild(articleElement);
  articleElement.appendChild(imageDiv);
  imageDiv.appendChild(imageElement);
  articleElement.appendChild(contentDiv);
  contentDiv.appendChild(descriptionDiv);
  descriptionDiv.appendChild(titleElement);
  descriptionDiv.appendChild(colorElement);
  descriptionDiv.appendChild(priceElement);
  contentDiv.appendChild(settingsDiv);
  settingsDiv.appendChild(settingsQuantityDiv);
  settingsQuantityDiv.appendChild(quantityElement);
  settingsQuantityDiv.appendChild(inputElement);

  inputElement.addEventListener("change", function (event) {
    event.preventDefault();
    updateOrDeleteItem('update', id, color, inputElement);
    });

  settingsDiv.appendChild(deleteDiv);
  deleteDiv.appendChild(deleteElement);

  deleteElement.addEventListener("click", function (event) {
    event.preventDefault();
    updateOrDeleteItem('delete', id, color);
  });
}

/**
 * If the type is update, then update the dataCart object with the new value, otherwise delete the
 * color property from the dataCart object.
 * @param type - update or delete
 * @param id - the id of the item
 * @param color - the color of the item
 * @param inputElement - the input element that the user is typing in
 */
function updateOrDeleteItem(type, id, color, inputElement = null) {
  const dataCart = JSON.parse(localStorage.getItem("command"));
  type === "update" ? dataCart[id][color] = parseInt(inputElement.value) : delete dataCart[id][color];
  localStorage.setItem("command", JSON.stringify(dataCart));
  getPrice();
  window.location.reload();
}

/**
 * It gets the quantity and price of the products in the cart.
 * </code>
 * @returns the value of the variable price.
 */
function getPrice() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  let quantity = 0;
  let price = 0;
  const getOrder = JSON.parse(localStorage.getItem("command"));
  for (let ID in getOrder) {
    const product = productList.find((item) => item["_id"] === ID);
    for (let colors in getOrder[ID]) {
      quantity += getOrder[ID][colors];
      price += product.price * getOrder[ID][colors];
    }
  }
  totalQuantity.innerText = quantity;
  totalPrice.innerText = price;
}

/**
 * It gets the data from localStorage, loops through it, finds the product in the productList array,
 * and then loops through the colors and creates the DOM elements.
 * @returns the product object.
 */
function getCart() {
  const dataCart = JSON.parse(localStorage.getItem("command"));
  for (let dataID in dataCart) {
    const dataItem = dataCart[dataID];
    const product = productList.find(function(item) {
      if (item['_id'] === dataID) {
        return item;
      }
    });
    if (product) {
      for (let dataColors in dataItem) {
        createCartDom(dataID, product.imageUrl, product.name, product.price, dataColors, dataItem[dataColors]);
      }
    }
  }
  getPrice();
}

/**
 * A function that executes the functions above
 */
async function execute() {
  await getProductList();
  getCart();
}

execute();



