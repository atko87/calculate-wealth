const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("short");
const calcuateWealthBtn = document.getElementById("calculate-welth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//featch random user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

//Double eveyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

//Sorts users by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

//Filter bonly millioners
function showMillionaires() {
  data = data.filter((user = user.money > 1000000));

  updateDom();
}

//Calculate wealth

function calcuateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEL = document.createElement("div");
  wealthEL.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEL);
}

//Add new obj to data arr

function addData(obj) {
  data.push(obj);

  updateDom();
}

//Update Dom

function updateDom(providedData = data) {
  //Clear main div
  main.innerHTML = "<h2><strong> Person </strong>Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${fromMoney(item.money)}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&");
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calcuateWealthBtn = document.getElementById("click", calcuateWealth);
