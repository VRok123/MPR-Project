let order = [];

function addToOrder(itemName, itemPrice) {
    order.push({ name: itemName, price: itemPrice });
    updateOrder();
}

function removeFromOrder(itemName, itemPrice) {
    const index = order.findIndex(item => item.name === itemName && item.price === itemPrice);
    if (index !== -1) {
        order.splice(index, 1);
    }
    updateOrder();
}

function updateOrder() {
    const orderList = document.getElementById('order-list');
    const totalAmount = document.getElementById('total-amount');
    orderList.innerHTML = '';

    let total = 0;
    order.forEach(item => {
        orderList.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
        total += item.price;
    });

    totalAmount.textContent = total;
}

function checkout() {
    if (order.length === 0) {
        alert('Your order is empty!');
    } else {
        alert('Thank you for your order!');
        order = [];
        updateOrder();
    }
}

