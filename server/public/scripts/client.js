console.log('client.js is sourced!');

//Defining global variables
let calcHistory = document.querySelector('#calcHistory');
let recentResult = document.querySelector('#recentResult');

//Functions and variables needed to populate the 'operator' property in the object being sent in POST route
let operatorArray = []

function getPlusOperator() {
    operatorArray.push('+')
    console.log(operatorArray);
}

function getMinusOperator() {
    operatorArray.push('-')
    console.log(operatorArray);
}

function getTimesOperator() {
    operatorArray.push('*')
    console.log(operatorArray);
}

function getDividedByOperator() {
    operatorArray.push('/')
    console.log(operatorArray);
}
//-------------------------------------------------------------------------------------

//Defining global functions
function renderCalculationsHistory(calcArray) {
    calcHistory.innerHTML = '';
    for (let calc of calcArray) {
        calcHistory.innerHTML += `
        <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
        `
    }
    console.log('List of all calculations:', calcArray);
}

function renderRecentResult(calcArray) {
    recentResult.innerHTML = '';
    let mostRecentResult = calcArray[calcArray.length-1].result;
    recentResult.innerHTML = mostRecentResult;
}

function getCalculations() {
    axios({
        method:'GET',
        url: '/calculations',
      })
        .then (function (response) {
            console.log('GET Response:', response.data);
            renderCalculationsHistory(response.data);
            renderRecentResult(response.data);
        })
        .catch ((error) => {
            console.error('GET Error:', error);
        })
}

function postCalculation(event) {
    event.preventDefault();

    //Defining each part of a calculation submission
    let firstNum = document.querySelector('#firstNum');
    let secondNum = document.querySelector('#secondNum');
    let currentOperator = operatorArray[operatorArray.length-1]

    let calcSubmissionData = [{
        numOne: Number(firstNum.value),
        numTwo: Number(secondNum.value),
        operator: currentOperator
        }]

    axios.post('/calculations', calcSubmissionData)
    .then((response) => {
        getCalculations();
        //Clearing out input fields upon successful entry
        firstNum.value = '';
        secondNum.value = '';
    })
    .catch ((error) => {
        console.log('Oh no POST method failed');
        //QUESTION FOR GRADER: WHAT WOULD BE A HELPFUL ERROR MESSAGE THINGY TO PUT HERE? THANKS!
    })

}

getCalculations();