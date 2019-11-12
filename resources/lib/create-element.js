// Helper function to create an control element. It accepts an existing element
// and some data. If an existing element is provided, it updates the value on 
// that element instead of creating one first
export function createControlElement(existingElement, {name, value: size, breakpoint, key, eventHandler}) {
  const control = existingElement || document.createElement('label')
  const label = control.querySelector('span') || document.createElement('span')
  const input = control.querySelector('input') || document.createElement('input')

  control.classList.add('cp-control')
  label.classList.add('cp-label')
  input.classList.add('cp-input')

  input.type = "number"
  input.step = "0.01"
  input.value = size
  input.name = name
  input.dataset.key = key

  label.innerText = name

  control.dataset.name = name

  if (breakpoint) {
    control.dataset.breakpoint = breakpoint
  }
  if (control.parentNode === null) {
    input.addEventListener('input', eventHandler)
    control.appendChild(label)
    control.appendChild(input)
  }
  
  return control
}

// Helper function to create a breakpoint indicator element. It accepts an 
// existing element and some data. If an existing element is provided, it 
// updates the value on that element instead of creating one first
export function createBreakpointIndicatorElement(existingImg, existingImgFilled, existingDivider, { name, breakpoint, icon }) {
  const imgElement = existingImg || document.createElement('img')
  imgElement.src = `resources/images/${icon}.svg`
  imgElement.alt = ''
  imgElement.dataset.breakpoint = breakpoint
  imgElement.dataset.isFilled = false
  imgElement.dataset.name = name

  const imgFilledElement = existingImgFilled || imgElement.cloneNode()
  imgFilledElement.src = `resources/images/${icon}-fill.svg`
  imgFilledElement.dataset.breakpoint = breakpoint
  imgFilledElement.dataset.isFilled = true

  let divider
  if (breakpoint !== Infinity) {
    divider = existingDivider || document.createElement('div')
    divider.classList.add('divider')
    divider.dataset.name = name
  }

  return [imgElement, imgFilledElement, divider]
}

// Helper function to create a breakpoint control element. It accepts an 
// existing element and some data. If an existing element is provided, it 
// updates the value on that element instead of creating one first
export function createBreakpointControlElement(existingElement, {name, breakpoint, key, eventHandler}) {
  if (breakpoint === Infinity) return existingElement
  
  const inputElement = existingElement || document.createElement('input')
  inputElement.type = 'number'
  inputElement.value = breakpoint
  inputElement.name = name
  inputElement.dataset.breakpoint = breakpoint
  inputElement.dataset.key = 'breakpoint'
  inputElement.dataset.name = name

  if (inputElement.parentNode === null) {
    inputElement.addEventListener('change', eventHandler)
  }

  return inputElement
}

// Helper function to create an output element. It accepts an existing element 
// and some data. If an existing element is provided, it updates the value on 
// that element instead of creating one first
export function createOutputElement(existingElement, {name, value}) {
  const outputWrapper = existingElement || document.createElement('div')
  const label = outputWrapper.querySelector('span') || document.createElement('span')
  const output = outputWrapper.querySelector('output') || document.createElement('output')

  outputWrapper.classList.add('cp-output-wrapper')
  label.classList.add('cp-label')
  output.classList.add('cp-output')

  label.innerText = name
  output.value = value
  outputWrapper.dataset.name = name

  if (outputWrapper.parentNode === null) {
    outputWrapper.appendChild(label)
    outputWrapper.appendChild(output)
  }
  
  return outputWrapper
}