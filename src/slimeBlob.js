import GameObject from './GameObject.js'
import dingSound from './assets/sounds/ding-402325.mp3'

export default class SlimeBlob extends GameObject {
    constructor(game, x, y, size = 20) {
        super(game, x, y, size, size)
        this.size = size
        this.color = 'brown'
        this.touchSurface = false
         // Poäng för detta mynt
        
        // Bob animation
        this.velocitY = 0
        
        // Sound
        // this.sound = new Audio(dingSound)
        // this.sound.volume = 0.3
    }

    update(deltaTime) {
        // Gravity
        if (this.touchSurface == false) {
            this.velocitY -= this.game.gravity * deltaTime
            this.y -= this.velocitY * deltaTime
        }
    }

    handlePlatformCollision(platform) {
        const collision = this.getCollisionData(platform)
        if (collision) {
            if (collision.direction === 'top') {
                this.y = platform.y - this.height/2
                this.touchSurface = true
                this.velocityY = 0
            } else if (collision.direction === 'left') {
                this.x = platform.x - this.width
            } else if (collision.direction === 'right') {
                this.x = platform.x + platform.width
            }
        }
    }
    
    collect() {
        console.log('Collected blob')
        this.markedForDeletion = true
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        // Rita myntet som en cirkel
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(screenX, screenY, 15, 10)
        ctx.fill()
    }
}
