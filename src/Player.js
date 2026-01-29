import GameObject from './GameObject.js'

import SlimeBlob from './slimeBlob.js'



// Idle Mini
import MiniIdle from '/home/billy/code/SpelSylt2026/src/assets/player/Slime_S_Idle.png'
// Run Mini
import MiniRunActive from './assets/player/Slime_S_Running_Active.png'
import MiniRunStop from './assets/player/Slime_S_Running_Stop.png'

// jumping Mini
import MiniJumpAscend from '/home/billy/code/SpelSylt2026/src/assets/player/Slime_S_Jumping_Ascend.png'
import MiniJumpApex from './assets/player/Slime_S_Jumping_Apex.png'
import MiniJumpDescend from './assets/player/Slime_S_Jumping_Descend.png'
import MiniJumpLanding from './assets/player/Slime_S_Jumping_Landing.png'


// "Growth" 
import MiniToMiddle from './assets/player/Slime_S_Grow.png'
import MiddleToMax from './assets/player/Slime_M_Grow.png'


// Idle Middle
import MiddleIdle from './assets/player/Slime_M_Idle.png'

// Run Middle
//import MiddleRunActive from './assets/player/Slime_M_Running_Active.png'
//import MiddleRunStop from './assets/player/Slime_M_Running_Stop.png'

// Jump Middle
import MiddleJumpAscend from '/home/billy/code/SpelSylt2026/src/assets/player/Slime_M_Jumping_Ascend.png'
import MiddleJumpApex from './assets/player/Slime_M_Jumping_Apex.png'
import MiddleJumpDescend from './assets/player/Slime_M_Jumping_Descent.png'
import MiddleJumpLanding from './assets/player/Slime_M_Jumping_Landing.png'

// Dash Middle
import MiddleDash from  './assets/player/Slime_M_Dash.png'

// Idle Max
import MaxIdle from './assets/player/Slime_L_Idle.png'

// Run Max
import MaxRunActive from './assets/player/Slime_L_Running_Active.png'
import MaxRunStop from './assets/player/Slime_L_Running_Stop.png'

// Jump Max
import MaxJumpAscend from '/home/billy/code/SpelSylt2026/src/assets/player/Slime_L_Jumping_Ascend.png'
import MaxJumpApex from './assets/player/Slime_L_Jumping_Apex.png'
import MaxJumpDescend from './assets/player/Slime_L_Jumping_Ascend.png'
import MaxJumpLanding from './assets/player/Slime_L_Jumping_Landing.png'



import fallSprite from './assets/Pixel Adventure 1/Main Characters/Ninja Frog/Fall (32x32).png'
import jumpSound from './assets/sounds/jump.mp3'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        
        // Nuvarande hastighet (pixels per millisekund)
        this.velocityX = 0
        this.velocityY = 0
        this.timeout = 0

        // Rörelsehastighet (hur snabbt spelaren accelererar/rör sig)
        this.moveSpeed = 0.3
        this.directionX = 0
        this.directionY = 0
        this.lastDirectionX=0

        // Dash egeneskaper
        this.dashSpeed = 2
        this.dashTimer = 0
        this.isDashing = false
        

        // Fysik egenskaper
        this.jumpCount = 0
        this.maxJumps = 2
        this.jumpPower = -0.6 // negativ hastighet för att hoppa uppåt
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

        // Mini
        this.loadSprite('idle_S',MiniIdle, 10, 150)  
        this.loadSprite('Run_S_Active',MiniRunActive,3,150)
        this.loadSprite('Run_S_Stop',MiniRunStop,4,150)
        this.loadSprite('Jump_S_Ascend',MiniJumpAscend)
        this.loadSprite('Jump_S_Landing',MiniJumpLanding,3,150)
        this.loadSprite('Jump_S_Apex',MiniJumpApex,1,150)
        this.loadSprite('Jump_S_Descend',MiniJumpDescend,1,150)
        this.loadSprite('Growth_S',MiniToMiddle,5,150)



        //Middle
        this.loadSprite('idle_M',MiddleIdle, 8, 150)
       // this.loadSprite('Run_M_Active',MiddleRunActive,3,150)
       // this.loadSprite('Run_M_Stop',MiddleRunStop,4,150)
        this.loadSprite('Jump_M_Ascend',MiddleJumpAscend,1,150)
        this.loadSprite('Jump_M_Landing',MiddleJumpLanding,5,150)
        this.loadSprite('Jump_M_Apex',MiddleJumpApex,1,150)
        this.loadSprite('Jump_M_Descend',MiddleJumpDescend,1,150)
        this.loadSprite('Dash_M',MiddleDash,5,150 )
        this.loadSprite('Growh_M',MiddleToMax,10,150 )


        //Max
        this.loadSprite('idle_L',MaxIdle, 10, 150)
        this.loadSprite('Run_L_Active',MaxRunActive,9,150)
        this.loadSprite('Run_L_Stop',MaxRunStop,6,150)
        this.loadSprite('Jump_L_Ascend',MaxJumpAscend)
        this.loadSprite('Jump_L_Landing',MaxJumpLanding,7,150)
        this.loadSprite('Jump_L_Apex',MaxJumpApex,1,150)
        this.loadSprite('Jump_L_Descend',MaxJumpDescend,1,150)  
    



        this.currentAnimation = 'idle_S'
        this.currentSizeState="mini"
        this.Active_Animation='True'
        this.Active_Timer=1

    }

    update(deltaTime) {
        // Startar dash timer
        if (!this.isDashing && this.game.inputHandler.keys.has('Shift') && this.currentSizeState!='mini') {
            this.SizeChange('Decreace')
            this.game.inputHandler.keys.delete('Shift')
            this.startTimer('dashTimer', 100)
            this.isDashing = true
            this.game.slimeBlobs.push(
                new SlimeBlob (this.game, this.x, this.y, 20)
            )
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
                this.Active_Run='ON'
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

        } else if (this.jumpCount == this.maxJumps && this.DecreaceOnesChecker < 1 && this.currentSizeState !== 'mini'){
            this.SizeChange('Decreace')
            this.DecreaceOnesChecker = 1
            this.game.slimeBlobs.push(
                new SlimeBlob (this.game, this.x, this.y, 20)
            )
        }
        if (this.isGrounded == true) {
            this.jumpCount = 0
            this.DecreaceOnesChecker = 0

        } else{
            // Nothing?
        }

        // Öka storlek button
        if (this.game.inputHandler.keys.has('q')  ) {
            this.game.inputHandler.keys.delete('q')
            this.SizeChange('Increace')          
        }

        // Minska storlek button
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

        // Uppdatera animation state baserat på movement
        
//
            if(this.Active_Timer < 1){
                this.Active_Timer+=deltaTime/500
                console.log(this.Active_Timer)
            }else if (this.Active_Timer>1){
                this.Active_Timer=1
            }

        //    }else if (this.isGrounded && this.velocityX==this.moveSpeed || this.velocityX==  -this.moveSpeed ){
          //      this.setAnimation('Run_S_Active')
            //    this.Active_Timer=0
          //  }else if( this.isGrounded && this.Active_Timer!= 1){
            //    this.setAnimation('Run_S_Stop')
                
        
        if (this.currentSizeState=='mini'){
            console.log(this.velocityY)

            if(!this.isGrounded && this.velocityY < 0 ){
            this.setAnimation('Jump_S_Ascend')
            this.Active_Timer=-1
        }else if (!this.isGrounded && this.velocityY < 1 && this.Active_Timer!=1 ){
            this.setAnimation('Jump_S_Apex')
        }else if ( !this.isGrounded && this.velocityY < 1){
            this.setAnimation('Jump_S_Descend')
            this.Active_Timer=0

        }else if (this.isGrounded && this.velocityY >0 && this.Active_Timer!=1){
            this.setAnimation('Jump_S_Landing')
        }

        
        
        
        else{
            this.setAnimation('idle_S')
        }




      


        }


        if(this.currentSizeState=='max'){

        }














 
        

        
    
        // Size Changer 

        if (this.currentSizeState=='middle'){
            this.width= 80
            this.height= 80
            this.jumpPower= this.constantJumpPower * 0.45
            this.moveSpeed= this.constantMoveSpeed * 0.45
            this.maxJumps= 2
        }  
        else if (this.currentSizeState=='mini'){
            this.width= 64
            this.height= 64
            this.jumpPower= this.constantJumpPower * 0.40
            this.moveSpeed= this.constantMoveSpeed * 0.40
            this.maxJumps= 1
        }
        else if (this.currentSizeState=='max'){
            this.width= 128
            this.height= 128
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
        ctx.globalAlpha = 0.8
        const spriteDrawn = this.drawSprite(ctx, camera, this.lastDirectionX === -1)
        ctx.globalAlpha = 1
        
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