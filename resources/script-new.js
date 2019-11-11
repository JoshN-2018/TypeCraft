import ControlPanel from  './components/control-panel.js'
import Content from './components/content.js'
import BreakBg from './components/break-bg.js'

let activeBreakPoint = 720

const limits = [
  { name: 'minimum size', value: 0, },
  { name: 'body-small', value: 16 },
  { name: 'body-x-small', value: 16 },
]

const sizes = [
  { name: 'small',     baseType: 16, typeScale: 1.2,   breakpoint: 720, icon: 'icon-phone' },
  { name: 'medium',    baseType: 16, typeScale: 1.25,  breakpoint: 1024, icon: 'icon-tablet' },
  { name: 'large',     baseType: 16, typeScale: 1.33,  breakpoint: 1440, icon: 'icon-laptop' },
  { name: 'x-large',   baseType: 16, typeScale: 1.414, breakpoint: 1920, icon: 'icon-desktop' },
  { name: 'xx-large',  baseType: 16, typeScale: 1.5,   breakpoint: Infinity, icon: 'icon-tv' },
]

// All avaiable classes
const classes = ['hero', 'h1', 'h2', 'h3', 'h4', 'body-big', 'body', 'body-small', 'body-x-small'];

// The text to be displayed
const exampleText = 'It\'s a state of mind'

// Get a reference to the control panel object
const controlPanel = ControlPanel()
const content = Content(exampleText)
const breakBg = BreakBg()

function calculateCurrentSizeForClasses(classes) {
  return classes.map(className => {
    return { name: className, value: '16px' }
  })
}

function updateSizes() {
  controlPanel.updateSizes(sizes)
  breakBg.updateBreakpoints(sizes)
}

function updateClasses() {
  controlPanel.updateClasses(calculateCurrentSizeForClasses(classes))
  content.updateClasses(classes)
}

function updateLimits() {
  controlPanel.updateLimits(limits)
}

function updateActiveBreakpoint() {
  controlPanel.setActiveBreakpoint(activeBreakPoint)
}

function updateExampleText() {
  content.updateExampleText(exampleText)
}

function setActiveBreakpoint() {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const activeSizeObj = sizes.find(size => size.breakpoint > width)
  if (activeSizeObj.breakpoint !== activeBreakPoint) {
    activeBreakPoint = activeSizeObj.breakpoint
    updateActiveBreakpoint()
  }
}

function setup() {
  updateSizes()
  updateClasses()
  updateLimits()
  updateActiveBreakpoint()
  updateExampleText()
  setActiveBreakpoint()

  window.addEventListener('resize', setActiveBreakpoint)
}

setup()

window.content = content
window.controlPanel = controlPanel