/* global Phaser*/

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'menuScene'})
        this.startText = null;
        this.menuTextStyle = { fontSize: '30px', fill: '#ffffff', align: 'center' };
        this.exitTextStyle = { fontSize: '30px', fill: '#ff3131', align: 'center' };
    }

    // // Initialization code here
    // init() {
    //     this.cameras.main.setBackgroundColor('#000000');
    // }

    // Preload assets here
    preload() {
        console.log('Preloading assets for MenuScene');
        this.load.image('menuBackground', 'assets/gameStart.png');
    }

    // Create game objects and set up the scene here
    create() {
        //adds background
        this.menuBackground = this.add.sprite(450/2, 850/2, 'menuBackground').setOrigin(0.6, 0.5);
        this.menuBackground.setScale(0.6, 0.9);

        //starts the game
        this.startText = this.add.text(40, 400, 'Start Game', this.menuTextStyle).setOrigin(0, 0);
        this.startText.setInteractive({useHandCursor: true});
        this.startText.on('pointerover', () => {
            this.startText.setStyle({ fill: '#28de18ff', fontSize: '35px' });
        });
        this.startText.on('pointerout', () => {
            this.startText.setStyle(this.menuTextStyle);
        });
        this.startText.on('pointerup', () => {
            this.scene.start('gameScene');
        });

        //level select setup
        this.levelText = this.add.text(40, 450, 'Difficulty', this.menuTextStyle).setOrigin(0, 0);
        this.levelText.setInteractive({useHandCursor: true});
        this.levelText.on('pointerover', () => {
            this.levelText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        });
        this.levelText.on('pointerout', () => {
            this.levelText.setStyle(this.menuTextStyle);
        });
        // this.levelText.on('pointerup', () => {
        //     this.scene.start('levelScene');
        // });

        //high score setup
        this.highScoreText = this.add.text(38, 500, 'Top Score', this.menuTextStyle).setOrigin(0, 0);
        this.highScoreText.setInteractive({useHandCursor: true});
        this.highScoreText.on('pointerover', () => {
            this.highScoreText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        });
        this.highScoreText.on('pointerout', () => {
            this.highScoreText.setStyle(this.menuTextStyle);
        });
        
        //exit game setup
        this.exitText = this.add.text(40, 550, 'Exit Game', this.exitTextStyle).setOrigin(0, 0);
        this.exitText.setInteractive({useHandCursor: true});
        this.exitText.on('pointerover', ()=>{
            this.exitText.setStyle({ fontSize: '35px' });
        })
        this.exitText.on('pointerout', ()=>{
            this.exitText.setStyle(this.exitTextStyle);
        })
    }
    update(time, delta) {
    }
}

