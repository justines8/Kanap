async function getProducts() {
        try {
                const url = 'http://localhost:3000/api/products';
                const data = await fetch(url);
                return await data.json();
        }                
        catch (error) {
                document.querySelector("#items").innerText = "Erreur dans le chargement des données."
        }
}
async function createProductDom(product) {
        //création élément lien
        const lienElement = document.createElement("a");
        lienElement.href = `./product.html?id=${product._id}`;

        //création élément produit
        const produitElement = document.createElement("article");

        // création élément image
        const imageElement = document.createElement("img");
        // pour trouver l'image du produit dans products
        imageElement.src = product.imageUrl;

        // création élément nom
        const productName = document.createElement("h3");
        // pour trouver le nom du produit dans products
        productName.innerText = product.name;

        // création élément description
        const productDescription = document.createElement("p");
        // pour trouver la description du produit dans products
        productDescription.innerText = product.description;

        // rattachement des éléments parents et enfants
        const sectionItems = document.querySelector("#items");
        sectionItems.appendChild(lienElement);
        lienElement.appendChild(produitElement);
        produitElement.appendChild(imageElement);
        produitElement.appendChild(productName);
        produitElement.appendChild(productDescription);
}
async function initialize() {   
        const products = await getProducts();

        // boucle for pour parcourir les données et les stocker dans products
        for (let i=0; i < products.length; i++) {
                const product = products[i];
                createProductDom(product);
        }
}
initialize();