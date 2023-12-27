var grid_container = document.getElementById('grid-container');
var num_button = document.querySelectorAll('.num_button');

// check if the user has click the number button/s atleast once
let clickedOnce = false;
let previousValue = 0;

num_button.forEach(bttn => {

    var buttonValue = bttn.getAttribute('value');
    var buttonValue_Int =  parseInt(buttonValue);

    var buttonValue_Squared = buttonValue_Int * buttonValue_Int;

    bttn.addEventListener('click', () =>{
    
        if(previousValue != buttonValue_Squared){

            for (let i = 0; i < buttonValue_Squared; i++) {
                
                var newDiv = document.createElement('div');
                newDiv.className = 'box';
                grid_container.appendChild(newDiv);
            }
    
            grid_container.style.gridTemplate = `repeat(${buttonValue_Int}, 1fr) / repeat(${buttonValue_Int}, 1fr)`;
            
            
            // ADD THE CURRENT VALUE OF THE BUTTON TO THE CURRENT ELEMENTS PRESENTED
            let box = document.querySelectorAll('.box');
            box.forEach(el => {
                el.classList.add(`${buttonValue_Squared}`)
            });
            
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



