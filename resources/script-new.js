import Content from './components/content.js'

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