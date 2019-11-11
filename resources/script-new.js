import ControlPanel from  './components/control-panel.js'
import Content from './components/content.js'
import BreakBg from './components/break-bg.js'
import HeadCss from './components/head-css.js'
import calculateFontSizes from './lib/calculate-font-sizes.js'
import generateCss from './lib/generate-css.js'

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
const classes = [
  {name: 'hero' },
  {name: 'h1' },
  {name: 'h2' },
  {name: 'h3' },
  {name: 'h4' },
  {name: 'body-big', basis: true },
  {name: 'body' },
  {name: 'body-small' },
  {name: 'body-x-small' },
];

let classesWithCurrentSizes = []

let css = ''

// The text to be displayed
const exampleText = 'It\'s a state of mind'

// Get a reference to the control panel object
const controlPanel = ControlPanel()
const content = Content(exampleText)
const breakBg = BreakBg()
const headCss = HeadCss()

function getActiveSizeObject() {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const activeSizeObj = sizes.find(size => size.breakpoint > width)
  return activeSizeObj
}

function updateSizes() {
  controlPanel.updateSizes(sizes)
  breakBg.updateBreakpoints(sizes)
}

function updateClasses() {
  controlPanel.updateClasses(classesWithCurrentSizes)
  content.updateClasses(classesWithCurrentSizes)
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

function updateCss() {
  headCss.updateCss(css)
}

function setClassesWithCurrentSizes() {
  const activeSizeObj = getActiveSizeObject()
  classesWithCurrentSizes = calculateFontSizes(activeSizeObj, classes, limits)
}

function setActiveBreakpoint() {
  const activeSizeObj = getActiveSizeObject()
  if (activeSizeObj.breakpoint !== activeBreakPoint) {
    activeBreakPoint = activeSizeObj.breakpoint
    setClassesWithCurrentSizes()
    updateActiveBreakpoint()
    updateClasses()
  }
}

function setCSS() {
  css = generateCss(sizes, classes, limits)
  updateCss()
}

function setup() {
  updateSizes()
  updateLimits()
  updateExampleText()
  setActiveBreakpoint()

  window.addEventListener('resize', setActiveBreakpoint)
  setCSS()
}

setup()

window.content = content
window.controlPanel = controlPanel