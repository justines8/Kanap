// id product recovery
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
async function createIdProductDom(product) {
    // creation image element 
    const imageProduct = document.createElement("img");
    // to find image product
    imageProduct.src = product.imageUrl;
    imageProduct.alt = product.altTxt;
    // to add image to its parent
    const imageData = document.querySelector(".item__img");
    imageData.appendChild(imageProduct);
    // title element recovery
    const titleProduct = document.getElementById("title");
    // to find product title
    titleProduct.innerText = product.name;
    // description element recovery
    const descriptionProduct = document.getElementById("description");
    // to find product description
    descriptionProduct.innerText = product.description;
    // price element recovery
    const priceProduct = document.getElementById("price");
    // to find product price
    priceProduct.innerText = product.price;
    // for loop to browse colors and store them in colorProduct
    for (i = 0; i < product.colors.length; i++) {
        const colorsOption = product.colors[i];
        // creation color element
        const colorsProduct = document.createElement("option");
        colorsProduct.setAttribute("value", colorsOption);
        // to find product color
        colorsProduct.innerText = colorsOption;
        document.getElementById("colors").appendChild(colorsProduct);
    }
}
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


















