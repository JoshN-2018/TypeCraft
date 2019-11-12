import { createControlElement, createOutputElement, createBreakpointIndicatorElement, createBreakpointControlElement } from '../lib/create-element.js'

// A helper function to get an DOM element from a provided parent element based
// on the data-name attribute.
function getExistingElementIn(parentElement) {
  return function execute(sizesObj) {
    return parentElement.querySelector(`[data-name="${sizesObj.name}"]`)
  }
}

// This function is an event handler creator. The execute function inside of it 
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
// over the sizes array and creates new elements to be displayed. If the 
// elements already exists, it does not add them again to the DOM
function displayBreakpointIndicator(breakpointIcons, breakpointInputs, sizes) {
  sizes
    .forEach(sizeObj => {
      const { breakpoint, icon, name } = sizeObj
      const existingImg = breakpointIcons.querySelector(`[data-name="${sizeObj.name}"][data-is-filled="false"]`)
      const existingImgFilled = breakpointIcons.querySelector(`[data-name="${sizeObj.name}"][data-is-filled="true"]`)
      const existingDivider = breakpointIcons.querySelector(`.divider[data-name="${sizeObj.name}"]`)
      const existingInput = breakpointInputs.querySelector(`[data-name="${sizeObj.name}"]`)

      const [img, imgFilled, divider] = createBreakpointIndicatorElement(existingImg, existingImgFilled, existingDivider, { breakpoint, icon, name })
      const input = createBreakpointControlElement(existingInput, { name, breakpoint, key: 'breakpoint', eventHandler: dispatchChangeBreakpoint })

      if (img.parentNode !== breakpointIcons) { breakpointIcons.appendChild(img) }
      if (imgFilled.parentNode !== breakpointIcons) { breakpointIcons.appendChild(imgFilled) }
      if (divider && divider.parentNode !== breakpointIcons) { breakpointIcons.appendChild(divider) }
      if (input && input.parentNode !== breakpointInputs) { breakpointInputs.appendChild(input) }
    })
}

// This function accepts an formBlockElement (the root of the Type Scale 
// article) for example, and a key from the sizes object associated with that
// formBlock (for the Type Scale, that would be typeScale).
// It selects the group root (the article element), loops over the sizes and for
// each size, it creates an input element which is adds to the controlGroup 
// element. If the input element already exists, it only updates its values
function displayFormElements(formBlockElement, key, createElementFunction, eventHandler) {
  return function (sizes) {
    const controlGroupSelector = '[data-control-group]'
    const controlGroup = formBlockElement.querySelector(controlGroupSelector)
    const getExistingElement = getExistingElementIn(controlGroup)

    sizes
      .forEach(sizeObject => {
        const existingElement = getExistingElement(sizeObject)
        const value = sizeObject[key]
        const name = sizeObject.name
        const breakpoint = sizeObject.breakpoint
        const controlElement = createElementFunction(existingElement, {name, value, breakpoint, key, eventHandler})
        if (controlElement.parentElement !== controlGroup) {
          controlGroup.appendChild(controlElement)
        }
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
  const infoButtons = controlPanelRoot.querySelectorAll('[data-info-button]')

  // the click handler for the control panel toggle. It sets a data attribute 
  // if it should be open or closed
  toggleButton.addEventListener('click', () => {
    if (controlPanelRoot.dataset.controlPanel === 'close') {
      controlPanelRoot.dataset.controlPanel = 'open'
    } else {
      controlPanelRoot.dataset.controlPanel = 'close'
    }
  })

  infoButtons.forEach(infoButton => {
    const target = document.getElementById(infoButton.dataset.infoButton)
    infoButton.addEventListener('click', (event) => {
      if (target.dataset.tipbox === 'hide') {
        target.dataset.tipbox = 'show'
      } else {
        target.dataset.tipbox = 'hide'
      }
    })
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