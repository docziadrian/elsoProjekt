let nameField = document.querySelector("#nameField");
let priceField = document.querySelector("#priceField");
let amountField = document.querySelector("#amountField");
let itemsList = document.querySelector("#itemsList");
let summaryText = document.querySelector("#summaryText");
let submitBtn = document.querySelector("#okSubmitButton");

let summary = 0;

let items = [];

submitBtn.addEventListener("click", () => {
  if (!nameField.value || !priceField.value || !amountField.value) {
    alert("Please fill all fields.");
    return;
  }

  items.push({
    name: nameField.value,
    price: Number(priceField.value),
    amount: Number(amountField.value),
    total: Number(priceField.value) * Number(amountField.value),
  });

  displayItems();

  nameField.value = "";
  priceField.value = "";
  amountField.value = "";
});

let displayItems = () => {
  itemsList.innerHTML = "";
  summary = 0;
  summaryText.textContent = `Summary: ${summary.toFixed(0)} `;
  items.forEach((item, index) => {
    summary += item.amount * item.price;
    summaryText.textContent = `Summary: ${summary.toFixed(0)} `;
    let newTr = document.createElement("tr");
    let id = document.createElement("td");
    let name = document.createElement("td");
    let price = document.createElement("td");
    let amount = document.createElement("td");
    let total = document.createElement("td");
    let summaryForRow = document.createElement("td");
    summaryForRow.textContent = item.amount * item.price;
    summaryForRow.classList.add("text-end");
    total.classList.add("text-end");
    price.classList.add("text-end");
    amount.classList.add("text-end");
    id.textContent = index + 1;
    name.textContent = item.name;
    price.textContent = item.price;
    amount.textContent = item.amount;
    total.textContent = item.total.toFixed(2);
    newTr.appendChild(id);
    newTr.appendChild(name);
    newTr.appendChild(price);
    newTr.appendChild(amount);
    newTr.appendChild(total);

    itemsList.appendChild(newTr);
  });
};
