// Helper function to create an control element
export default function createControlElement({name, size, breakpoint}) {
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