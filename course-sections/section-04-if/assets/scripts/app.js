const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
// also works 
// let logEntries = [1, 2, 3];
//Just one more comment!

function getUserNumberInput() {
    return parseInt(usrInput.value);
}

// Generates and writes calculation log

function writeToLog(
    operationIdentifier,
    prevResult,
    operationNumber,
    newResult
){
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntry.operation);
    console.log(logEntries);
}

function createAndWriteOutput (operator, resultBeforeCalc,calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);// from vendor file
}

function calculatedResult (calculationType) {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
        currentResult += enteredNumber;
        mathOperator = '+';
    } else {
        currentResult -=  enteredNumber;
        mathOperator = '-';
    }
    
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add () {
    calculatedResult ('ADD');
    }
    
function subtract () {
    calculatedResult ('SUBTRACT');
}

function multiply () {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult * enteredNumber;
    createAndWriteOutput("*", initialResult, enteredNumber);
    writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}

function divide () {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult / enteredNumber;
    createAndWriteOutput("/", initialResult, enteredNumber);
    writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);

}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);