const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filterPlain = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach( item => addItemToDOM(item));
  checkUI();
}

function itemSubmit(e) {
  e.preventDefault();
  newItem = itemInput.value;
  if (newItem === "") {
    alert("Please type in an item");
    return;
  }
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  checkUI();
  itemInput.value = "";
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  itemList.appendChild(li);
}

function createButton(classes) {
  const newButton = document.createElement("button");
  newButton.className = classes;
  return newButton;
}

function createIcon(classes) {
  const newIcon = document.createElement("icon");
  newIcon.className = classes;
  return newIcon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
  }  
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter( i => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach(function (item) {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function clearList() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem('items')
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearButton.style.display = "none";
    filterPlain.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filterPlain.style.display = "block";
  }
}

function init() {
  itemForm.addEventListener("submit", itemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearList);
  filterPlain.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}

init();



