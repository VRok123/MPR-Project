document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-btn');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const checkoutButton = document.getElementById('checkout-btn');
    const orderList = document.getElementById('order-list');
    const totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent.trim();
            const itemPrice = parseInt(menuItem.querySelector('.price').textContent.replace('₹', ''));
            const itemCounter = menuItem.querySelector('.item-counter');

            // Update counter and total amount
            let currentCount = parseInt(itemCounter.textContent);
            currentCount += 1;
            itemCounter.textContent = currentCount;

            totalAmount += itemPrice;
            updateTotalAmount();

            addItemToOrderList(itemName, itemPrice);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent.trim();
            const itemPrice = parseInt(menuItem.querySelector('.price').textContent.replace('₹', ''));
            const itemCounter = menuItem.querySelector('.item-counter');

            // Update counter and total amount
            let currentCount = parseInt(itemCounter.textContent);
            if (currentCount > 0) {
                currentCount -= 1;
                itemCounter.textContent = currentCount;

                totalAmount -= itemPrice;
                updateTotalAmount();

                removeItemFromOrderList(itemName, itemPrice);
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        const orderItems = Array.from(orderList.querySelectorAll('.order-item'))
            .map(item => {
                const name = item.querySelector('.order-item-name').textContent;
                const count = item.querySelector('.order-item-count').textContent;
                return `${name} x ${count}`; // Changed to display 'x' instead of '₹'
            })
            .join('\n');
        
        if (totalAmount === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }

        alert(`Order Summary:\n${orderItems}\nTotal Amount: ₹${totalAmount}\nThank you for your order!`);
        clearOrder();
    });

    function updateTotalAmount() {
        totalAmountElement.textContent = `Total: ₹${totalAmount}`;
    }

    function addItemToOrderList(name, price) {
        let orderItem = orderList.querySelector(`.order-item[data-name="${name}"]`);
        if (orderItem) {
            let count = orderItem.querySelector('.order-item-count');
            let currentCount = parseInt(count.textContent);
            count.textContent = currentCount + 1;
            return;
        }

        const newItem = document.createElement('div');
        newItem.className = 'order-item';
        newItem.dataset.name = name;
        newItem.innerHTML = `<span class="order-item-name">${name}</span> x <span class="order-item-count">1</span>`;
        orderList.appendChild(newItem);
    }

    function removeItemFromOrderList(name, price) {
        let orderItem = orderList.querySelector(`.order-item[data-name="${name}"]`);
        if (orderItem) {
            let count = orderItem.querySelector('.order-item-count');
            let currentCount = parseInt(count.textContent);
            if (currentCount > 1) {
                count.textContent = currentCount - 1;
            } else {
                orderList.removeChild(orderItem);
            }
        }
    }

    function clearOrder() {
        orderList.innerHTML = '';
        totalAmount = 0;
        updateTotalAmount();

        // Reset item counters
        document.querySelectorAll('.item-counter').forEach(counter => {
            counter.textContent = '0';
        });
    }
});

