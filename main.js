const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const body = document.querySelector('body')
const clickAudio = document.getElementById('click-sound')
const firstMessageFromRealWorld = document.getElementById('first message')
const secondMessage = document.getElementById('second-meassage')
const thirdMessage = document.getElementById('third-message')
const fourthMessage = document.getElementById('4th-message')
const fifthMessage = document.getElementById('5th-message')
const sixthMessage = document.getElementById('6th-message')
const seventhMessage = document.getElementById('7th-message')

let playAudio = confirm('Would you like to play with sound effects')
let invinceibleMode = false
let points = 0
let time = 0
let storyMode = confirm('would you like to play with storyline or play endless mode? Click ok to play with storyline.')
let powerUpMode = false
let shieldPwrUp = false
let tripleShootPwrUp = false
let shockwavePWRUp = false
let animationId
let bossLevel = false
let spawnMonstersID
let numberOfMonstersSpawnedInBossMode = 0

function randomNum(min, max){
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
};
