
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From JS'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = 'Loading message...'
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response)=>response.json().then(data => {
    if (data.error){
        messageTwo.textContent = 'error happens: ' + data.error
    } else {
        messageOne.textContent = 'location is ' + data.location
        messageTwo.textContent = 'The chance of rain is ' + data.forecast.chance + ' and the temperature is ' +data.forecast.temperature
    }
}))
})