import Menu from './Menu.js'
import MainMenu from './MainMenu.js'

import arrowKeys from '../assets/UI/Arrow Keys - Move.png'
import shiftDash from '../assets/UI/Shift - Dash.png'
import spaceJump from '../assets/UI/Space - Jump.png'
import escape from '../assets/UI/Escape - Menu.png'
import backToMenu from '../assets/UI/Back to Menu - Escape.png'

export default class ControlsMenu extends Menu {
    getTitle() {
        return 'Controls'
    }
    
    getOptions() {
        return [
            {
                text: 'Arrow Keys - Move',
                key: null,
                action: null,
                image: arrowKeys,
                menu: 'control'
            },
            {
                text: 'Space - Jump',
                key: null,
                action: null,
                image: shiftDash,
                menu: 'control'
            },
            {
                text: 'Shift - Dash',
                key: null,
                action: null,
                image: spaceJump,
                menu: 'control'
            },
            {
                text: 'Escape - Menu',
                key: null,
                action: null,
                image: escape,
                menu: 'control'
            },
            {
                text: 'Back to Menu',
                key: 'Escape',
                menu: 'control',
                image: backToMenu,
                action: () => {
                    this.game.gameState = 'MENU'
                    this.game.currentMenu = new MainMenu(this.game)
                }
            }
        ]
    }
}
