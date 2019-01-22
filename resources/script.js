//////////// Adjust the below //////////////

// screen break points
var breakOne = 720
var breakTwo = 1080
var breakThree = 1440

// type base
var typeOne = 12
var typeTwo = 14
var typeThree = 14
var typeFour = 12

// type scale ratios
var ratioOne = 1.4 /* ratioOne = Minor third */
var ratioTwo = 1.3 /* ratioTwo = Major third */
var ratioThree = 1.33 /* ratioThree = Perfect fourth */
var ratioFour = 1.418 /* ratioFour = Augmented fourth */

// type minimum size
var minSize = 12


//////////// No touchy beyond this point! //////////////

// base ratio
var ratio = 1

// base type
var typeBase

// breakpoint determining variable
var screenBase

// scale multipliers
var levelMinTwo
var levelMinOne
var levelOne
var levelTwo
var levelThree
var levelFour
var levelFive
var levelSix

// final type sizes
var typeBodyXSmall
var typeBodySmall
var typeBody
var typeH4
var typeH3
var typeH2
var typeH1
var typeHero

// classes to be updated
var bodyXSmallClass = document.getElementsByClassName("body-x-small");
var bodySmallClass = document.getElementsByClassName("body-small");
var bodyClass = document.getElementsByClassName("body");
var h4Class = document.getElementsByClassName("h4");
var h3Class = document.getElementsByClassName("h3");
var h2Class = document.getElementsByClassName("h2");
var h1Class = document.getElementsByClassName("h1");
var heroClass = document.getElementsByClassName("hero");


// Run function on DOM load
function breakHandler() {

   // determine screen breakpoints and assign base values
   if(window.innerWidth > breakOne && window.innerWidth < breakTwo) {
      screenBase = 2
      ratio = ratioTwo
      typeBase = typeTwo
   }
   if(window.innerWidth > breakTwo && window.innerWidth < breakThree) {
      screenBase = 3
      ratio = ratioThree
      typeBase = typeThree
   }
   if(window.innerWidth > breakThree) {
      screenBase = 4
      ratio = ratioFour
      typeBase = typeFour
   }
   if(window.innerWidth < breakOne) {
      screenBase = 1
      ratio = ratioOne
      typeBase = typeOne
   }

   // give values to scale multipliers
   levelMinTwo = ratio / ratio / ratio
   levelMinOne = ratio / ratio
   levelOne = ratio
   levelTwo = ratio * ratio
   levelThree = ratio * ratio * ratio
   levelFour = ratio * ratio * ratio * ratio
   levelFive = ratio * ratio * ratio * ratio * ratio
   levelSix = ratio * ratio * ratio * ratio * ratio * ratio

   // give values to final type sizes
   typeBodyXSmall = typeBase * levelMinTwo
   typeBodySmall = typeBase * levelMinOne
   typeBody = typeBase * levelOne
   typeH4 = typeBase * levelTwo
   typeH3 = typeBase * levelThree
   typeH2 = typeBase * levelFour
   typeH1 = typeBase * levelFive
   typeHero = typeBase * levelSix


   // Min size limiting
   if (typeBodyXSmall < minSize) {
      typeBodyXSmall = minSize;
   }
   if (typeBodySmall < minSize) {
      typeBodySmall = minSize;
   }


   // Update CSS based on the above

   function typeUpdater() {

      for (var i = 0; i < bodyXSmallClass.length; i++) {
         bodyXSmallClass[i].style.fontSize = typeBodyXSmall + 'px';
      }

      for (var i = 0; i < bodySmallClass.length; i++) {
         bodySmallClass[i].style.fontSize = typeBodySmall + 'px';
      }

      for (var i = 0; i < bodyClass.length; i++) {
         bodyClass[i].style.fontSize = typeBody + 'px';
      }

      for (var i = 0; i < h4Class.length; i++) {
         h4Class[i].style.fontSize = typeH4 + 'px';
      }

      for (var i = 0; i < h3Class.length; i++) {
         h3Class[i].style.fontSize = typeH3 + 'px';
      }

      for (var i = 0; i < h2Class.length; i++) {
         h2Class[i].style.fontSize = typeH2 + 'px';
      }

      for (var i = 0; i < h1Class.length; i++) {
         h1Class[i].style.fontSize = typeH1 + 'px';
      }

      for (var i = 0; i < heroClass.length; i++) {
         heroClass[i].style.fontSize = typeHero + 'px';
      }
   }
   typeUpdater();
}

// Call function
breakHandler();
window.addEventListener('resize', breakHandler);
