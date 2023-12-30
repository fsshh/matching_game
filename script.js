var grid_container = document.getElementById('grid-container');
var num_button = document.querySelectorAll('.num_button');

// check if the user has click the number button/s atleast once
let clickedOnce = false;
let previousValue = 0;
 
// START
elementDisplay('flex', 'none');

// UPDATE
num_button.forEach(bttn => {

    var buttonValue = bttn.getAttribute('value');
    var buttonValue_Int =  parseInt(buttonValue);

    var buttonValue_Squared = buttonValue_Int * buttonValue_Int;

    bttn.addEventListener('click', () =>{
 
        elementDisplay('none', 'flex');

        if(previousValue != buttonValue_Squared){

            for (let i = 0; i < buttonValue_Squared; i++) {
                
                var newDiv = document.createElement('div');
                newDiv.className = 'box';
                grid_container.appendChild(newDiv);

                var svg_img = document.createElement("img");
                svg_img.className = "element_svg";
                newDiv.appendChild(svg_img);
            }

            var box = document.getElementsByClassName('box');
            var svgImage = document.querySelectorAll('.element_svg');
            addFruitToElement(box, svgImage);

            grid_container.style.gridTemplate = `repeat(${buttonValue_Int}, 1fr) / repeat(${buttonValue_Int}, 1fr)`;

            previousValue = buttonValue_Squared;
        }
        else {alert('number of element has already exists');}

        clickedOnce = true;
    })
});

function elementDisplay(buttonDisplay, boxDisplay){
    var box_container = document.getElementById('box_container');
    var button_container = document.getElementById('button_container');
    
    box_container.style.display = boxDisplay;
    button_container.style.display = buttonDisplay;
}


function randomFruitSelector() {
    var apple = "svgs/apple.svg";
    var banana = "svgs/banana.svg";
    var grape = "svgs/grape.svg";
    var kiwi = "svgs/kiwi.svg";
    var orange = "svgs/orange.svg"
    var tomato = "svgs/tomato.svg";

    let list = [apple, banana, grape, kiwi, orange, tomato];
    let randomFruit = Math.floor(Math.random() * list.length);

    return list[randomFruit];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function addFruitToElement(elementClass, svg_image){
    let lenOfElement = elementClass.length;
    let fruits = [];
    
    for (let i = 0; i < lenOfElement / 2; i++) {
        fruits.push(randomFruitSelector());
    }
    
    // ARRAY PUT INTO HALF OF THE ELEMENTS
    let firstHalf = 0;
    while(firstHalf < lenOfElement){
        svg_image[firstHalf].src = fruits[firstHalf];
        firstHalf++;
    }
    // SHUFFLED ARRAY INTO THE LAST HALF OF THE ELEMENTS
    let secondHalf = Math.floor(lenOfElement / 2);
    let i = 0;
    shuffleArray(fruits);
    while(secondHalf < lenOfElement){
        svg_image[secondHalf].src = fruits[i];
        secondHalf++;
        i++;
    }
}
