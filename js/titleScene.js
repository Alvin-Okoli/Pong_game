/* global Phaser*/

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    // Initialization code here
    init() {
        this.cameras.main.setBackgroundColor('#000000');
    }

    // Preload assets here
    preload() {
        console.log('Preloading assets for TitleScene');
        this.load.image('titleBackground', 'assets/title.jpg');
        this.load.image('pongBat', 'assets/pongbat.png');
        this.load.image('pongBall', 'assets/pongball.png');
        this.load.audio('ballhit', 'assets/ballhit.wav');
        this.load.audio('loseLive', 'assets/liveloss.wav');
        this.load.audio('gameover', 'assets/gameover.wav');
        this.load.audio('bgm', 'assets/gamemusic.wav')
    }

    // Create game objects and set up the scene here
    create() {
        this.titleBackground = this.add.sprite(450/2, 850/2, 'titleBackground')
        this.titleBackground.setScale(0.5, 0.8); 
    }

    // Update game logic each frame here
    update(time, delta) {
        if (time > 8000) {
            this.scene.start('menuScene');
        }
    }
}
