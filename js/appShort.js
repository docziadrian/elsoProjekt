const fields = ["nameField", "priceField", "amountField"].map((id) =>
  document.querySelector(`#${id}`)
);
const [nameField, priceField, amountField] = fields;
const itemsList = document.querySelector("#itemsList");
const summaryText = document.querySelector("#summaryText");
const submitBtn = document.querySelector("#okSubmitButton");

let items = [];

submitBtn.addEventListener("click", () => {
  if (fields.some((field) => !field.value)) {
    alert(
      "Kérlek minden elemet tölts ki, vagy ne próbálj meg feltolteni egyeb arukeat mert egyebkent ez a lenyege ennek az egeszmnek neprobalj csalni nem erim eg en mondom neked mar megorulok komolyan mondom hat nem hiszem el hogy nem erted hogy mi ennek a szerepe?!"
    );
    return;
  }

  const [name, price, amount] = fields.map((field) => field.value);
  items.push({ name, price: +price, amount: +amount, total: +price * +amount });
  fields.forEach((field) => (field.value = ""));
  displayItems();
});

const displayItems = () => {
  itemsList.innerHTML = "";
  let summary = items.reduce((sum, item, index) => {
    const row = document.createElement("tr");
    ["id", "name", "price", "amount", "total"].forEach((key, i) => {
      const cell = document.createElement("td");
      cell.textContent =
        key === "id"
          ? index + 1
          : key === "total"
          ? item.total.toFixed(2)
          : item[key];
      if (["price", "amount", "total"].includes(key))
        cell.classList.add("text-end");
      row.appendChild(cell);
    });
    itemsList.appendChild(row);
    return sum + item.total;
  }, 0);
  summaryText.textContent = `Summary: ${summary.toFixed(0)}`;
};
