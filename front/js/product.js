// récupération de l'id du produit 
const params = window.location.search;
const url = new URLSearchParams(params);
const id = url.get('id');

// récupération des produits à partir de l'id
    async function idProduct (id) {
// appel du fetch() avec la variable URL de l’API
    const idData = await fetch(`http://localhost:3000/api/products/${id}`);
// données stockées dans la variable data au format json()
    const data = await idData.json();


// création élément image 
  const imageProduct = document.createElement("img");
// pour trouver l'image du produit
  imageProduct.src = data.imageUrl;

// pour ajouter l'image à son parent
  const imageData = document.querySelector(".item__img");
  imageData.appendChild(imageProduct);

// récupération élément titre
    const titleProduct = document.getElementById("title");
// pour trouver le titre du produit
    titleProduct.innerText = data.name;
    
// récupération élément description
    const descriptionProduct = document.getElementById("description");
// pour trouver la description du produit
    descriptionProduct.innerText = data.description;

// récupération élément prix
    const priceProduct = document.getElementById("price");
// pour trouver le prix du produit
    priceProduct.innerText = data.price;

}
idProduct(id);