import ControlPanel from  './components/control-panel.js'
import Content from './components/content.js'

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

function calculateCurrentSizeForClasses(classes) {
  return classes.map(className => {
    return { name: className, value: '16px' }
  })
}

function setup() {
  controlPanel.updateSizes(sizes)
  controlPanel.updateLimits(limits)
  controlPanel.updateClasses(calculateCurrentSizeForClasses(classes))
  controlPanel.setActiveBreakpoint(activeBreakPoint)
  content.updateClasses(classes)
  content.updateExampleText(exampleText)
}

setup()

window.content = content
window.controlPanel = controlPanel