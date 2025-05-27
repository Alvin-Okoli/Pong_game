/* global Phaser */

// Learn math so you can set random velocities and positions.
// Put if statements to check if lives are 0 and end the game.
// Add a menu button, including into it a restart option, resume, control and about.
// Learn how to add game pad and touch screen input.

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })

        this.score = 0;
        this.scoreText = null;
        this.scoreStyle = { fontSize: '32px', fill: '#ffffff', align: 'center' };

        this.live = 3;
        this.liveText = null;
        this.liveStyle = { fontSize: '32px', fill: '#ff0000', align: 'center' };
    };

    init() {
        this.cameras.main.setBackgroundColor('#000000');
    };


    preload() {
        console.log('Preloading assets for GameScene');
        this.load.image('pongBat', 'assets/pongbat.png');
        this.load.image('pongBall', 'assets/pongball.png');
    };

    
    create() {
        this.random = Math.ceil(Math.random() * 2) == 1 ? 1 : -1; 
        this.direction = 10 * Math.ceil(Math.random()*50);
        this.Xmovement = this.random * this.direction;

        // Game Over setup
        this.gameOverText = this.add.text(1750/2, 200, 'Game Over!', { fontSize: '50px', fill: '#ff0000', align: 'center' }).setVisible(false)

        this.resumeText = this.add.text(1900/2, 250, 'Resume', this.scoreStyle).setVisible(false)
        this.resumeText.setInteractive({useHandCursor: true})

        this.restartText = this.add.text(1900/2, 350, 'Restart', this.scoreStyle).setVisible(false)
        this.restartText.setInteractive({useHandCursor: true})

        this.difficultyText = this.add.text(1900/2, 450, 'level', this.scoreStyle).setVisible(false)
        this.difficultyText.setInteractive({useHandCursor:true})

        this.quitText = this.add.text(1900/2, 550, 'Menu', this.scoreStyle).setVisible(false)
        this.quitText.setInteractive({useHandCursor:true})

        // Option text setup
        this.optionText = this.add.text(1700, 10, 'Pause', this.scoreStyle)
        this.optionText.setInteractive({useHandCursor: true})
        this.optionText.on('pointerdown', ()=>{
            this.option()
        })

        // Score text setup
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreStyle);

        // Lives text setup
        this.liveText = this.add.text(10, 50, 'Lives: ' + this.live.toString(), this.liveStyle);

        //Game setup
        //bat setup
        this.Bat = this.physics.add.sprite(1900/2, 850 - 70, 'pongBat').setScale(0.5, 1);
        this.Bat.setOrigin(0.5, 0.5);
        this.Bat.body.setSize(440, 25);
        this.Bat.setImmovable(true);

        //ball setup
        this.pongball = this.physics.add.sprite(1900/2, 850/2, 'pongBall').setScale(0.1, 0.1);
        this.pongball.setBounce(1);
        this.pongball.setVelocity(this.Xmovement, -200);
        this.pongball.setCollideWorldBounds(true);
        this.pongball.body.onWorldBounds = true;

        // handle collision between bat and ball
        this.physics.add.collider(this.Bat, this.pongball, function(pongball, Bat) {
            pongball.setVelocityY(-pongball.body.velocity.y);
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score.toString());
        }.bind(this));

        // handle ball going out of bounds
        this.physics.world.on('worldbounds', (body)=>{
            if (body.gameObject === this.pongball) {
                if(body.y > 780){
                    console.log('Ball out of bounds! Resetting position.' + this.pongball.y);
                    this.live -= 1;
                    this.liveText.setText('Lives: ' + this.live.toString());
                }
            }
        });

        // Input handling
        this.leftKey = this.input.keyboard.addKey('LEFT');
        this.rightKey = this.input.keyboard.addKey('RIGHT');
    };

    
    update() {

        if(this.leftKey.isDown) {
            this.Bat.x -= 15;
            if(this.Bat.x < 0) {
                this.Bat.x = 0;
            }
        };

        if(this.rightKey.isDown){
            this.Bat.x += 15;
            if(this.Bat.x > 1900) {
                this.Bat.x = 1900;
            }
        };

        if (this.live == 0) {
            this.gameOverText.setVisible(true);
            this.physics.pause();
        };
    }

    option(){
        this.optionText.setVisible(false);
        this.physics.pause();
        if(this.live > 0) {
            this.resumeText.setVisible(true);
        }
        this.resumeText.on('pointerdown', ()=>{
            this.physics.resume();
            this.optionText.setVisible(true);
            this.gameOverText.setVisible(false);
            this.resumeText.setVisible(false);
            this.restartText.setVisible(false);
            this.difficultyText.setVisible(false);
            this.quitText.setVisible(false);
        })

        this.restartText.setVisible(true);
        this.restartText.on('pointerdown', ()=>{
            this.scene.restart();
            this.optionText.setVisible(true);
            console.log('Restarting game');
        })

        this.difficultyText.setVisible(true);

        this.quitText.setVisible(true);
        this.quitText.on('pointerdown', ()=>{
            this.scene.start('menuScene');
            console.log('Returning to menu');
        })
    };
}
