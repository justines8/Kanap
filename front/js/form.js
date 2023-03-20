const REGEX = {
  name: /[A-Za-z\é\è\ê\ë\ï\œ\-]{2,50}$/,
  address: /^[a-zA-Z0-9.,_\é\è\ê\ë\ï\œ\-\s]{5,50}[ ]{0,2}$/,
  city: /[A-Za-z\é\è\ê\ë\ï\œ\-]+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  objID: /^[a-f0-9]{32}$/i,
}

const ERRORS = {}
const data = {}

/**
 * It takes in an input name, a regex, an error class, and an error message. It then checks if the
 * regex is true for the input value. If it is, it deletes the error from the ERRORS object and adds
 * the input value to the data object. If it isn't, it adds the error message to the ERRORS object and
 * deletes the input value from the data object.
 * @param inputName - the name of the input field
 * @param regex - the regular expression to test the input against
 * @param errorClass - the class of the error message element
 * @param errorMessage - The error message to display if the input is invalid.
 */
const validateInput = function (inputName, regex, errorClass, errorMsg) {
  const input = document.getElementById(inputName);
  const error = document.getElementById(errorClass); 
  error.innerText = (regex.test(input.value)) ? '' : errorMsg;
    if ((regex.test(input.value))) {
      delete ERRORS[inputName];
      data[inputName] = input.value;
    } else {
      ERRORS[inputName] = errorMsg;
      delete data[inputName];
    }
}

/**
 * It sends a POST request to the server with the contact and products data, and if the server responds
 * with a responseBody, it redirects the user to the confirmation page with the orderID in the URL.
 * @param contact - {
 * @param products - [{
 */
const sendForm = async (contact, products) => {
  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contact: contact,
        products: products,
      })
    });
    const responseBody = await response.json();
      if (responseBody) {
        window.location.href = `/front/html/confirmation.html?orderID=${responseBody.orderId}`;
      } else { 
        alert("Erreur");
      }
  } catch (err) {
    document.querySelector("#cart__order").innerText = "Erreur dans le chargement des données.";
  }
}

/* A function that is called when the form is submitted. It prevents the default action of the form,
which is to reload the page. It then gets the order from the local storage and gets the products
from the order. If there are no products, it alerts the user that the cart is empty. If there are
products, it checks if the product IDs are valid. If they are not, it alerts the user that the
products are not valid. It then validates the inputs and if there are errors, it alerts the user
that the form is not valid. If there are no errors, it sends the form to the server. */
let getForm = document.getElementsByClassName('cart__order__form')[0];

getForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const order = JSON.parse(localStorage.getItem("command"));
  const products = Object.keys(order);
  if (products.length <= 0) {
    return alert("Le panier est vide.");
  }
  for (let productID of products) {
    if (!REGEX.objID.test(productID)) {
        return alert("Les produits ne sont pas valides.");
    }
  }

  validateInput("firstName", REGEX.name, "firstNameErrorMsg", "Votre prénom n'est pas valide.");
  validateInput("lastName", REGEX.name, "lastNameErrorMsg", "Votre nom n'est pas valide.");
  validateInput("address", REGEX.address, "addressErrorMsg", "Votre adresse n'est pas valide.");
  validateInput("city", REGEX.city, "cityErrorMsg", "Votre ville n'est pas valide.");
  validateInput("email", REGEX.email, "emailErrorMsg", "Votre e-mail n'est pas valide.");
  if (Object.keys(ERRORS).length) {
    return alert("Le formulaire n'est pas valide.")
  }
  sendForm(data, products);
})

/* Disabling the browser's built-in validation. */
document.querySelector("form.cart__order__form").setAttribute('novalidate', true);