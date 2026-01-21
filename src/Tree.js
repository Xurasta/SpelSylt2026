import GameObject from './GameObject.js'

export default class Tree extends GameObject {
    constructor(game, x, y, width, height, image) {
        super(game, x, y, width, height)
        this.image = new Image()
        this.image.src = image
        this.imageLoaded = false

        this.image.onload = () => {
            this.imageLoaded = true
        }
    }

    update(deltaTime) {
        
    }

    draw(ctx, camera = null) {
        if (!this.imageLoaded) return
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        ctx.drawImage(this.image, screenX, screenY, this.width, this.height)
    }
} 
