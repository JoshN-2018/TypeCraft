//////////// Adjust the below //////////////

// screen break points
var breakOne = 720
var breakTwo = 1080
var breakThree = 1440

// type base
var typeOne = 16
var typeTwo = 17
var typeThree = 18
var typeFour =19

// type scale ratios
var ratioOne = 1.2 /* ratioOne = Minor third */
var ratioTwo = 1.25 /* ratioOne = Major third */
var ratioThree = 1.333 /* ratioOne = Perfect fourth */
var ratioFour = 1.414 /* ratioOne = Augmented fourth */



//////////// No touching beyond this point! //////////////

// typographic levels
var levelMinTwo = ratio / ratio / ratio
var levelMinOne = ratio / ratio
var levelOne = ratio
var levelThree = ratio * ratio * ratio
var levelFive = ratio * ratio * ratio * ratio * ratio
var levelSix = ratio * ratio * ratio * ratio * ratio * ratio

// base ratio
var ratio = 1.2
// breakpoint determining variable
var screenBase = 1

// Run function on DOM load
function breakHandlerInitial() {
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
   levelThree = ratio * ratio * ratio
   levelFive = ratio * ratio * ratio * ratio * ratio
   levelSix = ratio * ratio * ratio * ratio * ratio * ratio


   // execute based on break breakpoints
   if(screenBase === 2) {
      document.documentElement.style.setProperty('--type-base', typeTwo);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 3) {
      document.documentElement.style.setProperty('--type-base', typeThree);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 4) {
      document.documentElement.style.setProperty('--type-base', typeFour);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 1) {
      document.documentElement.style.setProperty('--type-base', typeOne);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
}

// Call function
breakHandlerInitial();


// Function to be run on window resize
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
   levelThree = ratio * ratio * ratio
   levelFive = ratio * ratio * ratio * ratio * ratio
   levelSix = ratio * ratio * ratio * ratio * ratio * ratio


   // execute based on break breakpoints
   if(screenBase === 2) {
      document.documentElement.style.setProperty('--type-base', typeTwo);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 3) {
      document.documentElement.style.setProperty('--type-base', typeThree);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 4) {
      document.documentElement.style.setProperty('--type-base', typeFour);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }
   if(screenBase === 1) {
      document.documentElement.style.setProperty('--type-base', typeOne);
      document.documentElement.style.setProperty('--level-min-two', levelMinTwo + 'px');
      document.documentElement.style.setProperty('--level-min-one', levelMinOne + 'px');
      document.documentElement.style.setProperty('--level-one', levelOne + 'px');
      document.documentElement.style.setProperty('--level-three', levelThree + 'px');
      document.documentElement.style.setProperty('--level-five', levelFive + 'px');
      document.documentElement.style.setProperty('--level-six', levelSix + 'px');
   }

}



// this listens for 'resize' events (first argument) on the window object, if one occurs it calls the 'breakHandler' function (second argument).

window.addEventListener('resize', breakHandler);
