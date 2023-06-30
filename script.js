// Bring in elements needed and store in variables
const itemForm = document.getElementById('item-form'); // The form around the text field
const itemInput = document.getElementById('item-input'); // The text field itself
const itemList = document.getElementById('item-list'); // The items below the filter
const clearButton = document.getElementById('clear');
const filterPlain = document.getElementById('filter');

{/* <button id="clear" class="btn-clear">Clear All</button> */}

function addItem(e) {
  e.preventDefault(); // Must include to prevent the submit from persisting to file/page
  
  newItem = itemInput.value
  if (newItem === '') {
    alert('Please type in an item');
    return;
  }
  
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  
  // Create and append button
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  
  // Create and append icon
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  
  // Add to DOM
  itemList.appendChild(li);
  
  // Check UI
  checkUI();
  
  // Reset text field
  itemInput.value = '';
}

// Create button
function createButton(classes) {
  const newButton = document.createElement('button');
  newButton.className = classes;
  return newButton;
}

// Create icon
function createIcon(classes) {
  const newIcon = document.createElement('icon');
  newIcon.className = classes;
  return newIcon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearList() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    console.log("Triggered?");
    clearButton.style.display = 'none';
    filterPlain.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filterPlain.style.display = 'block';
  }
}

// Write listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearList);
checkUI();