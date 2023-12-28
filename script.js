var elementDisplay = (buttonDisplay, boxDisplay) =>{
    var box_container = document.getElementById('box_container');
    var button_container = document.getElementById('button_container');
    
    box_container.style.display = boxDisplay;
    button_container.style.display = buttonDisplay;
}

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
            }
            
            grid_container.style.gridTemplate = `repeat(${buttonValue_Int}, 1fr) / repeat(${buttonValue_Int}, 1fr)`;
            
            let box = document.querySelectorAll('.box');
            box.forEach(el => {
                // ADD THE CURRENT VALUE OF THE BUTTON TO THE CURRENT ELEMENTS PRESENTED
                // ?? USELESS FOR NOW ??
                el.classList.add(`${buttonValue_Squared}`)
                // ADD A RANDOM FRUIT TO EACH CELL
                el.appendChild(randomFruitSelector())
            });

            
            // ?? USELESS FOR NOW ??
            // REMOVE THE PREVIOUS ELEMENTS THAT HAS AN OLD CURRENT VALUE TO MAKE ROOM FOR THE NEW CURRENT VALUE
            if(clickedOnce == true){
                box.forEach(el => {
                    if(el.classList.contains(`${previousValue}`)){
                        el.remove();
                    }
                });
            }

            previousValue = buttonValue_Squared;
        }
        else {alert('number of element has already exists');}

        clickedOnce = true;
    })
});

function randomFruitSelector() {
    var apple = "svgs/apple.svg";
    var banana = "svgs/banana.svg";
    var grape = "svgs/grape.svg";
    var kiwi = "svgs/kiwi.svg";
    var orange = "svgs/orange.svg"
    var tomato = "svgs/tomato.svg";

    let list = [apple, banana, grape, kiwi, orange, tomato];
    let randomFruit = Math.floor(Math.random() * list.length);

    var svg_img = document.createElement("img");
    svg_img.className = "element_svg"; 
    svg_img.src = `${list[randomFruit]}`; 


    return svg_img;
}

// TODO LIST

// MAKE EACH PICKED FRUIT A PAIR
