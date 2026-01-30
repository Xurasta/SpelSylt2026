import Menu from './Menu.js'
import MainMenu from './MainMenu.js'
import ES23 from '../assets/UI/The Droopy Drawers.png'
import TE23 from '../assets/UI/Fix the Code.png'
import escape from '../assets/UI/Escape - Menu.png'

export default class ControlsMenu extends Menu {
    getTitle() {
        return 'Controls'
    }
    
    getOptions() {
        return [
            {
                text: 'The droopy drawers',
                key: null,
                action: null,
                image: ES23
            },
            {
                text: 'Fix the code',
                key: null,
                action: null,
                image: TE23
            },
            {
                text: 'Back to Menu',
                key: 'Escape',
                image: escape,
                action: () => {
                    this.game.gameState = 'MENU'
                    this.game.currentMenu = new MainMenu(this.game)
                }
            }
        ]
    }
}
