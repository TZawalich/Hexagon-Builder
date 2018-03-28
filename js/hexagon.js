/*---------------- the hexagon ---------------------------*/
var hexagon = document.getElementById("hexAnchor");
var	hexOne = document.getElementById("insideHexOne");
var	hexTwo = document.getElementById("insideHexTwo");
var hexText = document.getElementById("hexText");


/*------------------------slider-----------------------*/
var slider = document.getElementById("hexSlider"); //the hexagon width slide bar
var sliderValue = document.getElementById("sliderValue"); //the current value of the slide bar holder span

slider.addEventListener("input", sliderFunction);

function sliderFunction() { //updates whenever there is input to the slidebar (when it slides_)
				sliderValue.innerHTML = "<b>" + this.value + "px </b>"; //shows slider value
				sliderHexSize(hexagon);
				
				function sliderHexSize(e){
									e.style.width = slider.value + "px"; //sets hexagon width to slider value
									e.style.height = ((slider.value) * 0.575) + "px";
				}
}


/*------------------- color picker  and background color of hexagon------------------*/
$('#colorDisplayPicker').ColorPicker({ //from colorpicker api
	color: '#0000ff',
	onShow: function (colpkr) { //shows colorpicker popup
		$(colpkr).fadeIn(500);
		return false;
	},
	onHide: function (colpkr) { //hides it
		$(colpkr).fadeOut(500);
		return false;
	},
	onChange: function (hsb, hex, rgb) {  //triggers on color square/ hex box and updates the background/ text values of each to match current picked color
		$('#currentColor').css('backgroundColor', '#' + hex);
		$('#hexColorText').html('#' + hex);
		$('#hexAnchor, #insideHexOne, #insideHexTwo').css('backgroundColor', '#' + hex); //sets the hexagon's background color to match
		
	}
});


/*------------------------------------toggle background Image--------------------------------------*/
var hexBackgroundCheckbox = document.getElementById("hexBackgroundCheckbox"); //the hexagon background image checkbox
var hexBackgroundURL = document.getElementById("hexBackgroundURL"); //input for the hexagon background url

hexBackgroundCheckbox.addEventListener("click", hexBackgroundState);

function hexBackgroundState(){
    if(hexBackgroundCheckbox.hasAttribute("checked") === true){
        hexBackgroundURL.setAttribute("disabled", "");
        hexBackgroundCheckbox.removeAttribute("checked");
        hexagon.style.backgroundImage = '';
    } else{
        hexBackgroundURL.removeAttribute("disabled");
        hexBackgroundCheckbox.setAttribute("checked", "");
        doBackgroundImage();
    }
}
//https://media.wired.com/photos/593235279be5e55af6c2385c/master/w_1000,c_limit/Eye-Benders-Shutterstock1.jpg
hexBackgroundURL.addEventListener("blur", doBackgroundImage);

function doBackgroundImage(){
				hexagon.style.backgroundImage = "url(\'" + hexBackgroundURL.value.toString() + "\')";
}
 
	
 /*-------------------------- drop shadow---------------------------*/
 var hexShadow = document.getElementById('hexShadow'); //hex shadow toggle checkbox
 var shadowColor = document.getElementById('shadowColor');
 var shadowX = document.getElementById('shadowXOffset');
 var shadowY = document.getElementById('shadowYOffset');
 var shadowBlur = document.getElementById('shadowBlur');
 var shadowOptions = [shadowColor, shadowX, shadowY, shadowBlur]; //puts all the options into one var so I can loop them later and not do it manually
 
	addDropListeners();
	
	function addDropListeners(){
					shadowOptions.forEach(function(e){e.addEventListener("keyup", doDropShadow);}); //puts a keyup listener on all the options
}

 hexShadow.addEventListener("click", dropShadowState);
 
 function dropShadowState(){
     if(hexShadow.hasAttribute('checked') === true){
         shadowOptions.forEach(function(option){option.setAttribute("disabled", "");});
         hexShadow.removeAttribute("checked");
         hexagon.style.filter = "";
     } else{
         shadowOptions.forEach(function(option){option.removeAttribute("disabled");});
         hexShadow.setAttribute("checked", "");
         console.log(shadowX.value);
									doDropShadow();
									}
 }
	
	function doDropShadow(){
						hexagon.style.filter = "drop-shadow(" + shadowX.value + " " + shadowY.value + " " + shadowBlur.value + " " + shadowColor.value + ")";
	}
	
	/*------------------------- As Link ---------------------------*/
	 var hexagonLinkCheck = document.getElementById("hexagonLinkCheck");
		var hexagonLinkURL = document.getElementById("hexagonLinkURL");
		
		hexagonLinkCheck.addEventListener("click", hexAsLinkState);
		
		function hexAsLinkState(){
     if(hexagonLinkCheck.hasAttribute('checked') === true){
         hexagonLinkURL.setAttribute("disabled", "");
         hexagonLinkCheck.removeAttribute("checked");
         hexagon.href = "#!";
									hexagon.style.cursor = "default";
									hexagon.removeAttribute("target");
     } else{
         hexagonLinkURL.removeAttribute("disabled");
         hexagonLinkCheck.setAttribute("checked", "");
         checkURL();
									hexagon.style.cursor = "pointer";
									hexagon.setAttribute("target", "blank");
     }
 }
	
	hexagonLinkURL.addEventListener("blur", checkURL);
	
	function checkURL(){
					var enteredURL = hexagonLinkURL.value.toString();
					var isItHTTP = enteredURL.substr(0, 7); //grabs first seven chars of entered string
					if(isItHTTP === "http://"){ //checks if it's http:// if so this
									hexagon.href = hexagonLinkURL.value;
					}else{ //if not add it on
										hexagon.href = "http://" + hexagonLinkURL.value.toString();
					}
	}
	
	
	/*----------------------- Hexagon Text(agon)---------------*/
var checkHexText = document.getElementById("checkHexText"); 
var hexagonTextInput = document.getElementById("hexagonTextInput");
var hexagonTextSize = document.getElementById("hexagonTextSize");
var hexagonTextColor = document.getElementById("hexagonTextColor");
var textOptions = [hexagonTextInput, hexagonTextColor, hexagonTextSize];

addTextListeners();
	
	function addTextListeners(){
					textOptions.forEach(function(e){e.addEventListener("keyup", doHexagonText);});
}

checkHexText.addEventListener("click", checkHexTextState);

function checkHexTextState(){
    if(checkHexText.hasAttribute("checked") === true){
								textOptions.forEach(function(option){option.setAttribute("disabled", "");});
        checkHexText.removeAttribute("checked");
        hexText.innerHTML = '';
    } else{
								textOptions.forEach(function(option){option.removeAttribute("disabled");});
        checkHexText.setAttribute("checked", "");
        doHexagonText();
    }
}

function doHexagonText(){
				hexText.innerHTML = "<p>" + hexagonTextInput.value + "</p>";
				hexText.style.color = hexagonTextColor.value;
				hexText.style.fontSize = hexagonTextSize.value;
}


/*-----------------------------------code output --------------------------------*/
/*--html--*/
var hexHTML = document.getElementById("hexHTML");
var hexHolder = document.getElementById("hexagon");
var config = {attributes: true, childList: true, characterData: true, subtree: true};

var observer = new MutationObserver(echoHTML); 

observer.observe(hexHolder, config); //checks to see if anything changes in the HTML section of the page, and if so updates it

echoHTML();

function echoHTML(){
	var htmlString = hexHolder.outerHTML;
	var replaceHTML = htmlString.replace(/<a/, "&emsp;<a").replace(/<div id="hexT/, "&emsp;&emsp;<div id=\"hexT").replace(/<div id="inside/g, "&emsp;&emsp;<div id=\"inside").replace(/<\/a/, "&emsp;</a"); //indents the html lines
	var replaceSymbol = replaceHTML.replace(/</g, "&lt;").replace(/>\s/g, "&gt; <br>"); //puts line break where returns were (organizes it like I had it in the html)
	hexHTML.innerHTML = "<p>" + replaceSymbol + "</p>";
}

/*--css--*/
var styleSheet = document.styleSheets[0]; //grabs the stylesheet
var hexagonCSS = document.getElementById("hexagonCSS");

getCSSInfo();

function getCSSInfo(){
					var cssText = '';
					for(i = 22; i < 30; i++){cssText += styleSheet.cssRules[i].cssText + "<br>";} //takes all the css rules for the hexagon
					var stringCSS = cssText.toString().replace(/{/g, "{&emsp;").replace(/;/g, ";<br>&emsp;").replace(/}/g, "}<br>"); //organizes them to display on the page and look half decent
					hexagonCSS.innerHTML = stringCSS; //sticks it in the code holder slot for CSS
}