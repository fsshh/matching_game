var grid_container = document.getElementById('grid-container');
var num_button = document.querySelectorAll('.num_button');

// START
// SHOWS THE OPTION MENU
elementDisplay('flex', 'none');

// UPDATE
num_button.forEach(bttn => {

    var buttonValue = bttn.getAttribute('value');
    var buttonValue_Int =  parseInt(buttonValue);

    var buttonValue_Squared = buttonValue_Int * buttonValue_Int;

    bttn.addEventListener('click', () =>{
        // SHOWS THE GAME
        elementDisplay('none', 'flex');

        for (let i = 0; i < buttonValue_Squared; i++) {
            
            var newDiv = document.createElement('div');
            newDiv.className = 'box';
            grid_container.appendChild(newDiv);

            var svg_img = document.createElement("img");
            svg_img.className = "element_svg";
            newDiv.appendChild(svg_img);
        }

        var box = document.querySelectorAll('.box');
        var svgImage = document.querySelectorAll('.element_svg');
        addFruitToElement(box, svgImage);
        gameMechanic(box, svgImage);

        // STYLE THE GRID CONTAINER USING THE BUTTON VALUE AS REFERENCE FOR THE ROWS AND COLUMNS OF THE GRID
        grid_container.style.gridTemplate = `repeat(${buttonValue_Int}, 1fr) / repeat(${buttonValue_Int}, 1fr)`;

    });
});



function elementDisplay(buttonDisplay, boxDisplay){
    var box_container = document.getElementById('box_container');
    var menu_container = document.getElementById('menu_container');
    
    box_container.style.display = boxDisplay;
    menu_container.style.display = buttonDisplay;
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

function gameMechanic(boxElement) {
    // THE TWO VARIABLES THAT WILL CATCH THE USER'S CHOSEN FRUITS
    let pickedElement1 = '';
    let pickedElement2 = '';

    let clickCount = 0;
    let matchedCount = 0;

    let all_SvgClass = document.querySelectorAll('.element_svg');
    boxElement.forEach(function(box){
        let svg = box.querySelector('.element_svg');

        svg.style.opacity = '0%';
        box.addEventListener('click', () =>{
            // IF THE ELEMENT DOES NOT HAVE A MATCH AND VISIBLE
            if(!svg.classList.contains('matched')){    
                svg.style.opacity = '100%';
                clickCount++;
                if(clickCount === 1){
                    // GET THE CURRENT ELEMENT_SVG'S FILE PATH/SRC AS A REFERENCE
                    pickedElement1 = svg.src;

                    // ADD THE "MATCHED" AND "PICKED" CLASS AS A PLACEHOLDER TO TELL WHICH ARE THE USER'S PAIR OF PICKED FRUITS
                    svg.classList.add('matched');
                    svg.classList.add('picked');
                }
                
                else if(clickCount === 2){
                    // GET THE CURRENT ELEMENT_SVG'S FILE PATH/SRC AS A REFERENCE
                    pickedElement2 = svg.src;

                    // ADD THE "MATCHED" AND "PICKED" CLASS AS A PLACEHOLDER TO TELL WHICH ARE THE USER'S PAIR OF PICKED FRUITS
                    svg.classList.add('matched');
                    svg.classList.add('picked');

                    // REMOVE THE PICKED AND MATCHED CLASSES TO RESTART THE PICKING PROCESS OF THE CHOSEN FRUITS IF THEY DO NOT MATCH
                    if(pickedElement1 != pickedElement2){
                        // DELAY THE PROCESS TO SHOW THE USER'S ERROR BY 0.5 SECONDS
                        setTimeout(() => { 
                            all_SvgClass.forEach(svg_Item =>{
                                if(svg_Item.classList.contains('picked')){
                                    svg_Item.classList.remove('matched')
                                    svg_Item.classList.remove('picked')
                                    svg_Item.style.opacity = "0%";
                                        
                                }
                            })
                        }, 500);
                        
                        clickCount = 0;
                    }
                    else{
                        all_SvgClass.forEach(svg_Item =>{
                            if(svg_Item.classList.contains('picked')){
                                svg_Item.classList.remove('picked')
                                matchedCount++;
                            }
                        })
                        console.log(matchedCount);
                        // !! WIN CONDITION !!
                        // IF ALL THE FRUIT HAS A PAIR
                        if(matchedCount === boxElement.length){
                            setTimeout(() => {                                
                                alert('Win');
                                // DELETE THE ELEMENTS TO PREVENT OVERLAPPING AND TO RESET THE GAME
                                boxElement.forEach(el =>{
                                    el.remove();
                                })
                                elementDisplay('flex', 'none');
                            }, 500);
                        }
                        clickCount = 0;
                    }   
                }
            }
        });
    });
   
}