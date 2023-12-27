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

function postCalculation(event) {
    event.preventDefault();

    //Defining each part of a calculation submission
    let firstNum = document.querySelector('#firstNum');
    let operator = SOMETHINGIDKLOL;
    let secondNum = document.querySelector('#secondNum');

    let entryData = [{
        item: itemInput.value,
        description: descriptionInput.value
        }]

    axios.post('/inventory', entryData)
    .then((response) => {
        getInventory();
        //Clearing out input fields upon successful entry
        itemInput.value = '';
        descriptionInput.value = '';
    })
    .catch ((error) => {
        console.log('Oh no POST method failed');
        //QUESTION FOR GRADER: WHAT WOULD BE A HELPFUL ERROR MESSAGE THINGY TO PUT HERE? THANKS!
    })

}

getCalculations();