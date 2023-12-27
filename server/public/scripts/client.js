console.log('client.js is sourced!');

//Defining global variables
let calcHistory = document.querySelector('#calcHistory');

//Defining global functions
function renderCalculations(calcArray) {
    calcHistory.innerHTML = '';
    for (let calc of calcArray) {
        calcHistory.innerHTML += `
        <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
        `
    }
    console.log('List of all calculations:', calcArray);
}

function getCalculations() {
    axios({
        method:'GET',
        url: '/calculations',
      })
        .then (function (response) {
            console.log('GET Response:', response.data);
            renderCalculations(response.data);
        })
        .catch ((error) => {
            console.error('GET Error:', error);
        })
}

getCalculations();