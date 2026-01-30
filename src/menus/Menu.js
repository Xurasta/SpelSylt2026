import nameOfGame from '../assets/UI/Name of the game (title screen).png' 
import TitleScreen from '../assets/UI/Title_Screen.jpg'

export default class Menu {
    constructor(game) {
        this.game = game
        this.visible = true
        
        // Subclasses must provide these
        this.title = this.getTitle()
        this.options = this.getOptions()
        
        // Hitta första valbara option (skippa null actions)
        this.selectedIndex = 0
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].action !== null) {
                this.selectedIndex = i
                break
            }
        }
        
        // Visual styling
        this.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        this.titleColor = '#FFFFFF'
        this.optionColor = '#CCCCCC'
        this.selectedColor = '#FFD700'
        this.keyColor = '#4CAF50'
        
        // Track which keys have been pressed (för att undvika upprepade tryckningar)
        this.lastKeys = new Set()
    }
    
    // Abstract methods - subclasses must override
    getTitle() {
        throw new Error('Menu subclass must implement getTitle()')
    }
    
    getOptions() {
        throw new Error('Menu subclass must implement getOptions()')
    }
    
    update(deltaTime) {
        const keys = this.game.inputHandler.keys
        
        // Kolla Enter för vald option
        if (keys.has('Enter') && !this.lastKeys.has('Enter')) {
            const selectedOption = this.options[this.selectedIndex]
            if (selectedOption && selectedOption.action) {
                selectedOption.action()
            }
        }
        
        // Kolla om någon key-shortcut har tryckts
        this.options.forEach(option => {
            if (option.key && option.action && keys.has(option.key) && !this.lastKeys.has(option.key)) {
                option.action()
            }
        })
        
        // Pil upp/ner för att navigera
        if (keys.has('ArrowDown') && !this.lastKeys.has('ArrowDown')) {
            // Hitta nästa valbara option (skippa null actions)
            let newIndex = this.selectedIndex
            do {
                newIndex = (newIndex + 1) % this.options.length
            } while (this.options[newIndex].action === null && newIndex !== this.selectedIndex)
            this.selectedIndex = newIndex
        }
        if (keys.has('ArrowUp') && !this.lastKeys.has('ArrowUp')) {
            // Hitta föregående valbara option (skippa null actions)
            let newIndex = this.selectedIndex
            do {
                newIndex = (newIndex - 1 + this.options.length) % this.options.length
            } while (this.options[newIndex].action === null && newIndex !== this.selectedIndex)
            this.selectedIndex = newIndex
        }
        
        // Uppdatera lastKeys
        this.lastKeys = new Set(keys)
    }
    
    draw(ctx) {
        if (!this.visible) return
        
        ctx.save()
        
        // Rita halvgenomskinlig bakgrund
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(0, 0, this.game.width, this.game.height)

        const titleImage = new Image()
        titleImage.src = TitleScreen
        // Rita title
        ctx.drawImage(titleImage, 0, 0, this.game.width, this.game.height)
        // Rita options
        const startY = 280
        const lineHeight = 50
        
        this.options.forEach((option, index) => {
            const y = startY + index * lineHeight
            const isSelected = index === this.selectedIndex
            
            
            if (option.image)  {
                const menuImage = new Image()
                menuImage.src = option.image
                ctx.drawImage(menuImage, 30, y - 50, 200, 30)
                const prefix = isSelected ? '< ' : '  '

                ctx.fillStyle = 'black'
                ctx.font = 'bold 24px Arial'
                ctx.fillText(prefix, this.game.width / 3.5, y - 30)

                if (option.key) {
                    ctx.fillStyle = 'black'
                    ctx.font = 'bold 24px Arial'
                    ctx.fillText(`[${option.key}]`, this.game.width / 1.15, y - 30)
                }
            } else {
                
                // Rita option text
                ctx.font = '32px Arial'
                ctx.fillStyle = isSelected ? this.selectedColor : this.optionColor

                // Lägg till ">" för vald option
                const prefix = isSelected ? '> ' : '  '
                let displayText = prefix + option.text

                // Lägg till key hint om det finns
                if (option.key) {
                    ctx.fillText(displayText, this.game.width / 6 - 50, y - 30)
                    
                    // Rita key hint i grön
                    ctx.fillStyle = 'black'
                    ctx.font = 'bold 24px Arial'
                    ctx.fillText(`[${option.key}]`, this.game.width / 2 + 150, y)
                } else {
                    ctx.fillText(displayText, this.game.width / 2, y)
                }
            }
        })
        
        ctx.restore()
    }
}
