import { createControlElement, createOutputElement } from '../lib/create-element.js'

// This function accepts two elements, the wrapper elements for the 
// breakpoint-icons and the breakpoint-inputs, and the sizes array. It loops 
// over the sizes array and creates new elements to be displayed
function displayBreakpointIndicator(breakpointIcons, breakpointInputs, sizes) {
  breakpointIcons.innerHTML = ''
  breakpointInputs.innerHTML = ''

  sizes.forEach(sizeObj => {
    const { breakpoint, icon } = sizeObj

    const imgElement = document.createElement('img')
    imgElement.src = `resources/images/${icon}.svg`
    imgElement.alt = ''
    imgElement.dataset.breakpoint = breakpoint
    imgElement.dataset.isFilled = false

    const imgFilledElement = imgElement.cloneNode()
    imgElement.src = `resources/images/${icon}-fill.svg`
    imgElement.dataset.isFilled = true

    breakpointIcons.appendChild(imgElement)
    breakpointIcons.appendChild(imgFilledElement)

    if (breakpoint !== Infinity) {
      const divider = document.createElement('div')
      divider.classList.add('divider')
      breakpointIcons.appendChild(divider)

      const inputElement = document.createElement('input')
      inputElement.type = 'number'
      inputElement.value = breakpoint
      inputElement.dataset.breakpoint = breakpoint
      breakpointInputs.appendChild(inputElement)
    }
  })
}

// This function accepts an formBlockElement (the root of the Type Scale 
// article) for example, and a key from the sizes object associated with that
// formBlock (for the Type Scale, that would be typeScale).
// It selects the group root (the article element), loops over the sizes and for
// each size, it creates an input element which is adds to the controlGroup 
// element
function displayFormElements(formBlockElement, key, createElementFunction) {
  return function (dataList) {
    const controlGroupSelector = '[data-control-group]'
    const controlGroup = formBlockElement.querySelector(controlGroupSelector)

    controlGroup.innerHTML = ''

    dataList.forEach(dataObject => {
      const value = dataObject[key]
      const name = dataObject.name
      const breakpoint = dataObject.breakpoint
      const controlElement = createElementFunction({name, value, breakpoint})
      controlGroup.appendChild(controlElement)
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
  const formBreakpointIcons = controlPanelRoot.querySelector('[data-breakpoint-icons]')
  const formBreakpointInputs = controlPanelRoot.querySelector('[data-breakpoint-inputs]')
  const formBlockBaseTypeSize = controlPanelRoot.querySelector('[data-form-block="base-type"]')
  const formBlockTypeScale = controlPanelRoot.querySelector('[data-form-block="type-scale"]')
  const formBlockLimits = controlPanelRoot.querySelector('[data-form-block="limits"]')
  const outputBlock = controlPanelRoot.querySelector('[data-output-block]')

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
  const updateBaseTypeControls = displayFormElements(formBlockBaseTypeSize, 'baseType', createControlElement)
  const updateTypeScaleControls = displayFormElements(formBlockTypeScale, 'typeScale', createControlElement)
  const updateLimitsControls = displayFormElements(formBlockLimits, 'value', createControlElement)
  const updateOutputValues = displayFormElements(outputBlock, 'value', createOutputElement)

  return {
    el: controlPanelRoot,
    
    updateSizes(newSizes){
      updateBaseTypeControls(newSizes);
      updateTypeScaleControls(newSizes);
      displayBreakpointIndicator(formBreakpointIcons, formBreakpointInputs, newSizes)
    },
    
    setActiveBreakpoint(newBreakpoint) {
      markActiveControlElement(formBlockBaseTypeSize, newBreakpoint)
      markActiveControlElement(formBlockTypeScale, newBreakpoint)
      markActiveControlElement(formBreakpointIcons, newBreakpoint)
      markActiveControlElement(formBreakpointInputs, newBreakpoint)
    },

    updateLimits(newLimits) {
      updateLimitsControls(newLimits)
    },

    updateClasses(newClasses) {
      updateOutputValues(newClasses)
    }
  }
}