/* global Phaser*/


export default class DevinScene extends Phaser.Scene {
    constructor() {
        super({key: 'devinScene'})
    }

    // Initialization code here
    init() {
        this.cameras.main.setBackgroundColor('#ffffff');
    }

    // Preload assets here
    preload() {
        console.log('Preloading assets for DevinScene');
        this.load.image('devinBackground', 'assets/devin.png');
    }

    // Create game objects and set up the scene here
    create() {
        this.devinBackground = this.add.sprite(400/2, 850/2, 'devinBackground').setScale(0.4)
    }

    // Update game logic each frame here
    update(time, delta) {
        if(time > 5000) {
        this.scene.start('titleScene');
        }
    }
}