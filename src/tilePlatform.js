export default class Background {
    constructor(game, imagePath, options = {}) {
        this.game = game
        this.image = new Image()
        this.image.src = imagePath
        this.imageLoaded = false
        
        this.image.onload = () => {
            this.imageLoaded = true
            // Om tile inte är satt, använd bildens storlek
            if (!options.tileWidth) {
                this.tileWidth = this.image.width
                this.tileHeight = this.image.height
            }
        }
        
        // Options med defaults
        this.tiled = options.tiled !== undefined ? options.tiled : true
        this.tileWidth = options.tileWidth || game.defaultSpriteSize // Crop på sprite width
        this.tileHeight = options.tileHeight || game.defaultSpriteSize //Crop på sprite width
        this.tileY = options.tileY !== undefined ? options.tileY : true // Tila på Y-axeln
        this.tileX = options.tileX !== undefined ? options.tileX : true // Tila på X-axeln
        this.scrollSpeed = options.scrollSpeed !== undefined ? options.scrollSpeed : 1.0
        this.yPosition = options.yPosition !== undefined ? options.yPosition : 0 // Vertikal position (0 = top)
        this.xPosition = options.xPosition !== undefined ? options.xPosition : 0 // Horisontalt position (0 = top)
        this.height = options.height || null // Höjd att rita (null = full height)
        this.width = options.width || null //
        // För parallax - spara offset
        this.offsetX = 0
        this.offsetY = 0
    }

    update(deltaTime) {
        // Inget att uppdatera just nu, men bra att ha för framtida animationer
    }
    
    draw(ctx, camera) {
        if (!this.imageLoaded) return
        
        // Beräkna parallax offset baserat på kamera och scroll speed
        this.offsetX = camera.x * this.scrollSpeed
        this.offsetY = camera.y * this.scrollSpeed
        
        if (this.tiled) {
            this.drawTiled(ctx, camera)
        } else {
            this.drawStretched(ctx, camera)
        }
    }
    
    drawTiled(ctx, camera) {
        // Beräkna den vertikala positionen och höjden att rita
        const drawHeight = this.height !== null ? this.height : this.game.defaultSpriteSize
        const drawWidth = this.width !== null ? this.width : this.game.defaultSpriteSize
        const drawY = this.yPosition
        const drawX = this.xPosition
        
        // Beräkna vilka tiles som är synliga (baserat på parallax offset)
        let startCol, endCol
        if (this.tileY) {
            startCol = Math.floor((this.offsetY + drawY)/ this.tileHeight)
            endCol = Math.ceil((this.offsetY + drawY + drawHeight) / this.tileHeight)   
        } else {
            // Rita bara en rad, positionerad vid drawX
            startCol = 0
            endCol = 0
        }

        let startRow, endRow
        if (this.tileX) {
            startRow = Math.floor((this.offsetX + drawX) / this.tileWidth)
            endRow = Math.ceil((this.offsetX + drawX + drawWidth) / this.tileWidth)
        } else {
            // Rita bara en rad, positionerad vid drawY
            startRow = 0
            endRow = 0
        }

        // Rita alla synliga tiles
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const x = this.tileX ? Math.floor(col * this.tileWidth - this.offsetX) : drawX
                const y = this.tileY ? Math.floor(row * this.tileHeight - this.offsetY) : drawY
                // Skippa tiles som är utanför vårt vertikala område
    
                console.log(y + this.tileHeight)
                console.log('draw: ' + drawY)
                if (y + this.tileHeight < drawY || y > drawY + drawHeight) continue
                ctx.drawImage(this.image, x, y, this.tileWidth, this.tileHeight)
            }
        }
    }
    
    drawStretched(ctx, camera) {
        // Rita hela bilden stretched över hela världen
        ctx.drawImage(
            this.image,
            -this.offsetX,
            -this.offsetY,
            this.width,
            this.height
        )
    }
}
