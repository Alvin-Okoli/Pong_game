/* global Phaser*/

import GameScene from './gameScene.js';
import DevinScene from './devinScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import LevelSene from './levelscene.js';

export const config = {
    type: Phaser.AUTO,
    width: 450, 
    height: 850,
    backgroundColor: '#000000', 
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [  DevinScene, TitleScene, MenuScene, GameScene, LevelSene  ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
}
    const game = new Phaser.Game(config);
// 
