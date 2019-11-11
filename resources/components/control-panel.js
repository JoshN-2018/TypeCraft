import { createControlElement, createOutputElement } from '../lib/create-element.js'

// This function is the event handler creator. The execute function insode of it 
// is the actual event handler. The event handler takes info from the target
// element and creates a new event. This is needed because the new event is
// dispatched on the window object. Because all input elements are replaced when
// the user adds/removes breakpoints, we can not listen for the change events
// directly on the input elements itself. Instead the event is redispatched from
// the window object. script-new.js is listening for changes on the window
// object because that is guaranteed to exist. But since we are doing that, we
// need to pass along all info like the name (form block name), key and value
function createChangeEventHandler(eventName) {
  return function execute(event) {
    const name = event.target.name
    const key = event.target.dataset.key
    const value = Number(event.target.value)
    const customEvent = new CustomEvent(
      `change:${eventName}`,
      { detail: { name, key, value } }
      )
    window.dispatchEvent(customEvent)
  }
}

// Here we create event handlers for each form block. We need to have a
// reference to these handlers because we need to remove them if an input
// element is going to be destroyed.
const dispatchChangeBreakpoint = createChangeEventHandler('breakpoints')
const dispatchChangeBaseType = createChangeEventHandler('base-type')
const dispatchChangeTypeScale = createChangeEventHandler('type-scale')
const dispatchChangeLimits = createChangeEventHandler('limits')

// This function accepts two elements, the wrapper elements for the 
// breakpoint-icons and the breakpoint-inputs, and the sizes array. It loops 
// over the sizes array and creates new elements to be displayed
function displayBreakpointIndicator(breakpointIcons, breakpointInputs, sizes) {

  // cleanup all existing event handler before the wrapper element is cleared
  breakpointInputs
    .querySelectorAll('input')
    .forEach(input => input.removeEventListener('change', dispatchChangeBreakpoint))

  breakpointIcons.innerHTML = ''
  breakpointInputs.innerHTML = ''

  sizes.forEach(sizeObj => {
    const { breakpoint, icon, name } = sizeObj

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
      inputElement.name = name
      inputElement.dataset.breakpoint = breakpoint
      inputElement.dataset.key = 'breakpoint'
      inputElement.addEventListener('change', dispatchChangeBreakpoint)
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
function displayFormElements(formBlockElement, key, createElementFunction, eventHandler) {
  return function (dataList) {
    const controlGroupSelector = '[data-control-group]'
    const controlGroup = formBlockElement.querySelector(controlGroupSelector)

    // cleanup all existing event handler before the wrapper element is cleared
    controlGroup
      .querySelectorAll('input')
      .forEach(input => input.removeEventListener('change', eventHandler))

    controlGroup.innerHTML = ''

    dataList.forEach(dataObject => {
      const value = dataObject[key]
      const name = dataObject.name
      const breakpoint = dataObject.breakpoint
      const controlElement = createElementFunction({name, value, breakpoint, key, eventHandler})
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

  // Create an update controls functions for each formBlockElement
  const updateBaseTypeControls = displayFormElements(formBlockBaseTypeSize, 'baseType', createControlElement, dispatchChangeBaseType)
  const updateTypeScaleControls = displayFormElements(formBlockTypeScale, 'typeScale', createControlElement, dispatchChangeTypeScale)
  const updateLimitsControls = displayFormElements(formBlockLimits, 'value', createControlElement, dispatchChangeLimits)
  const updateOutputValues = displayFormElements(outputBlock, 'typeSize', createOutputElement)

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