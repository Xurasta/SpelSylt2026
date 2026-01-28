import GameObject from './GameObject.js'
import Sprite from './Sprite.js'
import dingSound from './assets/sounds/ding-402325.mp3'

export default class SlimeBlob extends GameObject {
    constructor(game, x, y, width, height, options = {}) {
        super(game, x, y)
        this.width = width
        this.height = height
        this.color = 'brown'
        this.touchSurface = false
         // Poäng för detta mynt
        
        // Bob animation
        this.velocitY = 0
        
        if (options.sprite) {
            this.sprite = new Sprite(options.sprite)
        }
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
                this.y = platform.y - this.height
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
        
        if (this.sprite && this.sprite.draw(ctx, screenX, screenY, this.width, this.height)) {
            // Sprite drawn successfully
            // ctx.strokeRect(screenX, screenY, this.width, this.height)
            return
        }

        ctx.strokeRect(this.screenX, this.screenY, this.width, this.height)
    }
}
