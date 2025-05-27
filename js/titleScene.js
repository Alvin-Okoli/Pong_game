/* global Phaser*/

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    // Initialization code here
    init() {
        this.cameras.main.setBackgroundColor('#ffffff');
    }

    // Preload assets here
    preload() {
        console.log('Preloading assets for TitleScene');
        this.load.image('titleBackground', 'assets/title.jpg');
    }

    // Create game objects and set up the scene here
    create() {
        this.titleBackground = this.add.sprite(1920/2, 1080/2, 'titleBackground').setOrigin(0.5, 0.5);
        this.titleBackground.setScale(1.5); 
    }

    // Update game logic each frame here
    update(time, delta) {
        if (time > 8000) {
            this.scene.start('menuScene');
        }
        
    }
}