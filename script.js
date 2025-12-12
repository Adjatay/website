//TASK MANAGER

const appDiv = document.getElementById('app');

const title = document.createElement('h1');
title.textContent = 'Task Manager';
appDiv.appendChild(title);

let totalTasksCount = 0;
let completedTasksCount = 0;
    
let totalTasks = document.createElement('h3');
totalTasks.textContent = 'Total Tasks - 0'; 
appDiv.appendChild(totalTasks);

let completedTasks = document.createElement('h3');
completedTasks.textContent = 'Completed Tasks - 0'; 
appDiv.appendChild(completedTasks);

const input = document.createElement('input');
appDiv.appendChild(input);

const addTaskBtn = document.createElement('button');
addTaskBtn.textContent = 'Add Task';
appDiv.appendChild(addTaskBtn);

const ul = document.createElement('ul');
appDiv.appendChild(ul);

addTaskBtn.addEventListener('click', function() {
    const taskText = input.value.trim();
    if (taskText === '') return; 

    totalTasksCount++;
    totalTasks.textContent = 'Total Tasks - ' + totalTasksCount;

    const li = document.createElement('li');

    const textSpan = document.createElement('span');  
    textSpan.textContent = taskText + ' ';
    li.appendChild(textSpan);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = ' Delete Task';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete Task';

    let isCompleted = false;

    completeBtn.addEventListener('click', function() {
       if (!isCompleted) {
        isCompleted = true;
        completedTasksCount++;
        completedTasks.textContent =  'Completed Tasks - ' + completedTasksCount;
       }

       textSpan.style.backgroundColor = 'lime';
    });
   
    deleteBtn.addEventListener('click', function() {
        totalTasksCount--;
        totalTasks.textContent = 'Total Tasks - ' + totalTasksCount; 
        if (isCompleted) {
            completedTasksCount--;
            completedTasks.textContent = 'Completed Tasks - ' + completedTasksCount;
        }
        ul.removeChild(li);     
    });

    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    ul.appendChild(li);
  
    input.value = '';  
});

//CALCULATOR
const calculatorDiv = document.getElementById('calculator');

const calculatorTitle = document.createElement('h1');
calculatorTitle.textContent = 'CASIOS 1440fx';
calculatorDiv.appendChild(calculatorTitle);

calculatorDiv.appendChild(document.createElement('hr'));

let calculatorDisplay = document.createElement('p');
calculatorDisplay.textContent = '';
calculatorDiv.appendChild(calculatorDisplay);

calculatorDiv.appendChild(document.createElement('hr'));

function addCalcBtn(text) {
    const btn = document.createElement('button');
    btn.textContent = text;

    if (text === '+' || text === '-' || text === '/' || text ==='*') {
        btn.setAttribute('data-type', 'operator')
        btn.addEventListener('click', function() {
            if (calculatorDisplay.textContent === 'Invalid Operation') return;
            for (let i = 0; i < calculatorDisplay.textContent.length; i++) {
                if (calculatorDisplay.textContent[i + 1] === undefined && (calculatorDisplay.textContent[i] === '+' || calculatorDisplay.textContent[i] === '-' || calculatorDisplay.textContent[i] === '/' || calculatorDisplay.textContent[i] === '*')) {
                    calculatorDisplay.textContent = 'Invalid Operation'; 
                    return;
                } 
            }  
            calculatorDisplay.textContent += text;  
        });
    } 
    
    else if (text === 'AC') {
        btn.setAttribute('data-type', 'ac')
        btn.addEventListener('click', function() {
            return calculatorDisplay.textContent = '';
        });
    }
    
    else if (text === '=') {
        btn.setAttribute('data-type', 'equal')
        btn.addEventListener('click', function () {
            if (calculatorDisplay.textContent === 'Invalid Operation') return;            

            try {
                let result = eval(calculatorDisplay.textContent);

                if (result === undefined || isNaN(result)) {
                    calculatorDisplay.textContent = 'Invalid Operation';
                    return;
                }

                calculatorDisplay.textContent = result;
            } 
            
            catch {
                calculatorDisplay.textContent = 'Invalid Operation';
            }

        });

    } 
    
    else if (text === '%' || text === '(' || text === ')') {
        btn.setAttribute('data-type', 'function')
        btn.addEventListener('click', function () {
            if (calculatorDisplay.textContent !== 'Invalid Operation') {
                calculatorDisplay.textContent += text;
            }
        });
    } 

    else {
        btn.setAttribute('data-type', 'numbers')
        btn.addEventListener('click', function () {
            if (calculatorDisplay.textContent !== 'Invalid Operation') {
                calculatorDisplay.textContent += text;
            }
        });
    }
    
    calculatorDiv.appendChild(btn);
    return btn;
}

const rowSpecialOperations = [addCalcBtn('('), addCalcBtn(')'), addCalcBtn('%'), addCalcBtn('AC')]; 
calculatorDiv.appendChild(document.createElement('br'));

const row7 = [addCalcBtn('7'), addCalcBtn('8'), addCalcBtn('9'), addCalcBtn('/')];
calculatorDiv.appendChild(document.createElement('br'));

const row4 = [addCalcBtn('4'), addCalcBtn('5'), addCalcBtn('6'), addCalcBtn('*')];
calculatorDiv.appendChild(document.createElement('br'));

const row1 = [addCalcBtn('1'), addCalcBtn('2'), addCalcBtn('3'), addCalcBtn('-')];
calculatorDiv.appendChild(document.createElement('br'));

const row0 = [addCalcBtn('0'), addCalcBtn('.'), addCalcBtn('='), addCalcBtn('+')];

//TIMER
const timerDiv = document.getElementById('timer');

const timerTitle = document.createElement('h1');
timerTitle.textContent = 'Timer';
timerDiv.appendChild(timerTitle);

timerDiv.appendChild(document.createElement('hr'));

let timerDisplay = document.createElement('p');
timerDisplay.textContent = ' ';
timerDiv.appendChild(timerDisplay);
timerDisplay.style.backgroundColor = 'lightgray';
timerDisplay.style.display = 'inline-block';

let totalSeconds = 0;

timerDiv.appendChild(document.createElement('hr'));

function parseLabelToSeconds(btnLabel) {
    const absoluteCase = btnLabel.toLowerCase();
    const value = parseInt(btnLabel);
    if (absoluteCase.includes('second')) return value;
    if (absoluteCase.includes('minute')) return value * 60;
    if (absoluteCase.includes('hour')) return value * 3600;
    return 0;
}

function formatting(totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return (`${hrs}:${mins}:${secs}`);
}

const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");


function createTimerButton(btnLabel) {
    const timerBtn = document.createElement('button');
    timerBtn.textContent = btnLabel;

    timerBtn.addEventListener('click', function() {
        const errorMessage = 'Invalid Time Input, Please try Again';
        const errorCheck = timerDisplay.textContent.trim();

        if (btnLabel === 'Set Time' && errorCheck === '') {
            timerDisplay.textContent = errorMessage;   
            return;
        }

        else if (errorCheck === '' || errorCheck === errorMessage && btnLabel !== 'Set Time') {
           timerDisplay.textContent = btnLabel;
        }
       
        else if (errorCheck !== errorMessage && btnLabel !== 'Set Time') {
            timerDisplay.textContent += ' + ' + btnLabel;
        } 
      
        else if (btnLabel === 'Set Time') {
            const parts = timerDisplay.textContent.split('+').map(p => p.trim());
            totalSeconds = 0;

            for (const part of parts) {
                totalSeconds += parseLabelToSeconds(part);
            }

            timerDisplay.textContent = formatting(totalSeconds);

            if (window.timerInterval) {
                clearInterval(window.timerInterval);
            }

            window.timerInterval = setInterval(function () {
                if (totalSeconds <= 0) {
                    clearInterval(window.timerInterval);
                    timerDisplay.textContent = "00:00:00";
                    return;
                }
                totalSeconds--;
                timerDisplay.textContent = formatting(totalSeconds);
            
                if (formatting(totalSeconds) === '00:00:00') {
                    setTimeout(() => {
                        alarm.play();
                        timerDisplay.textContent = '>>>>TEST<<<<';
                }, 2000);
            }
            }, 1000);
        }  
    });
    timerDiv.appendChild(timerBtn);
    return timerBtn;
}

const timerButtons = [
    createTimerButton('1 second'),
    createTimerButton('5 seconds'),
    createTimerButton('10 seconds'),
    createTimerButton('15 seconds'), 
    createTimerButton('30 seconds'),
    createTimerButton('1 Minute'),
    createTimerButton('5 Minutes'), 
    createTimerButton('10 Minutes'), 
    createTimerButton('15 Minutes'), 
    createTimerButton('30 Minutes'), 
    createTimerButton('1 hour'), 
    createTimerButton('6 Hours'), 
    createTimerButton('12 Hours'), 
    createTimerButton('Set Time')
];