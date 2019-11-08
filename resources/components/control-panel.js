import createSizesControlElement from '../lib/create-sizes-control-element.js'

// This function accepts an formBlockElement (the root of the Type Scale 
// article) for example, and a key from the sizes object associated with that
// formBlock (for the Type Scale, that would be typeScale).
// It selects the group root (the article element), loops over the sizes and for
// each size, it creates an input element which is adds to the controlGroup 
// element
function displaySizeControlElements(formBlockElement, key) {
  return function (sizes) {
    const controlGroupSelector = '[data-sizes-control-group]'
    const sizesControlGroup = formBlockElement.querySelector(controlGroupSelector)

    sizesControlGroup.innerHTML = ''

    sizes.forEach(sizeObject => {
      const size = sizeObject[key]
      const name = sizeObject.name
      const breakpoint = sizeObject.breakpoint
      const controlElement = createSizesControlElement({name, size, breakpoint})
      sizesControlGroup.appendChild(controlElement)
    })
  }
}

// This function takes an formBlockElement and a breakpoint. It loops over all
// input elements (which have a data-breakpoint attribute) and marks it as
// active or not by setting a data attribute
function markActiveControlElement(formBlockElement, breakpoint) {
  formBlockElement
    .querySelectorAll('[data-breakpoint]')
    .forEach(element => {
      if (element.dataset.breakpoint === breakpoint.toString()) {
        element.dataset.active = true
      } else {
        element.dataset.active = false
      }
    })
}

export default function() {
  const controlPanelRoot = document.querySelector('[data-control-panel]')
  const toggleButton = controlPanelRoot.querySelector('[data-toggle]')
  const formBlockTypeScale = controlPanelRoot.querySelector('[data-form-block="type-scale"]')

  // the click handler for the control panel toggle. It sets a data attribute 
  // if it should be open or closed
  toggleButton.addEventListener('click', () => {
    if (controlPanelRoot.dataset.controlPanel === 'close') {
      controlPanelRoot.dataset.controlPanel = 'open'
    } else {
      controlPanelRoot.dataset.controlPanel = 'close'
    }
  })

  // Create an update controls function specific for the Type Scale formBlockElement
  const updateTypeScaleControls = displaySizeControlElements(formBlockTypeScale, 'typeScale')

  return {
    el: controlPanelRoot,
    
    updateSizes(newSizes){
      updateTypeScaleControls(newSizes);
    },
    
    setActiveBreakpoint(newBreakpoint) {
      markActiveControlElement(formBlockTypeScale, newBreakpoint)
    }
  }
}