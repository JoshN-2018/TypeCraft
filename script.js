//var width = // (quadrant determined by width of screen)
//var screenBase = // number allocated for qudrant ie 380w = 40px type screenBase

// determining quadrant
var breakOne = 720
var breakTwo = 1080
var breakThree = 1440



var screenBase = 1

function breakHandler() {

   // determine screen breakpoints
   if(window.innerWidth > breakOne && window.innerWidth < breakTwo) {
      screenBase = 2
   }
   if(window.innerWidth > breakTwo && window.innerWidth < breakThree) {
      screenBase = 3
   }
   if(window.innerWidth > breakThree) {
      screenBase = 4
   }
   if(window.innerWidth < breakOne) {
      screenBase = 1
   }

   // execute based on break breakpoints
   if(screenBase === 2) {
      document.documentElement.style.setProperty('--ref-xtra-large', '60px');
   }
   if(screenBase === 3) {
      document.documentElement.style.setProperty('--ref-xtra-large', '65px');
   }
   if(screenBase === 4) {
      document.documentElement.style.setProperty('--ref-xtra-large', '75px');
   }
   if(screenBase === 1) {
      document.documentElement.style.setProperty('--ref-xtra-large', '42px');
   }

}

// this listens for 'resize' events (first argument) on the window object, if one occurs it calls the 'breakHandler' function (second argument).

window.addEventListener('resize', breakHandler);


/*
var ratio = // ratio allocated to which quadrant dertermined by width
var levOne = screenBase * ratio
var levTwo = screenBase * ratio * ratio
var levThree = screenBase * ratio * ratio * ratio
var levFour = screenBase * ratio * ratio * ratio * ratio
*/
