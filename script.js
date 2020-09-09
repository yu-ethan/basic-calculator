const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const displayNum = document.querySelector('#result');
const equals = document.querySelector('#equal');
const displayBar = document.querySelector('#display');
const clearBtn = document.querySelector("#clear");

function createEquationLine(){
    const equationLine = document.createElement('span');
    equationLine.setAttribute('id', 'equationLine');
    displayBar.insertBefore(equationLine, displayNum);
}

function displayCurrentNum(){
    displayNum.textContent = calculator.displayingFirstVal ? calculator.firstValue : calculator.secondValue;
}

function displayEquation(op){
    equationLine.textContent = `${calculator.firstValue} ${op} `;
}

function clear(){
    calculator.firstValue = '';
    calculator.secondValue = '';
    calculator.operator = null;
    calculator.takingSecondValue = false;
    calculator.displayingFirstVal = true;
    equationLine.textContent = '';
    displayCurrentNum();
}

function createButtonMethods(){
    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            calculator.changeValue(number.textContent);
            displayCurrentNum();
        })
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            calculator.addOperator(operator.id);
            displayEquation(operator.textContent);
            displayCurrentNum();
        })
    });

    equals.addEventListener('click', () => {
        equationLine.textContent += calculator.secondValue;
        calculator.compute();
        displayCurrentNum();
    });

    clearBtn.addEventListener('click', () => {
        clear();
    })
};

//creating calculator object to hold equation
const calculator = {
    firstValue: '',
    secondValue: '',
    operator: null,
    displayingFirstVal: true,
    takingSecondValue: false,
    changeValue(value) {
        if(!this.takingSecondValue){
            this.firstValue += value;
        } else {
            this.secondValue += value;
        }
    },
    addOperator(op) {
        if(this.operator != null){
            this.compute();
        }
        this.operator = op;
        this.takingSecondValue = true;
        this.displayingFirstVal = false;
    },
    compute() {
        const x = parseFloat(this.firstValue, 10);
        const y = parseFloat(this.secondValue, 10);
        let ans;
        switch(this.operator){
            case 'add':
                ans = x + y;
                break;
            case 'subtract':
                ans = x-y;
                break;
            case 'multiply':
                ans = x*y;
                break;
            case 'divide':
                ans = x/y;
                break;
            case 'mod':
                ans = x%y;
                break;
        }
        this.firstValue = ans;
        this.secondValue = '';
        this.displayingFirstVal = true;
        this.operator = null;
    }
};

createEquationLine();
createButtonMethods();

