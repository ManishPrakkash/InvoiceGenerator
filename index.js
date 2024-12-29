document.getElementById('currentDate').valueAsDate = new Date();

function addItem() {
    const tbody = document.getElementById('itemsTableBody');
    const row = tbody.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Item description" onchange="calculateTotals()"></td>
        <td><input type="number" value="1" min="1" onchange="calculateTotals()"></td>
        <td><input type="number" value="0.00" step="0.01" min="0" onchange="calculateTotals()"></td>
        <td><input type="number" value="0" min="0" max="100" step="0.1" onchange="calculateTotals()"></td>
        <td class="amount">₹0.00</td>
        <td><button class="delete-btn" onclick="deleteItem(this)">🗑️</button></td>
    `;
    calculateTotals();
}

function deleteItem(button) {
    button.closest('tr').remove();
    calculateTotals();
}
function printPage(){
    window.print();
}
function calculateTotals() {
    const rows = document.getElementById('itemsTableBody').getElementsByTagName('tr');
    let subtotal = 0;
    let totalDiscount = 0;

    for (let row of rows) {
        const qty = parseFloat(row.cells[1].getElementsByTagName('input')[0].value) || 0;
        const price = parseFloat(row.cells[2].getElementsByTagName('input')[0].value) || 0;
        const discount = parseFloat(row.cells[3].getElementsByTagName('input')[0].value) || 0;
        
        const originalAmount = qty * price;
        const disAmt = (originalAmount * discount) / 100;
        const finAmt = originalAmount - disAmt;
        
        row.cells[4].textContent = `₹${finAmt.toFixed(2)}`;
        subtotal += finAmt;
        totalDiscount += disAmt;
    }

    const deliveryCharge = parseFloat(document.getElementById('deliveryCharge').value) || 0;
    const total = subtotal + deliveryCharge;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('totalDiscount').textContent = totalDiscount.toFixed(2);
    document.getElementById('deliveryChargeDisplay').textContent = deliveryCharge.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}
addItem();