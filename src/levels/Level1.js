import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import BackgroundObject from '../BackgroundObject.js'
import Background from '../Background.js'
import tree from '../assets/bakgrund/1 träd andra sidan bäcken.png'
import clouds from '../assets/bakgrund/Moln skog.png'
import trees from '../assets/bakgrund/Träd.png'

import bush from '../assets/sprites/bush.png'
import grass from '../assets/sprites/Grass.png'
import thorns from '../assets/sprites/Thorns.png'
import woodPlatform from '../assets/sprites/wood platform.png'
import arrowLeft from '../assets/sprites/Arrow Left.png'
import arrowRight from '../assets/sprites/Arrow Right.png'
import arrowUp from '../assets/sprites/Arrow Up.png'
import boulder from '../assets/sprites/Boulder.png'
import mountain from '../assets/bakgrund/Gläs.png'

import bakgrundlvl from '../assets/bakgrund/Skog-himmel.png'
import bush from '../assets/sprites/lvl1/Bush.png'
import backGrass from '../assets/sprites/lvl1/BG Grass.png'
import flowers from '../assets/sprites/lvl1/Flowers.png'
import dashSign from '../assets/sprites/lvl1/Sign (dashing).png'
import growSign from '../assets/sprites/lvl1/Sign (Growing).png'
import jumpingSign from '../assets/sprites/lvl1/Sign (jumping).png'
import thornSign from '../assets/sprites/lvl1/Sign (Thorns).png'
import Camera from '../Camera.js'

// Second test
/**
 * Level 1 - Den första nivån i spelet
 * Enklare layout för att introducera spelmekaniker
 */
export default class Level1 extends Level {
    constructor(game) {
        super(game)
        
        // Player spawn position för denna level
        this.playerSpawnX = 50
        this.playerSpawnY = 50
        
        // Initiera level
        this.init()
    }

    createBackgrounds() {
        this.backgrounds = [
            // Far background - blå himmel
            new Background(this.game, bakgrundlvl, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: true, // Tila bara horisontellt
                tileHeight: this.game.worldHeight, // Fyll hela höjden
                tileWidth: this.game.worldWidth // Fyll hela bredden
            }),
            new Background(this.game, mountain, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 500, // Fyll hela höjden
                width: 2000,
                yPosition: -300,
                xPosition: 200
            }),
            new Background(this.game, clouds, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.6, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 200, // Fyll hela höjden
                width: 3000,
                yPosition: -200 ,
                xPosition: 0
            }),
            new Background(this.game, trees, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.35, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 500,
                yPosition: -400,
                xPosition: 0
            }),
            new Background(this.gam, trees, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.35, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 500,
                yPosition: -420,
                xPosition: -500
            }),
            new Background(this.game, trees, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 500,
                yPosition: -490,
                xPosition: -100
            }),
            new Background(this.game, tree, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 95,
                yPosition: -490,
                xPosition: -650
            }),
            new Background(this.game, tree, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 95,
                yPosition: -490,
                xPosition: -860
            }),
            new Background(this.game, tree, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 95,
                yPosition: -490,
                xPosition: -750
            }),
            new Background(this.game, tree, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 95,
                yPosition: -490,
                xPosition: -1000
            }),
            new Background(this.game, tree, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3, // Långsam parallax (långt bort)
                tiledY: false, // Tila bara horisontellt
                height: 100, // Fyll hela höjden
                width: 95,
                yPosition: -400 ,
                xPosition: -950
            }),



            // Mid background - stora moln
           
        ]
    }

    createBackgroundObjects() {
        const height = this.game.height
        const worldHeight = this.game.worldHeight
        const worldWidth = this.game.worldWidth

        const woodenPlatformRail = {
            image: woodPlatform,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0,
            clippedWidthY: 12,
            tile: 'both',
            backdrop: 'false'
        }
        
        const woodenPlatformSupport = {
            image: woodPlatform,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 13,
            clippedWidthY: 35,
            tile: 'both',
            backdrop: 'false'
        }
        
        const woodenPlatformRailRepeat = {
            image: woodPlatform,
            sourceWidth: 40,
            sourceHeight: 48,
            startClipX: 4,
            clippedWidthX: 40,
            startClipY: 0,
            clippedWidthY: 12,
            tile: 'both',
            backdrop: 'false'
        }

        const thornRepeat = {
            image: thorns,
            sourceWidth: 96,
            sourceHeight: 96,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0,
            clippedWidthY: 16,
            tile: 'both',
            backdrop: 'false'
        }

        const arrowR = {
            image: arrowRight,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }

        const arrowU = {
            image: arrowUp,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }

        const boulderSet = {
            image: boulder,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }

        const flowersSet = {
            image: flowers,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }

        const dashSignSet = {
            image: dashSign,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }

        const jumpingSignSet = {
            image: jumpingSign,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 0, 
            clippedWidthY: 48,
            tile: 'both',
            backdrop: 'false'
        }
        
        this.backgroundObjects = [


            new Platform(this.game, 3100, worldHeight - 100, 48, 300, { sprite: woodenPlatformSupport }),
            new Platform(this.game, 3100, worldHeight - 290, 48, 12, { sprite: woodenPlatformRail }),

            new Platform(this.game, 3100, worldHeight - 283, 350, 300, { sprite: woodenPlatformSupport }),
            new Platform(this.game, 3104, worldHeight - 290, 350, 12, { sprite: woodenPlatformRailRepeat }),

            new Platform(this.game, 1200, worldHeight - 64, 480, 32, { sprite: thornRepeat}),

            new Platform(this.game, 1280, worldHeight - 235, 48, 48, { sprite: arrowR }),

            new Platform(this.game, 2300, worldHeight - 80, 48, 48, { sprite: arrowU }),

            new Platform(this.game, 3020, worldHeight - 80, 48, 48, { sprite: arrowU }),

            new Platform(this.game, 3360, worldHeight - 330, 48, 48, { sprite: arrowR }),

            // Boulders
            new Platform(this.game, 1860, worldHeight - 60, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 1800, worldHeight - 280, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 1790, worldHeight - 285, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 200, worldHeight - 50, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 700, worldHeight - 60, 48, 48, { sprite: boulderSet}),

            // Boulders
            new Platform(this.game, 2900, worldHeight - 60, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 2700, worldHeight - 50, 48, 48, { sprite: boulderSet}),
            new Platform(this.game, 3065, worldHeight - 70, 48, 48, { sprite: boulderSet}),

            // Flowers
            new Platform(this.game, 0, worldHeight - 80, 48, 48, { sprite: flowersSet }),
            new Platform(this.game, 30, worldHeight - 80, 48, 48, { sprite: flowersSet }),
            new Platform(this.game, 80, worldHeight - 80, 48, 48, { sprite: flowersSet }),
            new Platform(this.game, 120, worldHeight - 80, 48, 48, { sprite: flowersSet }),

            // Signs
            new Platform(this.game, 800, worldHeight - 80, 48, 48, { sprite:  dashSignSet }),
            new Platform(this.game, 1800, worldHeight - 300, 48, 48, { sprite:  jumpingSignSet }),
        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth
        const worldHeight = this.game.worldHeight

        const ground = {
            image: grass,
            sourceWidth: 32,
            sourceHeight: 32,
            startClipX: 12,
            clippedWidthX: 16,
            startClipY: 0,
            clippedWidthY: 32,
            tile: 'both'
        }

        const dirt = {
            image: grass,
            sourceWidth: 32,
            sourceHeight: 32,
            startClipX: 12,
            clippedWidthX: 16,
            startClipY: 10,
            clippedWidthY: 20,
            tile: 'both'
        }

        const dirtTop = {
            image: grass,
            sourceWidth: 32,
            sourceHeight: 32,
            startClipX: 12,
            clippedWidthX: 16,
            startClipY: 0,
            clippedWidthY: 28,
            tile: 'both'
        }

        const woodenPlatformStand = {
            image: woodPlatform,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 0,
            clippedWidthX: 48,
            startClipY: 7,
            clippedWidthY: 5,
            tile: 'both',
            backdrop: 'false'
        }

        const woodenPlatformStandRepeat = {
            image: woodPlatform,
            sourceWidth: 48,
            sourceHeight: 48,
            startClipX: 1,
            clippedWidthX: 46,
            startClipY: 7,
            clippedWidthY: 5,
            tile: 'both',
            backdrop: 'false'
        }

        this.platforms = [
            // Marken (hela nivån)
            new Platform (this.game, 0,  worldHeight - 32, worldWidth, 32, { sprite: ground }),

            // Berg
            new Platform (this.game, 1071,  worldHeight - 100, 128, 180, { sprite: dirt }),
            new Platform (this.game, 1071, worldHeight - 100, 128, 32, { sprite: dirtTop }),
            
            new Platform (this.game,  1200, worldHeight - 190, 128, 300, { sprite: dirt }),
            new Platform (this.game,  1200, worldHeight - 190, 128, 32, { sprite: dirtTop }),
    
            new Platform(this.game, 1680, worldHeight - 260, 128, 300, { sprite: dirt }),
            new Platform(this.game, 1680, worldHeight - 260, 128, 32, { sprite: dirtTop }),

            new Platform(this.game, 2380, worldHeight - 200, 192, 300, { sprite: dirt }),
            new Platform(this.game, 2380, worldHeight - 200, 192, 32, { sprite: dirtTop }),

            new Platform(this.game, 1680, worldHeight - 260, 192, 300, { sprite: dirt }),
            new Platform(this.game, 1680, worldHeight - 260, 192, 32, { sprite: dirtTop }),

            new Platform(this.game, 3101, worldHeight - 283, 350, 5, { sprite: woodenPlatformStandRepeat }),

            new Platform(this.game, 3080, worldHeight - 120, 400, 300, { sprite: dirt }),
            new Platform(this.game, 3080, worldHeight - 120, 400, 32, { sprite: dirtTop }),

            new Platform(this.game, 2800, worldHeight - 120, 120, 300, { sprite: dirt }),
            new Platform(this.game, 2800, worldHeight - 120, 120, 32, { sprite: dirtTop })
        ]
    }

    createEnemies() {
        const height = this.game.height
        const worldHeight = this.game.worldHeight

        this.enemies = [
            new Enemy(this.game, 200, worldHeight - 220, 40, 40, 80),
            new Enemy(this.game, 450, worldHeight - 240, 40, 40),
            new Enemy(this.game, 360, worldHeight - 440, 40, 40, 50),
            // Nya fiender längre bort
            new Enemy(this.game, 1800, worldHeight - 240, 40, 40, 150),
        ]
    }
}
