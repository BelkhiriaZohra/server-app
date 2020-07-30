console.log('Client side javascript file is load')
const fetch = require('node-fetch');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=Boston').then((response) => {// + location
            console.log(response.text())
           /* response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent  = data.location
                    messageTwo.textContent = data.forecast
                }
            })*/
        })
    
})