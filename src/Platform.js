import GameObject from './GameObject.js'

export default class Platform extends GameObject {
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
        // Plattformar är statiska, gör inget
    }

    draw(ctx, camera = null) {
        if (!this.imageLoaded) return
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        
        // Rita plattformen
        ctx.drawImage(this.image, screenX, screenY, this.width, this.height)

        //ctx.fillStyle = this.color
        //ctx.fillRect(screenX, screenY, this.width, this.height)
        
        // Rita en enkel kant/skugga för att ge djup
        // ctx.strokeStyle = '#654321'
        // ctx.lineWidth = 2
        // ctx.strokeRect(screenX, screenY, this.width, this.height)
    }
}
