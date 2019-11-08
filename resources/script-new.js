import Content from './components/content.js'

let activeBreakPoint = 720

const sizes = [
  { name: 'small',     baseType: 16, typeScale: 1.2,   breakpoint: 720 },
  { name: 'medium',    baseType: 16, typeScale: 1.25,  breakpoint: 1024 },
  { name: 'large',     baseType: 16, typeScale: 1.33,  breakpoint: 1440 },
  { name: 'x-large',   baseType: 16, typeScale: 1.414, breakpoint: 1920 },
  { name: 'xx-large',  baseType: 16, typeScale: 1.5,   breakpoint: Infinity },
]

// All avaiable classes
const classes = ['hero', 'h1', 'h2', 'h3', 'h4', 'body-big', 'body', 'body-small', 'body-x-small'];

// The text to be displayed
const exampleText = 'It\'s a state of mind'

// Get a reference to the content object
const content = Content(exampleText)

function setup() {
  content.updateClasses(classes)
  content.updateExampleText(exampleText)
}

setup()

window.content = content