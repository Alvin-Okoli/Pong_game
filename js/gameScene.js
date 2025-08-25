/* global Phaser */


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })

        // Score setup
        this.score = 0;
        this.scoreText = null;
        this.scoreStyle = { fontSize: '28px', fill: '#ffffff', align: 'center' };

        // Lives setup
        this.live = 3;
        this.liveText = null;

        // Pause menu text setup
        this.pauseStyle = { fontSize: '28px', fill: '#00ff11ff', align: 'center' };
        this.menuStyle = { fontSize: '28px', fill: '#f01717ff', align: 'center' };


        // Lives emoji setup
        this.liveEmoji = '💚';
        this.emojis = [];

        // Ball movement setup
        this.random = Math.ceil(Math.random() * 2) == 1 ? 1 : -1; 
        this.direction = 10 * Math.ceil(Math.random()*50);
        this.Xmovement = this.random * this.direction;
    };

    init() {
        this.cameras.main.setBackgroundColor('#000000');
    };


    preload() {
        console.log('Preloading assets for GameScene');
    };

    
    create() {
        //audio setup
        const bgm = this.sound.add('bgm');
        bgm.play({loop: true, volume: 0.5});


        // Game Over setup start
        this.gameOverText = this.add.text(120, 200, 'Game Over!', { fontSize: '40px', fill: '#ff0000', align: 'center' }).setVisible(false)
        // Game Over setup end

        // Pause menu setup
        this.resumeText = this.add.text(320/2, 250, 'Resume', this.pauseStyle).setVisible(false)
        this.resumeText.setInteractive({useHandCursor: true})
        this.resumeText.on('pointerup', ()=>{
            bgm.play({loop: true, volume: 0.5});
            this.physics.resume();
            this.optionText.setVisible(true);
            this.gameOverText.setVisible(false);
            this.resumeText.setVisible(false);
            this.restartText.setVisible(false);
            this.difficultyText.setVisible(false);
            this.quitText.setVisible(false);
        })

        this.restartText = this.add.text(320/2, 300, 'Restart', this.pauseStyle).setVisible(false)
        this.restartText.setInteractive({useHandCursor: true})
        this.restartText.on('pointerup', ()=>{
            this.gameOverText.setVisible(false)
            this.live = 3
            this.score = 0
            this.scoreText.setText('Score: ' + this.score.toString());
            this.scene.restart();
            this.optionText.setVisible(true);
            console.log('Restarting game');
        })

        this.difficultyText = this.add.text(320/2, 350, 'level', this.pauseStyle).setVisible(false)
        this.difficultyText.setInteractive({useHandCursor:true})
        // this.difficultyText.on('pointerup', ()=>{
        //     this.scene.launch('levelScene')
        // })

        this.quitText = this.add.text(320/2, 400, 'Menu', this.menuStyle).setVisible(false)
        this.quitText.setInteractive({useHandCursor:true})
        this.quitText.on('pointerup', ()=>{
            this.scene.start('menuScene');
            console.log('Returning to menu');
        })
        // Pause menu setup end

        // Option text setup
        this.optionText = this.add.text(350, 10, 'Pause', this.scoreStyle)
        this.optionText.setInteractive({useHandCursor: true})
        this.optionText.on('pointerdown', ()=>{
            bgm.pause();
            this.option()
        })
        // Option text setup end

        // Score text setup
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreStyle);
        // Score text setup end

        // Lives text setup
        this.liveText = this.add.text(10, 50, this.emojiHandler(), this.liveStyle);
        // Lives text setup end

        //Game setup
        //bat setup start
        this.Bat = this.physics.add.sprite(320/2, 850 - 70, 'pongBat').setScale(0.3, 1);
        this.Bat.setOrigin(0, 0.5);
        this.Bat.body.setSize(440, 25);
        this.Bat.setImmovable(true);

        this.Bat.setInteractive({draggable: true})
        this.Bat.on('drag', (pointer, dragX, dragY)=>{
            this.Bat.x = dragX;
            if(this.Bat.x < 0) {
                this.Bat.x = 0;
            }
            if(this.Bat.x > 450 - this.Bat.displayWidth) {
                this.Bat.x = 450 - this.Bat.displayWidth;
            }
        })
        //bat setup end

        //ball setup
        this.pongball = this.physics.add.sprite(450/2, 800/2, 'pongBall').setScale(0.05);
        this.pongball.setBounce(1);
        this.pongball.setVelocity(this.Xmovement, -200);
        this.pongball.setCollideWorldBounds(true);
        this.pongball.body.onWorldBounds = true;
        //ball setup end

        // handle collision between bat and ball
        this.physics.add.collider(this.Bat, this.pongball, function(pongball, Bat) {
            pongball.setVelocityY(-pongball.body.velocity.y);
            this.sound.play('ballhit');
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score.toString());
        }.bind(this));
        // handle collision between bat and ball end

        // handle ball going out of bounds
        this.physics.world.on('worldbounds', (body)=>{
            if (body.gameObject === this.pongball) {
                if(body.y > 780){
                    this.sound.play('loseLive');
                    this.live -= 1;
                    this.emojis.pop();
                    if (this.live <= 0) {
                        this.liveText.setText('💔');
                        this.sound.play('gameover');
                    }else{
                        this.liveText.setText(this.emojis.join(''));
                    }                  
                    
                }
            }
        });
        // handle ball going out of bounds end || this.emojiHandler(this.live)

        // Input handling
        this.leftKey = this.input.keyboard.addKey('LEFT');
        this.rightKey = this.input.keyboard.addKey('RIGHT');
        // Input handling end
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
            if(this.Bat.x > 450 - this.Bat.displayWidth) {
                this.Bat.x = 450 - this.Bat.displayWidth;
            }
        };

        if (this.live === 0) {
            this.gameOverText.setVisible(true);
            this.optionText.setVisible(false);
            this.restartText.setVisible(true);
            this.difficultyText.setVisible(true);
            this.quitText.setVisible(true);
            this.physics.pause();
        };
    }

    emojiHandler() {
        this.emojis = [];
        for (let i = 0; i < this.live; i++) {
            this.emojis.push('💚');
        }
        console.log(this.emojis.join(' '));
        return this.emojis.join('');
    }

    option(){
        this.optionText.setVisible(false);
        this.physics.pause();
        this.resumeText.setVisible(true);
        this.restartText.setVisible(true);
        this.difficultyText.setVisible(true);
        this.quitText.setVisible(true);
    };
}
