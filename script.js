const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const displayNum = document.querySelector('#result');
const equals = document.querySelector('#equal');
const displayBar = document.querySelector('#display');
const clearBtn = document.querySelector("#clear");
const negBtn = document.querySelector('#neg');

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
    calculator.isNegative = false;
    calculator.takingSecondValue = false;
    calculator.displayingFirstVal = true;
    equationLine.textContent = '';
    displayCurrentNum();
}

function computeResult(){
    equationLine.textContent += calculator.secondValue;
    calculator.compute();
    displayCurrentNum();
}

function applyOperator(operator){
    calculator.addOperator(operator.id);
    displayEquation(operator.textContent);
}

function createButtonMethods(){
    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            calculator.changeValue(number.textContent);
        })
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            applyOperator(operator);
        })
    });

    equals.addEventListener('click', () => {
        computeResult();
    });

    clearBtn.addEventListener('click', () => {
        clear();
    });

    negBtn.addEventListener('click', () => {
        calculator.toggleNegative();
        displayCurrentNum();
    });
};

function initKeyboardInput(){
    document.addEventListener('keydown', (e) => {
        console.log(e.keyCode);
        if((e.keyCode >= 48 && e.keyCode <= 57 )|| (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 190) || (e.keyCode == 110)){
            if(e.key == '*'){
                calculator.addOperator('multiply');
                displayEquation('x');
            }
            else if(e.key == '%'){
                calculator.addOperator('mod');
                displayEquation('%');
            }
            else if(!isNaN(e.key)){
                calculator.changeValue(e.key);
            }
        }
        //enter key to compute equation
        else if(e.keyCode == 13){
            computeResult();
        }
        //add button
        else if(e.keyCode == 187 || e.keyCode == 107){
            calculator.addOperator('add');
            displayEquation('+');
        }
        //subtract button
        else if(e.keyCode == 189 || e.keyCode == 109){
            calculator.addOperator('subtract');
            displayEquation('-');
        }
        //divide button
        else if(e.keyCode == 191 || e.keyCode == 111){
            calculator.addOperator('divide');
            displayEquation('/');
        }

    })
}

//creating calculator object to hold equation
const calculator = {
    firstValue: '',
    secondValue: '',
    operator: null,
    isNegative: false,
    displayingFirstVal: true,
    takingSecondValue: false,
    changeValue(value) {
        if(!this.takingSecondValue){
            if(value == '.' && this.firstValue == ''){
                value = '0.';
            }
            this.firstValue += value;
        } else {
            if(value == '.' && this.secondValue == ''){
                value = '0.';
            }
            this.secondValue += value;
        }
        displayCurrentNum();
    },
    addOperator(op) {
        if(this.operator != null){
            this.compute();
        }
        this.operator = op;
        this.isNegative = false;
        this.takingSecondValue = true;
        this.displayingFirstVal = false;
        displayCurrentNum();
    },
    compute() {
        //only compute results if there is an operator -> prevents repeatedly pressing enter;
        if(this.operator != null){
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
            this.isNegative = false;
            this.displayingFirstVal = true;
            this.operator = null;
        }
    },
    toggleNegative() {
        this.isNegative = !this.isNegative;
        if(this.isNegative){
            if(this.takingSecondValue)
                this.secondValue = '-' + this.secondValue;
            else{
                this.firstValue = '-' + this.firstValue;
            }
        } else {
            if(this.takingSecondValue){
                this.secondValue = this.secondValue.substring(1);
            }
            else{
                this.firstValue = this.firstValue.substring(1);
            }
        }
    }
};

createEquationLine();
createButtonMethods();
initKeyboardInput();

