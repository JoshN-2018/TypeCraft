import ControlPanel from  './components/control-panel.js'
import Content from './components/content.js'
import BreakBg from './components/break-bg.js'
import HeadCss from './components/head-css.js'
import calculateFontSizes from './lib/calculate-font-sizes.js'
import generateCss from './lib/generate-css.js'

const limits = [
  { name: 'minimum size', value: 0, },
  { name: 'body-small', value: 12 },
  { name: 'body-x-small', value: 10 },
]
function setLimits(event) {
  const controlGroup = event.type.replace('change:', '')
  const {name, key, value} = event.detail
  const limitObj = limits.find(limitObj => limitObj.name === name)
  if (limitObj) {
    limitObj[key] = value
  }
  update()
}


const sizes = [
  { name: 'small',     baseType: 16, typeScale: 1.2,   breakpoint: 720, icon: 'icon-phone' },
  { name: 'medium',    baseType: 16, typeScale: 1.25,  breakpoint: 1024, icon: 'icon-tablet' },
  { name: 'large',     baseType: 16, typeScale: 1.33,  breakpoint: 1440, icon: 'icon-laptop' },
  { name: 'x-large',   baseType: 16, typeScale: 1.414, breakpoint: 1920, icon: 'icon-desktop' },
  { name: 'xx-large',  baseType: 16, typeScale: 1.5,   breakpoint: Infinity, icon: 'icon-tv' },
]
function setSizes(event) {
  const controlGroup = event.type.replace('change:', '')
  const {name, key, value} = event.detail
  const sizeObj = sizes.find(sizeObj => sizeObj.name === name)
  if (sizeObj) {
    sizeObj[key] = value
  }
  update()
}


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
function setClasses() { /* Not implemented yet */ update() }


let classesWithCurrentSizes = []
function calculateClassesWithCurrentSizes() {
  classesWithCurrentSizes = calculateFontSizes(activeSizeForBreakpoint, classes, limits)
}


let activeSizeForBreakpoint = undefined;
function setActiveSizeForBreakpoint(event) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const sizeForCurrentBreakpoint = sizes.find(size => size.breakpoint > width)

  if (activeSizeForBreakpoint !== sizeForCurrentBreakpoint) {
    activeSizeForBreakpoint = sizeForCurrentBreakpoint
    update()
  }
}


let css = ''
function calculateCSS() {
  css = generateCss(sizes, classes, limits)
}

// The text to be displayed
let exampleText = 'It\'s a state of mind'
function setExampleText(newText) { 
  exampleText = newText;
  update()
}


// Get a reference to the control panel object
const controlPanel = ControlPanel()
const content = Content(exampleText)
const breakBg = BreakBg()
const headCss = HeadCss()

function reselectElement(formBlockName, name) {
  const input = document.querySelector(`[data-form-block="${formBlockName}"] input[name="${name}"]`)
  if (input) {
    input.select()
  }
}

function calculateValues() {
  calculateClassesWithCurrentSizes()
  calculateCSS()
}

function update() {
  calculateValues()
  headCss.updateCss(css)
  
  breakBg.updateBreakpoints(sizes)
  
  content.updateExampleText(exampleText)
  content.updateClasses(classesWithCurrentSizes)
  
  controlPanel.updateSizes(sizes)
  controlPanel.updateLimits(limits)
  controlPanel.updateClasses(classesWithCurrentSizes)
  controlPanel.setActiveBreakpoint(activeSizeForBreakpoint.breakpoint)
}

function setup() {
  window.addEventListener('resize', setActiveSizeForBreakpoint)
  window.addEventListener('change:base-type', setSizes)
  window.addEventListener('change:type-scale', setSizes)
  window.addEventListener('change:breakpoints', event => {setSizes(event); setActiveSizeForBreakpoint()})
  window.addEventListener('change:limits', setLimits)

  setActiveSizeForBreakpoint()
}

setup()

window.content = content
window.controlPanel = controlPanel
window.setExampleText = setExampleText