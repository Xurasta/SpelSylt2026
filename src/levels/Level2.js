import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'
import pinkBg from '../assets/Pixel Adventure 1/Background/Pink.png'

import grass from '../assets/sprites/Grass.png'
import roadpiece from '../assets/sprites/lvl2/Road.png'
import concrete from '../assets/sprites/lvl2/Concrete.png'
import car from '../assets/sprites/lvl2/Car.png'

/**
 * Level 2 - Andra nivån med svårare utmaningar
 * Fler fiender, högre plattformar, mer precision krävs
 * Rosa himmel för att signalera svårare level (skymning/kväll)
 */

export default class Level2 extends Level {
    constructor(game) {
        super(game)
        
        // Player spawn position för denna level
        this.playerSpawnX = 50
        this.playerSpawnY = 700
        
        // Initiera level
        this.init()
    }

    createBackgrounds() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth
        const worldHeight = this.game.worldHeight

        const rails = {
            image: roadpiece,
            sourceWidth: 48,
            sourceHeight: 11,
            startClipX: 4,
            clippedWidthX: 40,
            startClipY: 6,
            clippedWidthY: 6,
            tile: 'both',
            backdrop: 'false'
        }

        this.backgrounds = [
            // Far background - rosa himmel (skymning känsla, svårare level)
            new Background(this.game, pinkBg, {
                tiled: true,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3
            }),

            new Platform(this.game, 0,  worldHeight - 58, worldWidth - 2940, 14, { sprite: rails })

        ]
    }

    createBackgroundObjects() {
        const height = this.game.height

        this.backgroundObjects = [

        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth
        const worldHeight = this.game.worldHeight

        const roadBottom = {
            image: roadpiece,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 2,
            clippedWidthX: 30,
            startClipY: 11,
            clippedWidthY: 37,
            tile: 'both',
            backdrop: 'false'
        }

        const ground = {
            image: concrete,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 1,
            clippedWidthX: 46,
            startClipY: 0,
            clippedWidthY: 47,
            tile: 'both',
        }

        const carSet = {
            image: car,
            sourceWidth: 96,
            sourceHeight: 96,
            startClipX: 2,
            clippedWidthX: 44,
            startClipY: 29,
            clippedWidthY: 19,
            tile: 'both',
            backdrop: 'false'
        }

        this.platforms = [
            // Marken (hela nivån)
            
            new Platform (this.game, 200,  worldHeight - 90, 96, 40, { sprite: carSet }),
            new Platform (this.game, 0,  worldHeight - 50, worldWidth - 2940, 48, { sprite: roadBottom }),
            new Platform (this.game, worldWidth - 2940,  worldHeight - 50, worldWidth, 48, { sprite: ground }),
        ]
    }

    createEnemies() {
        const height = this.game.height

        this.enemies = [
            // Fler och snabbare fiender
            new Enemy(this.game, 300, height - 220, 40, 40, 100),
            new Enemy(this.game, 600, height - 240, 40, 40, 120),
            new Enemy(this.game, 850, height - 360, 40, 40, 80),
            new Enemy(this.game, 1100, height - 280, 40, 40, 150),
            new Enemy(this.game, 1350, height - 400, 40, 40, 90),
            new Enemy(this.game, 1600, height - 320, 40, 40, 120),
            new Enemy(this.game, 1850, height - 240, 40, 40, 100),
            new Enemy(this.game, 2100, height - 360, 40, 40, 130),
        ]
    }
}
