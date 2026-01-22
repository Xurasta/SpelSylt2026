import GameObject from './GameObject.js'

export default class Platform extends GameObject {
    constructor(game, x, y, width, height, imagePath) {
        super(game, x, y, width, height)
        this.image = new Image()
        this.image.src = imagePath
        this.imageLoaded = false
        // this.sx = 0 //crop (x) from top left
        // this.sy = 0 //crop (y) from top left
        // this.sWidth = 0 // crop width
        // this.sHeight = 0 //crop height

        this.image.onload = () => {
            this.imageLoaded = true
        }
    }

    update(deltaTime) {
        // Plattformar är statiska, gör inget
    }
    

    draw(ctx, camera) {
        
        if (!this.imageLoaded) return

        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
         
        // Repeterande bilder
        const pattern = ctx.createPattern(this.image, 'repeat')
        ctx.rect(screenX, screenY, this.width, this.height)
        ctx.fillStyle = pattern
        ctx.fill()
    }
}