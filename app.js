const puzzleBoard = document.querySelector("#puzzle")
const solveButton = document.querySelector("#solve-button")
const displaySolution = document.querySelector('#solution')

let submission = []
const squares = 81

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement("input")
    if (
        ((i % 9 == 0 || i % 9 ==1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 ==7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 ==4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 ==1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 ==7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('odd-section')
    }
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)

    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if(input.value){
        submission.push(input.value)
        }
        else{
            submission.push('.')
        }
    })
    console.log(submission)
}


const solve = () =>{
    joinValues()
    const data = {numbers: submission.join('')}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response=>response.json())
        .then(data =>{
            populateValues(data.solvable, data.solution)
            submission = []
            console.log(data)
        }
)
.catch((error) => {
        console.error('Error:',error)
    })
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input, i) => {
            input.value = solution[i]
            displaySolution.innerHTML = 'This is the answer'
        })
    } else {
        displaySolution.innerHTML = 'This is not solvable'

    }

}
solveButton.addEventListener('click', solve)

