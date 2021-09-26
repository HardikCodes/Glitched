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
let playAudio = confirm('Would you like to play with sound effects')
let invinceibleMode = false

firstMessageFromRealWorld.style.display='block'

setTimeout(() =>{
    setTimeout(() => {
        monsters.forEach((index)=> {
            monsters.splice(index,1)
        });
        cancelAnimationFrame(animationId)

        secondMessage.style.display = 'block'
        setTimeout(() => {
            secondMessage.style.display = 'none'
            thirdMessage.style.display = 'block'
            setTimeout(() => {
                thirdMessage.style.display ='none'
                fourthMessage.style.display ='block'
                setTimeout(() => {
                    fourthMessage.style.display ='none'
                    fifthMessage.style.display = 'block'
                    setTimeout(() =>{
                        fifthMessage.style.display ='none'
                        sixthMessage.style.display ='block'
                        setTimeout(() => {
                            powerUpMode = true
                            animate()
                            sixthMessage.style.display ='none'
                        })
                    },20000)
                },10000)
            },10000)
        },5000)
    },300000)
    firstMessageFromRealWorld.style.display = 'none'
    let time = 0
let powerUpMode = false
let shieldPwrUp = false
let tripleShootPwrUp = false

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor(x,y,radius,color){
        this.x = x 
        this.y =y
        this.radius = radius
        this.color = color 
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Bullet {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}

class Monster {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}

class Particle {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update (){
        this.draw()
        this.x+=this.velocity.x 
        this.y+=this.velocity.y
    }
}


const x = innerWidth / 2
const y = innerHeight / 2
const player = new Player(x,y,10,'white')
const playerPowerUp = new Player(x,y,10,'blue')
const tripleShooterPlayer = new Player(x,y,10,'green')
const sheildPlayer = new Player(x,y,10,'rgb(0, 255, 255)')
const invinciblePlayer = new Player(x,y,10,'#FFD700')

const bullets = []
const specialBullets = []
const monsters = []

function spawnMonsters() {
    setInterval(() => {
        const radius = Math.random() * (70 - 10) + 10
        let x 
        let y 

        if (Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0-radius : canvas.width + radius
            y = Math.random() * canvas.height
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = `hsl(${Math.random()*360},${Math.random()*100}%,50%)`

        const angle = Math.atan2(canvas.height/2 - y , canvas.width/2 - x)
    
        let velocity = {
            x:Math.cos(angle)*50/radius,
            y:Math.sin(angle)*50/radius
        }

        monsters.push(new Monster(x,y,radius,color,velocity))
    },3000 - time*time * 0.7)
}
let animationId
function animate(){

    animationId = requestAnimationFrame(animate)
    c.fillStyle ='rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
    if(powerUpMode === true){
        playerPowerUp.draw()
    }
    if(tripleShootPwrUp === true){
      tripleShooterPlayer.draw()
    }

    if(shieldPwrUp === true){
        sheildPlayer.draw()
    } 

    if(invinceibleMode === true){
        invinciblePlayer.draw()
    }
    monsters.forEach((monster,index) => {
        monster.update()

        const dist = Math.hypot(player.x - monster.x , player.y - monster.y)

        if(dist -monster.radius - player.radius < 0){
            if(shieldPwrUp === true){
                shieldPwrUp = false 
                monsters.splice(index,1)
            }else if (invinceibleMode === true){
                monsters.splice(index,1)
            }
            else{
                cancelAnimationFrame(animationId)
            }
        }

        bullets.forEach((bullet,bulletIndex) =>{
            const dist = Math.hypot(bullet.x - monster.x , bullet.y - monster.y)

            if(dist -monster.radius - bullet.radius < 0){
                if (monster.radius - 10 > 10){
                    gsap.to(monster, {radius:monster.radius-5})
                    if(tripleShootPwrUp === true){
                      gsap.to(monster , {radius:monster.radius -10})
                    }
                    setTimeout(() => {
                        bullets.splice(bulletIndex ,1)
                    },0)
                }else{
                    setTimeout(() => {
                        monsters.splice(index,1)
                        bullets.splice(bulletIndex ,1)
                    },0)
                    

                }
                /*
                if (bullet.x - bullet.radius < 0){
                    bullets.splice(bulletIndex ,1)
                 }
                 */
            }
        })
    })

    bullets.forEach((bullet) => {
        bullet.update()
    })



}

let yPos
let xPos

addEventListener('mousemove',() => {
    yPos = event.clientY
    xPos = event.clientX
})/** addEventListener('click',() =>{
    for(let i = 0;i<4;i++){}
})

if(i >=3){
    clearInterval(shootInterval)
}*/


    addEventListener('click',() =>{
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
      if(tripleShootPwrUp === false){
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'white',velocity))
      }else if(tripleShootPwrUp === true){
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgb(0,255,0)',velocity))
      }
      if(playAudio === true){
        clickAudio.play()
        }
    }
    )
/**
    addEventListener('click',() =>{
      if(tripleShootPwrUp === true){
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
      body.requestFullscreen()
        setTimeout(() => {
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgb(0,255,0)',velocity))
        },0)
        setTimeout(() => {
          bullets.push(new Bullet(canvas.width/2,canvas.height/2.5,'rgb(0,255,0)',velocity))
        },100)
        setTimeout(() => {
          bullets.push(new Bullet(canvas.width/2,canvas.height/2.5,'rgb(0,255,0)',velocity))
        },200)
      }
                
    }
    )**/
    setInterval(() => {
        time += 0.1
    },100)

    setInterval(() => {
        spawnTimeCalc -= 1
    },500)

    addEventListener('mousemove',()=> {
        if(powerUpMode === true){
            
        const angle = Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2)
        
        const velocity = {
            x:Math.cos(angle)*5,
            y:Math.sin(angle)*5
        }
        bullets.push(new Bullet(canvas.width/2,canvas.height/2,5,'rgba(0,0,255,0.5)',velocity))
        }
    })

    setInterval(() => {
        if(Math.round(Math.random()*200) === 200){
            powerUpMode = true
        setTimeout(() => {
            powerUpMode = false
        }, 25000);
        }
    }, 1000);

    
    setInterval(() => {
        if(Math.round(Math.random()*500) === 500){
            shieldPwrUp = true
        }
    }, 1000);


        setInterval(() => {
        if(Math.round(Math.random()*200) === 200){
            tripleShootPwrUp = true
        setTimeout(() => {
            tripleShootPwrUp = false
        }, 25000);
        }
    }, 1000);

animate()
spawnMonsters()
},18000)


