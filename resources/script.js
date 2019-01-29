//////////// Adjust the below //////////////

// screen break points
var breakOne = 720
var breakTwo = 1080
var breakThree = 1440

// type base
var typeOne = 16
var typeTwo = 16
var typeThree = 16
var typeFour = 16

// type scale ratios
var ratioOne = 1.18 /* ratioOne = Minor third */
var ratioTwo = 1.25 /* ratioTwo = Major third */
var ratioThree = 1.33 /* ratioThree = Perfect fourth */
var ratioFour = 1.418 /* ratioFour = Augmented fourth */

// type minimum size
var minSize = 12

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

   // min size
   minSize = document.getElementById('min-type').value;

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
  console.log("Coded values published");
}
codedvaluePublisher();

function darkModeApplier() {
   document.getElementsByClassName('cp-block')[0].style.backgroundColor = "#3D3D41";
   document.getElementsByClassName('cp-block')[0].style.color = "#8A8A8D";
   document.getElementsByClassName('control-panel')[0].style.Color = "#8A8A8D";
   cpButtonOn.style.backgroundColor = "#3D3D41";
   cpButtonOff.style.backgroundColor = "#3D3D41";
   var cpHr = document.getElementsByClassName('cp-hr');
   var inputStyle = document.getElementsByTagName('input');
   var outputStyle = document.getElementsByTagName('output');

   for (var i = 0; i < cpHr.length; i++) {
      cpHr[i].style.borderColor = "#8A8A8D";
   }
   for (var i = 0; i < inputStyle.length; i++) {
      inputStyle[i].style.backgroundColor = "#3D3D41";
      inputStyle[i].style.color = "#8A8A8D";
      // inputStyle[i].style.borderColor = "#8A8A8D";
   }
   for (var i = 0; i < outputStyle.length; i++) {
      outputStyle[i].style.backgroundColor = "#3D3D41";
      outputStyle[i].style.color = "#8A8A8D";
   }
   console.log("darkMode is applied");
}
// darkModeApplier();

// if(darkMode = true) {
   // darkModeApplier();

//
