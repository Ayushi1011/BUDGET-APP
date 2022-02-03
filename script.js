const balance = document.getElementById("balance");
const form = document.getElementById("form");
const entry = document.getElementById("entry_val");
const amount = document.getElementById("amount_val");
const debitList = document.getElementById("debitlist");
const creditList = document.getElementById("creditlist");
const transactions = [];

function updatesessionStorage() {
  sessionStorage.setItem("transactions", JSON.stringify(transactions));
}

const sessionStorageTransactions = JSON.parse(
  sessionStorage.getItem("transactions")
);
updateTotalBudget(sessionStorageTransactions);

function addNewBudget(e) {
  e.preventDefault();
  let transactionHistory = {};

  if (entry.value === "" || amount.value === "") {
    alert("Please fill the form fields!!");
  } else {
    transactionHistory = {
      id: transactions.length,
      entry: entry.value,
      amount: amount.value,
    };
    transactions.push({ entry: entry.value, amount: amount.value });
  }
  const sign = `${transactionHistory.amount}` < 0 ? "-" : "+";
  const transactionData = document.createElement("li");

  transactionData.classList.add(
    `${transactionHistory.amount}` < 0 ? "debit" : "credit"
  );

  transactionData.innerHTML = `
    ${transactionHistory.entry} <span>${sign}₹${Math.abs(
    transactionHistory.amount
  )}</span> <button class="removeBtn" onclick=removeTransaction(${
    transactionHistory.id
  }>x</button>`;
  transactionData.setAttribute("onclick", "removeTransaction(this)");
  if (transactionHistory.amount < 0) {
    debitList.appendChild(transactionData);
  } else {
    creditList.appendChild(transactionData);
  }
  updateTotalBudget(transactions);
  updatesessionStorage();
}

form.addEventListener("submit", addNewBudget);

function updateTotalBudget(transactionList) {
  let sum = 0;
  transactionList.map((list_item) => (sum += parseInt(list_item.amount)));
  balance.innerText = `₹${sum}`;
}

function removeTransaction(transactionID) {
  const element = transactionID;
  element.remove();
  transactions.splice(
    transactions.findIndex((a) => a.id === transactionID),1);
  updateTotalBudget(transactions);
  updatesessionStorage();
}
