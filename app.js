const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll('.screen ')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
startBtn.addEventListener('click', (event) => {
    event.preventDefault() // отменить поведение по умолчанию
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }

})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const color = setColor(circle)
    const {width, height} = board.getBoundingClientRect() //деструктуризация 
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`


    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
    
}

// добавляем разноцветные кружки
const colors = ['#BDC83F', '#F5A00A', '#F5750A', '#D35027', '#7E3832']
function setColor(element) {
    const color = getRandomColor()
    element.style.background = `${color}`
}
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}


// --- взломаем нашу игру - функция будет сама тыкать по кружкам. заходим F12 и выбираем console. там метод winTheGame() и тыкаем enter после начала таймера
function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle')
    if (circle) {
      circle.click()
    }
  }
  setInterval(kill, 40)
}