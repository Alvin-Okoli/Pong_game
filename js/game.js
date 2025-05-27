/* global Phaser*/

import GameScene from './gameScene.js';
import DevinScene from './devinScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';

export const config = {
    type: Phaser.AUTO,
    width: 1900, 
    height: 850,
    backgroundColor: '#000000', 
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [ DevinScene, TitleScene, MenuScene, GameScene ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Phaser.Game(config);
});
