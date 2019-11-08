const controlPanelRoot = document.querySelector('[data-control-panel]')
const toggleButton = document.querySelector('[data-control-panel]')

toggleButton.addEventListener('click', toggleControlPanel)

function toggleControlPanel() {
  if (controlPanelRoot.dataset.controlPanel === 'close') {
    controlPanelRoot.dataset.controlPanel = 'open'
  } else {
    controlPanelRoot.dataset.controlPanel = 'close'
  }
}