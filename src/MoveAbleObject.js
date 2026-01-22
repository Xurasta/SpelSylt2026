import GameObject from './GameObject.js'



export default class MoveAbleObject extends GameObject {
    constructor(game, x, y, width, height, patrolDistance = null) {
        super(game, x, y, width, height)
        this.color = 'red' // Röd
        
        // Fysik
        this.velocityX = 0
        this.velocityY = 0
        this.isGrounded = false 
        
        // Patrol AI
        this.startX = x
        this.patrolDistance = patrolDistance
        this.endX = patrolDistance !== null ? x + patrolDistance : null
        this.speed = 0.1
        this.direction = 1 // 1 = höger, -1 = vänster


          this.loadSprite('idle', NpcSpricte, 1)

    }