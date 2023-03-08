async function getProducts() {
        try {
                const url = 'http://localhost:3000/api/products';
                const data = await fetch(url);
                return await data.json();
        }                
        catch (error) {
                document.querySelector("#items").innerText = "Erreur dans le chargement des données.";
        }
}
async function createProductDom(product) {
        //creation link element 
        const linkElement = document.createElement("a");
        linkElement.href = `./product.html?id=${product._id}`;
        //creation product element 
        const productElement = document.createElement("article");
        // creation image element 
        const imageElement = document.createElement("img");
        // to find product image
        imageElement.src = product.imageUrl;
        // creation name element
        const productName = document.createElement("h3");
        // to find name product
        productName.innerText = product.name;
        // creation description element
        const productDescription = document.createElement("p");
        // to find description product
        productDescription.innerText = product.description;
        // reattachment of parent and child elements
        const sectionItems = document.querySelector("#items");
        sectionItems.appendChild(linkElement);
        linkElement.appendChild(productElement);
        productElement.appendChild(imageElement);
        productElement.appendChild(productName);
        productElement.appendChild(productDescription);
}
async function initialize() {   
        const products = await getProducts();
        // for loop to browse the data and store them in product
        for (let i=0; i < products.length; i++) {
                const product = products[i];
                createProductDom(product);
        }
}
initialize();