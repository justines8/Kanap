/* It's getting the orderID from the URL. */
let params = (new URL(window.location)).searchParams;
let id = params.get("orderID");

/* It's checking if the id is not null, if it's not null, it's redirecting to the index.html page. */
if (!id) {
  window.location.href = `/front/html/index.html`;
}

/* It's getting the element with the id 'orderId' and it's setting the innerText to the id. */
document.getElementById("orderId").innerText = id;

/* It's removing the command from the localStorage. */
localStorage.removeItem("command");