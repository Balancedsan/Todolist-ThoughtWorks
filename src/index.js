import CreateElement from './CreateElement.js';
import { hideList, animateTiming, showList } from './animations.js';

const addButton = document.querySelector('.addToDo__add'); // add the item to the todolist
const unorderedList = document.querySelector('.list'); // list of todo items
const input = document.querySelector('.input'); //  allow the user to key in the item they want to add to the todolist
const removeButton = document.querySelector('.remove');
const message = document.querySelector('.message');

/**
 *
 * Capitialize the first letter of the new ToDoItem that is to be added to the list
 *
 * @param {String} value the value to capitalize
 */
const capitalizeFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 *
 * Attaches the child element to the parent element
 *
 * @param {Dom} firstElement parent element
 * @param {Dom} secondElement child element to attach to parent element
 */
const attachToParrent = (firstElement, secondElement) => {
  firstElement.appendChild(secondElement);
};

const createNewElement = (tag, classNames, text = '') => {
  const newElement = new CreateElement(tag);
  newElement.addTextContent(text);
  newElement.addClassList(classNames);
  return newElement.getElementTag();
};

const removeNodeGraceFully = (liNode) => {
  liNode.animate(hideList, animateTiming).onfinish = () => liNode.remove();
};

// listens for the enter event

window.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    addButton.click();
  }
});

// add an element to the todolist

addButton.addEventListener('click', () => {
  if (!input.value) {
    message.textContent = 'Item to add cannot be empty';
  } else if (/[^a-zA-Z\s]/gi.test(input.value)) {
    message.textContent = 'Only characters from a-z are allowed';
  } else {
    message.textContent = '';
    const LiElement = createNewElement(
      'li',
      'list__item',
      capitalizeFirstLetter(input.value)
    );

    const trashIcon = createNewElement('i', 'fas fa-trash-alt');
    attachToParrent(LiElement, trashIcon); // attach the trashIcon to the LIelement
    attachToParrent(unorderedList, LiElement); // attach the LI element to the unordered list
    LiElement.animate(showList, animateTiming); // animate the element added to the dom
  }
  message.animate(showList, animateTiming);
  input.value = ''; // reset the input value
});

removeButton.addEventListener('click', () => {
  if (confirm('Are You Sure You Want To Remove All Items?')) {
    unorderedList.innerHTML = '';
  }
});

// remove the dom item or underline the text
unorderedList.addEventListener('click', (event) => {
  if (event.target.matches('svg')) {
    // check if the user click on the trash icon
    let liNode = event.target.parentElement; // get the parrent element which is the LI of the UL and remove it
    removeNodeGraceFully(liNode);
  } else if (event.target.matches('li.list__item')) {
    event.target.classList.toggle('done');
  }
});
