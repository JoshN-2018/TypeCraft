// Helper function to create an control element
export function createControlElement({name, value: size, breakpoint}) {
  const control = document.createElement('label')
  const label = document.createElement('span')
  const input = document.createElement('input')

  control.classList.add('cp-control')
  label.classList.add('cp-label')
  input.classList.add('cp-input')

  input.type = "number"
  input.step = "0.01"
  input.value = size

  label.innerText = name

  if (breakpoint) {
    control.dataset.breakpoint = breakpoint
  }
  control.appendChild(label)
  control.appendChild(input)
  
  return control
}

export function createOutputElement({name, value}) {
  const outputWrapper = document.createElement('div')
  const label = document.createElement('span')
  const output = document.createElement('output')

  outputWrapper.classList.add('cp-output-wrapper')
  label.classList.add('cp-label')
  output.classList.add('cp-output')

  label.innerText = name
  output.value = value

  outputWrapper.appendChild(label)
  outputWrapper.appendChild(output)
  
  return outputWrapper
}