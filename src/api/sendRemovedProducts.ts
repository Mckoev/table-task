import URL_PRODUCTS from "./apiData";

// simulate sending a response to the server
function sendRemovedProducts(removeIdProducts) {
    fetch(`${URL_PRODUCTS}/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(removeIdProducts)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));      // Handle the error
}

export default sendRemovedProducts