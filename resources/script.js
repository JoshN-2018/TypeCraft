//////////// Adjust the below //////////////

// screen break points
var breakOne = 720
var breakTwo = 1080
var breakThree = 1440

// type base
var typeOne = 18
var typeTwo = 16
var typeThree = 16
var typeFour = 16

// type scale ratios
var ratioOne = 1.18 /* ratioOne = Minor third */
var ratioTwo = 1.25 /* ratioTwo = Major third */
var ratioThree = 1.333 /* ratioThree = Perfect fourth */
var ratioFour = 1.418 /* ratioFour = Augmented fourth */

// type minimum size
var minSize = 12


//////////// No touchy beyond this point! //////////////

// base ratio
var ratio = 1
// breakpoint determining variable
var screenBase = 1

// typographic levels
var levelMinTwo = ratio
var levelMinOne = ratio
var levelOne = ratio
var levelTwo = ratio
var levelThree = ratio
var levelFour = ratio
var levelFive = ratio
var levelSix = ratio

// Run function on DOM load
function breakHandler() {
   // determine screen breakpoints
   if(window.innerWidth > breakOne && window.innerWidth < breakTwo) {
      screenBase = 2
      ratio = ratioTwo
   }
   if(window.innerWidth > breakTwo && window.innerWidth < breakThree) {
      screenBase = 3
      ratio = ratioThree
   }
   if(window.innerWidth > breakThree) {
      screenBase = 4
      ratio = ratioFour
   }
   if(window.innerWidth < breakOne) {
      screenBase = 1
      ratio = ratioOne
   }

   // level update
   levelMinTwo = ratio / ratio / ratio
   levelMinOne = ratio / ratio
   levelOne = ratio
   levelTwo = ratio * ratio
   levelThree = ratio * ratio * ratio
   levelFour = ratio * ratio * ratio * ratio
   levelFive = ratio * ratio * ratio * ratio * ratio
   levelSix = ratio * ratio * ratio * ratio * ratio * ratio


   // execute based on break breakpoints
   if(screenBase === 2) {
      document.documentElement.style.setProperty('--type-base', typeTwo);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-two', levelTwo + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-four', levelFour + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 3) {
      document.documentElement.style.setProperty('--type-base', typeThree);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-two', levelTwo + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-four', levelFour + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 4) {
      document.documentElement.style.setProperty('--type-base', typeFour);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-two', levelTwo + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-four', levelFour + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 1) {
      document.documentElement.style.setProperty('--type-base', typeOne);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-two', levelTwo + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-four', levelFour + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
}

// Call function
breakHandler();

// this listens for 'resize' events (first argument) on the window object, if one occurs it calls the 'breakHandler' function (second argument).

window.addEventListener('resize', breakHandler);
