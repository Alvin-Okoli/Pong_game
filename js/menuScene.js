/* global Phaser*/

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'menuScene'})
        this.startText = null;
        this.menuTextStyle = { fontSize: '50px', fill: '#ffffff', align: 'center' };
        this.exitTextStyle = { fontSize: '50px', fill: '#ff3131', align: 'center' };
        this.moveBat = false;
        this.moveTimer = 0;
    }

    // Initialization code here
    init() {
        this.cameras.main.setBackgroundColor('#000000');
    }

    // Preload assets here
    preload() {
        console.log('Preloading assets for MenuScene');
        this.load.image('menuBackground', 'assets/gameStart.png');
        this.load.image('pongBat', 'assets/pongBatMenuDisply.png');
    }

    // Create game objects and set up the scene here
    create() {
        //adds background
        this.menuBackground = this.add.sprite(1900/2, 850/2, 'menuBackground').setOrigin(0.5, 0.5);
        this.menuBackground.setScale(1.5, 0.85);

        //pong bat animation
        this.pongBat1 = this.physics.add.sprite(450, 200, 'pongBat').setScale(0.75, 0.25)
        this.pongBat2 = this.physics.add.sprite(800, 200, 'pongBat').setScale(0.75, 0.25)


        //starts the game
        this.startText = this.add.text(450, 300, 'Start Game', this.menuTextStyle).setOrigin(0, 0);
        this.startText.setInteractive({useHandCursor: true});
        this.startText.on('pointerover', () => {
            this.startText.setStyle({ fill: '#ffff00', fontSize: '65px' });
        });
        this.startText.on('pointerout', () => {
            this.startText.setStyle({ fontSize: '50px', fill: '#ffffff' });
        });
        this.startText.on('pointerup', () => {
            this.scene.start('gameScene');
        });

        //level select setup
        this.levelText = this.add.text(450, 400, 'Select Level', this.menuTextStyle).setOrigin(0, 0);
        this.levelText.setInteractive({useHandCursor: true});
        this.levelText.on('pointerover', () => {
            this.levelText.setStyle({ fill: '#ffff00', fontSize: '65px' });
        });
        this.levelText.on('pointerout', () => {
            this.levelText.setStyle({ fontSize: '50px', fill: '#ffffff' });
        });

        //high score setup
        this.highScoreText = this.add.text(450, 500, 'High Scores', this.menuTextStyle).setOrigin(0, 0);
        this.highScoreText.setInteractive({useHandCursor: true});
        this.highScoreText.on('pointerover', () => {
            this.highScoreText.setStyle({ fill: '#ffff00', fontSize: '65px' });
        });
        this.highScoreText.on('pointerout', () => {
            this.highScoreText.setStyle({ fontSize: '50px', fill: '#ffffff' });
        });
        
        //exit game setup
        this.exitText = this.add.text(450, 600, 'Exit Game', this.exitTextStyle).setOrigin(0, 0);
        this.exitText.setInteractive({useHandCursor: true});
        this.exitText.on('pointerover', ()=>{
            this.exitText.setStyle({ fontSize: '65px' });
        })
        this.exitText.on('pointerout', ()=>{
            this.exitText.setStyle({ fontSize: '50px' });
        })
    }
    update(time, delta) {
        this.moveTimer += delta;
        if(this.moveTimer >= 1000){
            if(!this.moveBat){
            this.pongBat1.y += 1;
            if(this.pongBat1.y > 220){
                this.pongBat1.y = 220;
                this.moveBat = true;
            }
        }
        else{
                this.pongBat1.y -= 1;
                if(this.pongBat1.y <= 180){
                    this.pongBat1.y = 180;
                    this.moveBat = false;
                }
            }}
    }
}

