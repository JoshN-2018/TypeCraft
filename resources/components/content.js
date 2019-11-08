export default function content() {
  const contentRoot = document.querySelector('[data-content]')

  // Create a variable which will contain all classes
  let classes;
  
  // Create a variable wich will contain the example text
  let exampleText;

  // If the classes and example text are available it loops over the classes and
  // creates an element which it displays.
  function updateExampleElements() {
    if (classes && exampleText) {
      contentRoot.innerHTML = ''
      classes.forEach(className => {
        const element = document.createElement('p') // Create the element
        element.classList.add(className)            // Add the class
        element.innerText = exampleText             // Add the text
        contentRoot.appendChild(element)            // Add to the DOM
      })
    }
  }

  // Return an object with methods to update the content elements
  return {
    // Receive new classes and generate new example elements
    updateClasses(newClasses) {
      classes = newClasses;
      updateExampleElements()
    },

    // Receive new example text and generate new example elements
    updateExampleText(newExampleText) {
      exampleText = newExampleText
      updateExampleElements()
    }
  }
}