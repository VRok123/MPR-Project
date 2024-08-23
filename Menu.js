// script.js
let totalAmount = 0;
let orderList = [];

function addToOrder(item, price) {
    totalAmount += price;
    orderList.push(item);
    document.getElementById("total-amount").innerText = totalAmount;
    updateOrderList();
}

function updateOrderList() {
    const orderListContainer = document.getElementById("order-list");
    orderListContainer.innerHTML = "";
    orderList.forEach(item => {
        const listItem = document.createElement("p");
        listItem.textContent = item;
        orderListContainer.appendChild(listItem);
    });
}

document.getElementById("checkout-btn").addEventListener("click", function() {
    alert("Your order total is ₹" + totalAmount + ". Thank you for ordering!");
    totalAmount = 0;
    orderList = [];
    document.getElementById("total-amount").innerText = totalAmount;
    updateOrderList();
});
