const prices = {
    apples: 3,
    bananas: 2,
    oranges: 4,
    carrots: 1.5,
    broccoli: 2.5,
    spinach: 2,
    milk: 1.2,
    cheese: 3.5,
    butter: 2.8,
    chicken: 5,
    beef: 6,
    fish: 7,
    flour: 1,
    sugar: 0.8,
    salt: 0.5
};

function addItem() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const orderTable = document.getElementById('orderTable').querySelector('tbody');

    let total = 0;

    orderTable.innerHTML = '';

    formData.forEach((value, key) => {
        if (value) {
            const price = prices[key] * value;
            total += price;

            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>${value}</td><td>$${price.toFixed(2)}</td>`;
            orderTable.appendChild(row);
        }
    });

    document.getElementById('totalPrice').innerText = `$${total.toFixed(2)}`;
}

function saveToFavourites() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);

    const favourites = {};
    formData.forEach((value, key) => {
        if (value) {
            favourites[key] = value;
        }
    });

    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Favourites saved!');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites) {
        const form = document.getElementById('orderForm');
        Object.keys(favourites).forEach(key => {
            form.elements[key].value = favourites[key];
        });
        addItem();
    } else {
        alert('No favourites saved!');
    }
}

function buyNow() {
    const orderSummary = document.getElementById('orderSummary');
    const summaryDetails = document.getElementById('summaryDetails');

    summaryDetails.innerHTML = document.getElementById('orderTable').outerHTML;
    orderSummary.style.display = 'block';
}

function pay() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm.checkValidity()) {
        alert(`Thank you for your purchase! Your order will be delivered on ${new Date().toLocaleDateString()}.`);
    } else {
        alert('Please fill in all required fields.');
    }
}
