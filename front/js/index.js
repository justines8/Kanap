/**
 * The getProducts function returns a promise that resolves to the JSON data from the API.
 * @returns The data is being returned as a promise.
 */
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

/**
 * The function creates a link element, sets the href attribute to the product's id, creates an article
 * element, creates an image element, sets the src attribute to the product's imageUrl, creates a h3
 * element, sets the innerText to the product's name, creates a p element, sets the innerText to the
 * product's description, selects the section element with the id of items, appends the link element to
 * the section element, appends the product element to the link element, appends the image element to
 * the product element, appends the h3 element to the product element, and appends the p element to the
 * product element.
 * @param product - the product object that is returned from the API
 */
async function createProductDom(product) {
        const linkElement = document.createElement("a");
        linkElement.href = `./product.html?id=${product._id}`;
        const productElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        const productName = document.createElement("h3");
        productName.innerText = product.name;
        const productDescription = document.createElement("p");
        productDescription.innerText = product.description;
        const sectionItems = document.querySelector("#items");
        sectionItems.appendChild(linkElement);
        linkElement.appendChild(productElement);
        productElement.appendChild(imageElement);
        productElement.appendChild(productName);
        productElement.appendChild(productDescription);
}

/**
 * The initialize function calls the getProducts function, which returns a promise, and then loops
 * through the products array and calls the createProductDom function for each product.
 */
async function initialize() {   
        const products = await getProducts();
        for (let i=0; i < products.length; i++) {
                const product = products[i];
                createProductDom(product);
        }
}
initialize();