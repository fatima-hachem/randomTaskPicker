
            // utilities
            // --------------------------------------------------------------------------------------------------------------------
            let getElemId = (id) => {
                return document.getElementById(id);
            }

            //variables
            // --------------------------------------------------------------------------------------------------------------------
            let tasks = [];
            const selectedTask = getElemId('selectedTask');
            const textField = getElemId('userTask');

            // adding listeners 
            textField.addEventListener('keyup', (e) => {
                //enter key = 13
                if (e.keyCode === 13){
                    addToToDoList();
                }
            });

            // more utilities
            const isThisMultiLine = str => {
                const firstIndex = str.indexOf('\n');
                const lastIndex = str.lastIndexOf('\n');
                return !(firstIndex === lastIndex);
            }

            //takes a multi line statement and returns an array with each line as an item
            const parseLines = (str) => {
                let multiLine = true;
                let startIndex = endIndex = 0;
                let splicedItems = [];
                let splicedString = ' ';

                //let temp = 0;

                while (multiLine){
                    endIndex = str.indexOf('\n', startIndex);
            
                    splicedString = str.slice(startIndex, endIndex);
                    
                    // check for empty strings
                    if (splicedString != ' '){
                        splicedItems.push(splicedString);
                    }

                    //debug zone
                    console.log(`splicedString = ${splicedString}`);
                    //console.log(`splicedItems = ${splicedItems}`);
            
                    startIndex = endIndex + 1;

                    multiLine =  str.includes('\n', startIndex + 1);
                    //console.log(`endIndex = ${endIndex} \n startIndex = ${startIndex} \n multiLine = ${multiLine}`);
                }

                if(startIndex < str.length){
                    splicedString = str.slice(startIndex);
                    splicedItems.push(splicedString);
                }

                return splicedItems;
            }

            const clearList = () => {
                const listItems = document.querySelectorAll('li');
                for (let i=listItems.length-1; i >= 0; i--){
                    listItems[i].remove();
                }
            }

            const appendToVisibleList = (text) => {
                console.log('appendToVisibleList HIT');

                // //create the list item
                const listItem = document.createElement('li');
                listItem.innerText = text;
                
                // add the list item to the ordered list
                getElemId('toDoList').appendChild(listItem);
            }

            const renderListView = () => {
                clearList();
                for (let i=0; i<tasks.length; i++){
                    appendToVisibleList(tasks[i]);
                }
            }

            // functions attached to buttons --------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------------------------------
            const resetThePage = () => {
                
                //reset tasks array
                tasks = [];

                //clear the list
                clearList();

                //reset input field for numbers
                getElemId('numTasksInput').value = 1;

                //clear the last random task
                selectedTask.value = ' ';
            }
            
            function addToToDoList() {
                //console.log('addToToDoList triggered');

                //get the value of the list item and add to an array
                let textFieldVal = getElemId('userTask').value;
                console.log(`beginning of addToToDoList \ntextFieldVal = ${textFieldVal}`);

                if (isThisMultiLine(textFieldVal)){
                    console.log('if (isThisMultiLine(textFieldVal)) HIT');
                   
                    // if the array is empty set it to the first batch entered
                    if (tasks.length <= 0){
                        console.log('if (tasks.length <= 0) hit');
                        tasks = parseLines(textFieldVal);
                    }

                    // if the array is populated then add to it
                    tasks.concat(parseLines(textFieldVal));

                }
                
                else{
                    console.log('else HIT');

                    // add the single item to the tasks array
                    tasks.push(textFieldVal);
                }
                
                // render list for user
                renderListView();
                
                //reset the text field for next input
                getElemId('userTask').value = " ";

            }

            function getRandomTask() {
                randomTask = 0;

                console.log('getRandomTask() HIT');
                //console.log(`get random task :: tasks = ${tasks}`);

                if (tasks.length > 0){
                    console.log(tasks.length);
                    randomTask = Math.floor(Math.random() * tasks.length);
                    selectedTask.innerText = `Task Number ${randomTask + 1}: ${tasks[randomTask]}`;
                    console.log(`IF statement randomTask = ${randomTask}`);
                }
                else {
                    let numTasks = getElemId('numTasksInput').value;
                    randomTask = Math.floor(Math.random() * numTasks);
                    selectedTask.innerText = `Task Number ${randomTask}`;
                    console.log(`ELSE statement randomTask = ${randomTask + 1}`);
                }

            }