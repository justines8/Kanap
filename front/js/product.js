/**
 * It fetches the data from the API and returns it as a JSON object.
 * @param id - the id of the product
 * @returns a promise.
 */
const params = window.location.search;
const url = new URLSearchParams(params);
const id = url.get('id');
async function getIdProduct(id) {
    try {
            const data = await fetch(`http://localhost:3000/api/products/${id}`);
            return await data.json();
    }                
    catch (error) {
            document.querySelector(".item").innerText = "Erreur dans le chargement des données.";
    }
}

/**
 * It creates a new image element, sets the src and alt attributes, and appends it to the element with
 * the class item__img. Then it sets the innerText of the elements with the ids title, description, and
 * price to the corresponding values in the product object. Then it loops through the colors array in
 * the product object and creates a new option element for each color, sets the value attribute to the
 * color, and appends it to the element with the id colors.
 * @param product - {
 */
async function createIdProductDom(product) {
    const imageProduct = document.createElement("img");
    imageProduct.src = product.imageUrl;
    imageProduct.alt = product.altTxt;
    const imageData = document.querySelector(".item__img");
    imageData.appendChild(imageProduct);
    const titleProduct = document.getElementById("title");
    titleProduct.innerText = product.name;
    const descriptionProduct = document.getElementById("description");
    descriptionProduct.innerText = product.description;
    const priceProduct = document.getElementById("price");
    priceProduct.innerText = product.price;
    for (i = 0; i < product.colors.length; i++) {
        const colorsOption = product.colors[i];
        const colorsProduct = document.createElement("option");
        colorsProduct.setAttribute("value", colorsOption);
        colorsProduct.innerText = colorsOption;
        document.getElementById("colors").appendChild(colorsProduct);
    }
}

/**
 * If the color is not selected, or the quantity is not a number between 1 and 100, then return false.
 * Otherwise, return true.
 * @returns a boolean value.
 */
function hasColorsAndQuantity() {
    // checking color selection 
    if (colors.value === '') {
        alert("Veuillez sélectionner une couleur pour ce produit.");
        return false;
    }
    // checking quantity product
    if (quantity.value <= 0 || quantity.value > 100 && typeof quantity.value === "string") {
        alert("Veuillez sélectionner une quantité pour ce produit.");
        return false;
    }
    return true;
}

/**
 * It takes three parameters, id, colors, and quantity, and adds them to the localStorage object.
 * @param id - the id of the product
 * @param colors - "red"
 * @param quantity - the quantity of the product
 */
function addProduct(id, colors, quantity) {
    const localData = localStorage.getItem("command");
    const cart = JSON.parse(localData)||{};
    if (cart && cart[id] && cart[id][colors]) {
        cart[id][colors] += parseInt(quantity);
    } else if (cart && cart[id]) {
        cart[id][colors] = parseInt(quantity);
    } else {
        cart[id] = {};
        cart[id][colors] = parseInt(quantity);
    }
    localStorage.setItem("command", JSON.stringify(cart));
    window.location.href = 'cart.html';
}

/**
 * The function initialize() is an asynchronous function that calls the function getIdProduct() and
 * passes the id parameter to it. The function getIdProduct() returns a promise that is resolved with
 * the product object. The function initialize() then calls the function createIdProductDom() and
 * passes the product object to it. The function createIdProductDom() creates the DOM elements for the
 * product. The function initialize() then gets the button element and adds an event listener to it.
 * The event listener calls the function addProduct() and passes the id, colors.value, and
 * quantity.value parameters to it.
 * @returns the result of the function addProduct.
 */
async function initialize() {   
    const product = await getIdProduct(id);
    createIdProductDom(product);
    // recovery of the button to add to cart
    const button = document.getElementById("addToCart");
    // creation of a listening event on the button 
    button.addEventListener("click", function () {
        const colors = document.getElementById("colors");
        const quantity = document.getElementById("quantity");
        if (!hasColorsAndQuantity()) return;
        return addProduct(id, colors.value, quantity.value);
    });
}
initialize();


















