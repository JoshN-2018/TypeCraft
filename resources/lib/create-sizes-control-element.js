// Helper function to create an control element
export default function createSizesControlElement({name, size, breakpoint}) {
  const control = document.createElement('label')
  const label = document.createElement('span')
  const input = document.createElement('input')

  control.classList.add('cp-sizes-control')
  label.classList.add('cp-sizes-label')
  input.classList.add('cp-sizes-input')

  input.type = "number"
  input.step = "0.01"
  input.value = size

  label.innerText = name

  control.dataset.breakpoint = breakpoint
  control.appendChild(label)
  control.appendChild(input)
  
  return control
}