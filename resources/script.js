//////////// Adjust the below //////////////

// screen break points
var breakOne = 720
var breakTwo = 1024
var breakThree = 1440
var breakFour = 1680

// type base
var typeOne = 16
var typeTwo = 16
var typeThree = 16
var typeFour = 16

// type scale ratios
var ratioOne = 1.2 /* ratioOne = Minor third */
var ratioTwo = 1.25 /* ratioTwo = Major third */
var ratioThree = 1.33 /* ratioThree = Perfect fourth */
var ratioFour = 1.418 /* ratioFour = Augmented fourth */

// type minimum size
var minSize = 12
var maxSizeBS = 16
var maxSizeBXS = 16

// dark mode
var darkMode = false

//////////// No touchy beyond this point! //////////////



// base ratio
var ratio = 1

// base type
var typeBase

// breakpoint determining variable
var screenBase

// scale multipliers
var levelMinThree
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
var typeBodyBig
var typeH4
var typeH3
var typeH2
var typeH1
var typeHero

// classes to be updated
var bodyXSmallClass = document.getElementsByClassName("body-x-small");
var bodySmallClass = document.getElementsByClassName("body-small");
var bodyClass = document.getElementsByClassName("body");
var bodyBigClass = document.getElementsByClassName("body-big");
var h4Class = document.getElementsByClassName("h4");
var h3Class = document.getElementsByClassName("h3");
var h2Class = document.getElementsByClassName("h2");
var h1Class = document.getElementsByClassName("h1");
var heroClass = document.getElementsByClassName("hero");

// get break lines
var breakLineOne = document.getElementById('break-line-1');
var breakLineTwo = document.getElementById('break-line-2');
var breakLineThree = document.getElementById('break-line-3');
var breakLineFour = document.getElementById('break-line-4');

// final line positions
var lineCompOne
var lineCompTwo
var lineCompThree
var lineCompFour

// get inputs for highlighting
var breakHighlight1 = document.getElementsByClassName("break-highlight-1");
var breakHighlight2 = document.getElementsByClassName("break-highlight-2");
var breakHighlight3 = document.getElementsByClassName("break-highlight-3");
var breakHighlight4 = document.getElementsByClassName("break-highlight-4");
var breakHighlight5 = document.getElementsByClassName("break-highlight-5");



// main rendering function
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
   levelMinThree = ratio / ratio / ratio / ratio
   levelMinTwo = ratio / ratio / ratio
   levelMinOne = ratio / ratio
   levelOne = ratio
   levelTwo = ratio * ratio
   levelThree = ratio * ratio * ratio
   levelFour = ratio * ratio * ratio * ratio
   levelFive = ratio * ratio * ratio * ratio * ratio
   levelSix = ratio * ratio * ratio * ratio * ratio * ratio

   // give values to final type sizes
   typeBodyXSmall = typeBase * levelMinThree
   typeBodySmall = typeBase * levelMinTwo
   typeBody = typeBase * levelMinOne
   typeBodyBig = typeBase * levelOne
   typeH4 = typeBase * levelTwo
   typeH3 = typeBase * levelThree
   typeH2 = typeBase * levelFour
   typeH1 = typeBase * levelFive
   typeHero = typeBase * levelSix

   // round calculated values to whole pixels
   typeBodyXSmall = Math.round(typeBodyXSmall);
   typeBodySmall = Math.round(typeBodySmall);
   typeBody = Math.round(typeBody);
   typeBodyBig = Math.round(typeBodyBig);
   typeH4 = Math.round(typeH4);
   typeH3 = Math.round(typeH3);
   typeH2 = Math.round(typeH2);
   typeH1 = Math.round(typeH1);
   typeHero = Math.round(typeHero);

   // Min size limiting
   if (typeBodySmall < minSize) {
      typeBodySmall = minSize;
   }
   if (typeBodyXSmall < minSize) {
      typeBodyXSmall = minSize;
   }

   // Max size limiting
   if (typeBodySmall > maxSizeBS) {
      typeBodySmall = maxSizeBS;
   }
   if (typeBodyXSmall > maxSizeBXS) {
      typeBodyXSmall = maxSizeBXS;
   }

   // Update type CSS based on the above
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

      for (var i = 0; i < bodyBigClass.length; i++) {
         bodyBigClass[i].style.fontSize = typeBodyBig + 'px';
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

   // document styling
   var container = document.getElementsByClassName("container");

   if (screenBase === 1) {
      for (var i = 0; i < container.length; i++) {
         container[i].style.padding = "0 1rem";
      }
   }
   if (screenBase === 2) {
      for (var i = 0; i < container.length; i++) {
         container[i].style.padding = "0 4rem";
      }
   }
   if (screenBase === 3) {
      for (var i = 0; i < container.length; i++) {
         container[i].style.padding = "0 6rem";
      }
   }
   if (screenBase === 4) {
      for (var i = 0; i < container.length; i++) {
         container[i].style.padding = "0 8rem";
      }
   }

   // Update break line positions
   lineCompOne = breakOne
   lineCompTwo = breakTwo - breakOne
   lineCompThree = breakThree - breakTwo
   lineCompFour = breakFour - breakThree

   // Update break line CSS based on the above
   function breakLineUpdater() {
      breakLineOne.style.minWidth = lineCompOne + 'px';
      breakLineTwo.style.minWidth = lineCompTwo + 'px';
      breakLineThree.style.minWidth = lineCompThree + 'px';
      breakLineFour.style.minWidth = lineCompFour + 'px';
   }

   // Highlight current breakpoint
   if (screenBase === 1) {
      document.getElementById("break-icon-phone").style.display = "none";
      document.getElementById("break-icon-phone-fill").style.display = "initial";
      for (var i = 0; i < breakHighlight1.length; i++) {
         breakHighlight1[i].classList.add("active");
      }
   } else {
      document.getElementById("break-icon-phone").style.display = "initial";
      document.getElementById("break-icon-phone-fill").style.display = "none";
      for (var i = 0; i < breakHighlight1.length; i++) {
         breakHighlight1[i].classList.remove("active");
      }
   }

   if (screenBase === 2) {
      document.getElementById("break-icon-tablet").style.display = "none";
      document.getElementById("break-icon-tablet-fill").style.display = "initial";
      for (var i = 0; i < breakHighlight2.length; i++) {
         breakHighlight2[i].classList.add("active");
      }
   } else {
      document.getElementById("break-icon-tablet").style.display = "initial";
      document.getElementById("break-icon-tablet-fill").style.display = "none";
      for (var i = 0; i < breakHighlight2.length; i++) {
         breakHighlight2[i].classList.remove("active");
      }
   }

   if (screenBase === 3) {
      document.getElementById("break-icon-laptop").style.display = "none";
      document.getElementById("break-icon-laptop-fill").style.display = "initial";
      for (var i = 0; i < breakHighlight3.length; i++) {
         breakHighlight3[i].classList.add("active");
      }
   } else {
      document.getElementById("break-icon-laptop").style.display = "initial";
      document.getElementById("break-icon-laptop-fill").style.display = "none";
      for (var i = 0; i < breakHighlight3.length; i++) {
         breakHighlight3[i].classList.remove("active");
      }
   }

   if (screenBase === 4) {
      document.getElementById("break-icon-desktop").style.display = "none";
      document.getElementById("break-icon-desktop-fill").style.display = "initial";
      for (var i = 0; i < breakHighlight4.length; i++) {
         breakHighlight4[i].classList.add("active");
      }
   } else {
      document.getElementById("break-icon-desktop").style.display = "initial";
      document.getElementById("break-icon-desktop-fill").style.display = "none";
      for (var i = 0; i < breakHighlight4.length; i++) {
         breakHighlight4[i].classList.remove("active");
      }
   }

   if (screenBase === 5) {
      document.getElementById("break-icon-tv").style.display = "none";
      document.getElementById("break-icon-tv-fill").style.display = "initial";
      for (var i = 0; i < breakHighlight5.length; i++) {
         breakHighlight5[i].classList.add("active");
      }
   } else {
      document.getElementById("break-icon-tv").style.display = "initial";
      document.getElementById("break-icon-tv-fill").style.display = "none";
      for (var i = 0; i < breakHighlight5.length; i++) {
         breakHighlight5[i].classList.remove("active");
      }
   }

   breakLineUpdater();
   typeUpdater();
   finalValuePublisher();
}


// Call function
breakHandler();
window.addEventListener('resize', breakHandler);


// panel slide in/out
var cpBlock = document.getElementById("cp-block");
var cpButtonOn = document.getElementById("cp-button-on");
var cpButtonOff = document.getElementById("cp-button-off");

cpBlock.classList.add("cp-shift");

cpButtonOn.addEventListener("click", function(){
   cpBlock.classList.add("cp-shift");
   cpButtonOn.style.display = "none";
   cpButtonOff.style.display = "initial";
});

cpButtonOff.addEventListener("click", function(){
   cpBlock.classList.remove("cp-shift");
   cpButtonOn.style.display = "initial";
   cpButtonOff.style.display = "none";
});



function userInput() {
   // break points
   breakOne = document.getElementById('break-one').value;
   breakTwo = document.getElementById('break-two').value;
   breakThree = document.getElementById('break-three').value;
   breakFour = document.getElementById('break-four').value;

   // base numbers
   typeOne = document.getElementById('base-type-s').value;
   typeTwo = document.getElementById('base-type-m').value;
   typeThree = document.getElementById('base-type-l').value;
   typeFour = document.getElementById('base-type-xl').value;

   // type scales
   ratioOne = document.getElementById('base-scale-s').value;
   ratioTwo = document.getElementById('base-scale-m').value;
   ratioThree = document.getElementById('base-scale-l').value;
   ratioFour = document.getElementById('base-scale-xl').value;

   // Limits
   minSize = document.getElementById('min-type').value;
   maxSizeBS = document.getElementById('max-type-small').value;
   maxSizeBXS = document.getElementById('max-type-x-small').value;

   breakHandler();
   console.log("input recieved");
}

// detecting input events on control panel object
cpBlock.addEventListener("input", userInput);

// Publish rendered values
function finalValuePublisher() {
  document.getElementById("hero-final").value = typeHero + 'px';
  document.getElementById("h1-final").value = typeH1 + 'px';
  document.getElementById("h2-final").value = typeH2 + 'px';
  document.getElementById("h3-final").value = typeH3 + 'px';
  document.getElementById("h4-final").value = typeH4 + 'px';
  document.getElementById("body-b-final").value = typeBodyBig + 'px';
  document.getElementById("body-final").value = typeBody + 'px';
  document.getElementById("body-s-final").value = typeBodySmall + 'px';
  document.getElementById("body-xs-final").value = typeBodyXSmall + 'px';
  console.log("I'm publishing");
}

// updating values inputed in the code control panel
function codedvaluePublisher() {

   // coded break points
   document.getElementById('break-one').value = breakOne
   document.getElementById('break-two').value = breakTwo
   document.getElementById('break-three').value = breakThree
   document.getElementById('break-four').value = breakFour

   // coded base numbers
   document.getElementById('base-type-s').value = typeOne
   document.getElementById('base-type-m').value = typeTwo
   document.getElementById('base-type-l').value = typeThree
   document.getElementById('base-type-xl').value = typeFour

   // coded type scales
   document.getElementById('base-scale-s').value = ratioOne
   document.getElementById('base-scale-m').value = ratioTwo
   document.getElementById('base-scale-l').value = ratioThree
   document.getElementById('base-scale-xl').value = ratioFour

   // coded min size
   document.getElementById("min-type").value = minSize;
   document.getElementById('max-type-small').value = maxSizeBS
   document.getElementById('max-type-x-small').value = maxSizeBXS

  console.log("Coded values published");
}
codedvaluePublisher();
