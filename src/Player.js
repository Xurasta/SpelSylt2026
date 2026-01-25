import GameObject from './GameObject.js'

import MiniIdleSprite from './assets/player/Slime S Idle V1.png'
import MiniRunSprite from './assets/player/Slime S Running V2.png'
import MiniJumpSprite from './assets/player/Slime S Jumping V1.png'

import MiddleIdleSprite from './assets/player/Slime S Idle V1.png'
import MiddleRunSprite from './assets/player/Slime S Running V2.png'
import MiddleJumpSprite from './assets/player/Slime S Jumping V1.png'

import MaxIdleSprite from './assets/player/Slime S Idle V1.png'
import MaxRunSprite from './assets/player/Slime S Running V2.png'
import MaxJumpSprite from './assets/player/Slime S Jumping V1.png'




import fallSprite from './assets/Pixel Adventure 1/Main Characters/Ninja Frog/Fall (32x32).png'
import jumpSound from './assets/sounds/jump.mp3'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        
        // Nuvarande hastighet (pixels per millisekund)
        this.velocityX = 0
        this.velocityY = 0

        // Rörelsehastighet (hur snabbt spelaren accelererar/rör sig)
        this.moveSpeed = 0
        this.directionX = 0
        this.directionY = 0
        this.lastDirectionX=0
        this.constantMoveSpeed = 0.4
        
        // Dash egeneskaper
        this.dashSpeed = 2.4
        this.dashTimer = 0
        this.isDashing = false
        
        
        // Fysik egenskaper
        this.jumpCount = 0
        this.maxJumps = 2
        this.jumpPower = 0 // negativ hastighet för att hoppa uppåt
        this.isGrounded = false // om spelaren står på marken
        this.DecreaceOnesChecker=0
        this.constantJumpPower = -1
        
        
        
        // Health system
        this.maxHealth = 3
        this.health = this.maxHealth
        this.invulnerable = false // Immun mot skada efter att ha blivit träffad
        this.invulnerableTimer = 0
        this.invulnerableDuration = 1000 // 1 sekund i millisekunder

         // ljud effekter
        this.jumpSound = new Audio(jumpSound);
        this.jumpSound.volume = 0.3; // Sänk volymen lite

        


        
        // Sprite animation system - ladda sprites med olika hastigheter
        this.loadSprite('idle', MiniIdleSprite, 10, 150)  // Långsammare idle
        this.loadSprite('run', MiniRunSprite, 8, 80)     // Snabbare spring
        this.loadSprite('jump', MiniJumpSprite, 8,100)
        this.loadSprite('fall', MiniIdleSprite, 10,100)


        //this.loadSprite('idle', MiddleIdleSprite, 10, 150)  // Långsammare idle
        //this.loadSprite('run', MiddleRunSprite, 8, 80)     // Snabbare spring
        //this.loadSprite('jump', MiddleJumpSprite, 8,100)
        //this.loadSprite('fall', MiddleIdleSprite, 10,100)


       // this.loadSprite('idle', MaxIdleSprite, 10, 150)  // Långsammare idle
       // this.loadSprite('run', MaxRunSprite, 8, 80)     // Snabbare spring
        //this.loadSprite('jump', MaxJumpSprite, 8,100)
        //this.loadSprite('fall', MaxIdleSprite, 10,100)
        
        this.currentAnimation = 'idle'
        this.currentSizeState="middle"
    }

    update(deltaTime) {
        // Startar dash timer
        if (!this.isDashing && this.game.inputHandler.keys.has('Shift') && this.currentSizeState!='mini') {
            this.SizeChange('Decreace')
            this.game.inputHandler.keys.delete('Shift')
            this.startTimer('dashTimer', 100)
            this.isDashing = true
        }

        // Dash - updaterar tiden och sätter velocity i x-led till dashSpeed
        if (this.isDashing) { 
            this.updateTimer('dashTimer', deltaTime)
            // Fixar enkelriktat problemet
            if (this.lastDirectionX != 0) {
                this.velocityX = this.dashSpeed * this.lastDirectionX
            } else {
                this.velocityX = this.dashSpeed
            }
            // Kollar när dash bör sluta
            if (this.dashTimer == 0) {
                this.isDashing = false
            }

        } else {
            // Horisontell rörelse
            if (this.game.inputHandler.keys.has('ArrowLeft')) {
                this.velocityX = -this.moveSpeed
                this.directionX = -1
                this.lastDirectionX = -1 // Spara riktning
            } else if (this.game.inputHandler.keys.has('ArrowRight')) {
                this.velocityX = this.moveSpeed
                this.directionX = 1
                this.lastDirectionX = 1 // Spara riktning
            } else {
                this.velocityX = 0
                this.directionX = 0
            }
        }
        // Hoppa
        if ( this.game.inputHandler.keys.has(' ') && (this.jumpCount <1 || this.jumpCount < this.maxJumps) ){
            this.game.inputHandler.keys.delete(' ')            
            this.velocityY = this.jumpPower
            this.isGrounded = false
            if (this.jumpCount == 1){
                this.jumpSound.play();
            }
            this.game.inputHandler.keys.delete(' ')
            this.jumpCount +++ 1

        }else if (this.jumpCount==this.maxJumps && this.DecreaceOnesChecker<1  ){
            this.SizeChange('Decreace')
            this.DecreaceOnesChecker=1
        }

        if (this.isGrounded == true) {
            this.jumpCount = 0
            this.DecreaceOnesChecker=0

        }else{

        }




        if (this.game.inputHandler.keys.has('q')  ) {
            this.game.inputHandler.keys.delete('q')
            this.SizeChange('Increace')          
        }



        if (this.game.inputHandler.keys.has('e') ) {
            this.game.inputHandler.keys.delete('e')
            this.SizeChange('Decreace') 
        }

        // Applicera gravitation
        this.velocityY += this.game.gravity * deltaTime
        
        // Applicera luftmotstånd (friktion)
        if (this.velocityY > 0) {
            this.velocityY -= this.game.friction * deltaTime
            if (this.velocityY < 0) this.velocityY = 0
        }

        // Sätt directionY baserat på vertikal hastighet för ögonrörelse
        if (this.velocityY < -0.1) {
            this.directionY = -1 // tittar upp när man hoppar
        } else if (this.velocityY > 0.1) {
            this.directionY = 1 // tittar ner när man faller
        } else {
            this.directionY = 0
        }

        // Uppdatera position baserat på hastighet
        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime
        
        // Uppdatera invulnerability timer
        if (this.invulnerable) {
            this.invulnerableTimer -= deltaTime
            if (this.invulnerableTimer <= 0) {
                this.invulnerable = false
            }
        }
        
        // Uppdatera shoot cooldown

        
        // Skjut med X-tangenten
        // Uppdatera animation state baserat på movement
        if (!this.isGrounded && this.velocityY < 0 && this.currentSizeState=='mini') {
            this.setAnimation('jump')
        } else if (!this.isGrounded && this.velocityY > 0 && this.currentSizeState=='mini' ) {
            this.setAnimation('fall')
        } else if (this.velocityX !== 0 && this.currentSizeState=='mini') {
            this.setAnimation('run')
        } else if( this.currentSizeState=='mini' ) {
            this.setAnimation('idle')
        }


        if (!this.isGrounded && this.velocityY < 0 && this.currentSizeState=='middle') {
            this.setAnimation('jump')
        } else if (!this.isGrounded && this.velocityY > 0 && this.currentSizeState=='middle' ) {
            this.setAnimation('fall')
        } else if (this.velocityX !== 0 && this.currentSizeState=='middle') {
            this.setAnimation('run')
        } else if( this.currentSizeState=='middle' ) {
            this.setAnimation('idle')
        }

        if (!this.isGrounded && this.velocityY < 0 && this.currentSizeState=='max') {
            this.setAnimation('jump')
        } else if (!this.isGrounded && this.velocityY > 0 && this.currentSizeState=='max' ) {
            this.setAnimation('fall')
        } else if (this.velocityX !== 0 && this.currentSizeState=='max') {
            this.setAnimation('run')
        } else if( this.currentSizeState=='max' ) {
            this.setAnimation('idle')
        }

    

        // Size Changer 
        if (this.currentSizeState=='middle'){
            this.width= 40
            this.height= 40
            this.jumpPower= this.constantJumpPower * 0.45
            this.moveSpeed= this.constantMoveSpeed * 0.45
            this.maxJumps= 2
        }  
        else if (this.currentSizeState=='mini'){
            this.width= 20
            this.height= 20
            this.jumpPower= this.constantJumpPower * 0.40
            this.moveSpeed= this.constantMoveSpeed * 0.40
            this.maxJumps= 1
        }
        else if (this.currentSizeState=='max'){
            this.width= 60
            this.height= 60
            this.jumpPower= this.constantJumpPower * 0.50
            this.moveSpeed= this.constantMoveSpeed * 0.50
            this.maxJumps= 2

        }

        
            

        
        // Uppdatera animation frame
        this.updateAnimation(deltaTime)
    }



    SizeChange(Size){
        
        if (Size =='Increace'){
            console.log(this.currentSizeState)
            if (this.currentSizeState== 'middle'){
                this.currentSizeState='max'
                this.x-=10}

            else if (this.currentSizeState== 'mini'){
                this.currentSizeState='middle'
                this.x-=10}
            }


        else if (Size =='Decreace'){
            console.log(this.currentSizeState)
            if(this.currentSizeState=='middle'){
                this.currentSizeState='mini'
                this.x+=10
            }

            else if (this.currentSizeState=='max'){
                this.currentSizeState='middle'
                this.x+=10
            }

            
        }


      


            

                
                
    
    } 
    
    handlePlatformCollision(platform) {
        const collision = this.getCollisionData(platform)
        
        if (collision) {
            if (collision.direction === 'top' && this.velocityY > 0) {
                // Kollision från ovan - spelaren landar på plattformen
                console.log('top')
                this.y = platform.y - this.height
                this.velocityY = 0
                this.isGrounded = true
            } else if (collision.direction === 'bottom' && this.velocityY < 0) {
                // Kollision från nedan - spelaren träffar huvudet
                this.y = platform.y + platform.height
                this.velocityY = 0
            } else if (collision.direction === 'left' && this.velocityX > 0) {
                // Kollision från vänster
                this.x = platform.x - this.width
            } else if (collision.direction === 'right' && this.velocityX < 0) {
                // Kollision från höger
                this.x = platform.x + platform.width
            }
        }
    }

    draw(ctx, camera = null) {
        // Blinka när spelaren är invulnerable
        if (this.invulnerable) {
            const blinkSpeed = 100 // millisekunder per blink
            if (Math.floor(this.invulnerableTimer / blinkSpeed) % 2 === 0) {
                return // Skippa rendering denna frame för blink-effekt
            }
        }
        
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        
        // Försök rita sprite, annars fallback till rektangel
        const spriteDrawn = this.drawSprite(ctx, camera, this.lastDirectionX === -1)
        
        if (!spriteDrawn) {
            // Fallback: Rita spelaren som en rektangel
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)

            // Rita ögon
            ctx.fillStyle = 'white'
            ctx.fillRect(screenX + this.width * 0.2, screenY + this.height * 0.2, this.width * 0.2, this.height * 0.2)
            ctx.fillRect(screenX + this.width * 0.6, screenY + this.height * 0.2, this.width * 0.2, this.height * 0.2)
            
            // Rita pupiller
            ctx.fillStyle = 'black'
            ctx.fillRect(
                screenX + this.width * 0.25 + this.directionX * this.width * 0.05, 
                screenY + this.height * 0.25 + this.directionY * this.width * 0.05, 
                this.width * 0.1, 
                this.height * 0.1
            )
            ctx.fillRect(
                screenX + this.width * 0.65 + this.directionX * this.width * 0.05, 
                screenY + this.height * 0.25 + this.directionY * this.width * 0.05, 
                this.width * 0.1, 
                this.height * 0.1
            )
            // rita mun som ett streck
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(screenX + this.width * 0.3, screenY + this.height * 0.65)
            ctx.lineTo(screenX + this.width * 0.7, screenY + this.height * 0.65)
            ctx.stroke()
        }
    }
}