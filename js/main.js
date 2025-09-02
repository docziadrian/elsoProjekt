let pNameIn,
  pPriceIn,
  amountIn,
  okBtn,
  tbodyForAddItems,
  totalPrice,
  totalPriceText,
  isEditing,
  editingID;
let items = [];

const main = () => {
  // Elements lekérése :(
  pNameIn = document.querySelector("#pNameIn");
  pPriceIn = document.querySelector("#pPriceIn");
  amountIn = document.querySelector("#amountIn");
  okBtn = document.querySelector("#okBtn");
  tbodyForAddItems = document.querySelector("#tbodyForAddItems");
  totalPriceText = document.querySelector("#totalPrice");
  totalPrice = 0;

  okBtn.addEventListener("click", handleAdd);

  loadCart();
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const loadCart = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    const parsed = JSON.parse(cartData);
    items.push(...parsed);
    updateTableView();
  }
};

const deleteView = (id) => {
  specItem = items.filter((item) => item.id === id);
  items = items.filter((item) => item.id !== id);
  saveCart();
  updateTableView();
};

const editView = (id) => {
  isEditing = true;
  specItem = items.filter((item) => item.id === id);
  pNameIn.value = specItem[0].name;
  pPriceIn.value = specItem[0].price;
  amountIn.value = specItem[0].amount;
  editingID = specItem[0].id;
};

const updateTableView = () => {
  tbodyForAddItems.textContent = "";
  totalPrice = 0;
  for (const item of items) {
    const newTr = document.createElement("tr");

    const divForCrud = document.createElement("div");
    divForCrud.style = "max-width: 10em";
    divForCrud.style = "margin: 0px";

    const editTr = document.createElement("button");
    editTr.textContent = "EDIT";
    editTr.classList = "bg-primary";
    editTr.addEventListener("click", () => {
      editView(item.id);
    });

    const deleteTr = document.createElement("button");
    deleteTr.textContent = "DEL";
    deleteTr.classList = "bg-success";
    deleteTr.addEventListener("click", () => {
      deleteView(item.id);
    });

    divForCrud.appendChild(editTr);
    divForCrud.appendChild(deleteTr);

    const newTd1 = document.createElement("td");
    newTd1.textContent = item.id;

    const newTd2 = document.createElement("td");
    newTd2.textContent = item.name;

    const newTd3 = document.createElement("td");
    newTd3.textContent = item.price.toLocaleString() + " HUF";

    const newTd4 = document.createElement("td");
    newTd4.textContent = item.amount.toLocaleString();

    const newTd5 = document.createElement("td");
    newTd5.textContent = (item.amount * item.price).toLocaleString() + " HUF";

    newTr.appendChild(divForCrud);
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd4);
    newTr.appendChild(newTd5);

    tbodyForAddItems.appendChild(newTr);
    totalPrice += item.amount * item.price;
  }
  totalPriceText.textContent = "Totál: " + totalPrice.toLocaleString() + " HUF";
};

const clearIns = () => {
  pNameIn.value = "";
  pPriceIn.value = "";
  amountIn.value = "";
};

const handleAdd = () => {
  if (!pNameIn.value || !pPriceIn.value || !amountIn.value) {
    alert("Please fill all fields");
    return;
  }

  if (isEditing) {
    const specItem = items.filter((item) => item.id === editingID);
    specItem[0].name = pNameIn.value;
    specItem[0].price = pPriceIn.value;
    specItem[0].amount = amountIn.value;
    isEditing = false;
    updateTableView();
    saveCart();
    clearIns();
    return;
  }

  createRecord(
    pNameIn.value,
    parseFloat(pPriceIn.value),
    parseInt(amountIn.value)
  );
  updateTableView();
  saveCart();

  clearIns();
};

const createRecord = (name, price, amount) => {
  items.push({
    id: items.length + 1,
    name,
    price,
    amount,
  });
};

main();
