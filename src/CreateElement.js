/**
 * Used to create DOM element tags and their properties 
 */
export default class CreateElement {
  constructor(elementTag) {
    this.elementTag = document.createElement(elementTag);
  }

  /**
   * 
   * @param {String} text the text to add into a element tag  
   */
  addTextContent(text) {
    this.elementTag.textContent = text;
  }

  /**
   * 
   * @param {String || Array} className the classes to add to the element tag 
   */
  addClassList(className) {
    if (!Array.isArray(className)) { // check if the argument is a string split it into an array 
      className = className.split(' ');
    }
    this.elementTag.classList.add(...className); // ES6 spread operator to add to the element tag 
  }

  getElementTag() { // return the element tag that is instationated by the class 
    return this.elementTag;
  }
}
