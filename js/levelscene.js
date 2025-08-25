/* global phaser */

export default class LevelSene extends Phaser.Scene{
    constructor(){
        super({key: 'levelScene'})
        this.menuTextStyle = { fontSize: '28px', fill: '#ffffff', align: 'center' };
        this.returnTextStyle = { fontSize: '18px', fill: '#22f51fff', align: 'center' };
        this.returnText = '◁◀'
    }

    init(data){
        this.cameras.main.setBackgroundColor('#000000');
    }

    preload(){
        console.log('Preloading assets for LevelSene');
    }

    create(){
        //adds background
        this.menuBackground = this.add.sprite(0, 0, 'menuBackground').setOrigin(0);
        this.menuBackground.setScale(1.5, 0.85);

        //return to menu
        this.returnText = this.add.text(20, 20, '◀ this.returnText', this.returnTextStyle).setOrigin(0);
        this.returnText.setInteractive({useHandCursor: true});
        this.returnText.on('pointerover', ()=>{
            this.returnText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        })
        this.returnText.on('pointerout', ()=>{
            this.returnText.setStyle(this.menuTextStyle);
        })
        this.returnText.on('pointerup', ()=>{
            this.scene.stop('levelScene')
            // if (this.menu){
            //     this.scene.start('menuScene')
            // }
            // else{
            //     this.scene.resume('gameScene')
            // }            
        })

        //title text
        this.add.text(30, 100, 'Select Difficulty', { fontSize: '30px', fill: '#ff3131', align: 'center' }).setOrigin(0, 0)

        //level easy
        this.easyText = this.add.text(50, 150, 'Easy', this.menuTextStyle).setOrigin(0, 0);
        this.easyText.setInteractive({useHandCursor: true});
        this.easyText.on('pointerover', () => {
            this.easyText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        });
        this.easyText.on('pointerout', () => {
            this.easyText.setStyle(this.menuTextStyle);
        });
        this.easyText.on('pointerup', () => {
            this.scene.start('levelScene');
        });

        //level Medium
        this.mediumText = this.add.text(50, 200, 'Medium', this.menuTextStyle).setOrigin(0, 0);
        this.mediumText.setInteractive({useHandCursor: true});
        this.mediumText.on('pointerover', ()=>{
            this.mediumText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        })
        this.mediumText.on('pointerout', ()=>{
            this.mediumText.setStyle(this.menuTextStyle);
        })

        //level Hard 
        this.hardText = this.add.text(50, 250, 'Hard', this.menuTextStyle).setOrigin(0, 0);
        this.hardText.setInteractive({useHandCursor: true});
        this.hardText.on('pointerover', ()=>{
            this.hardText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        })
        this.hardText.on('pointerout', ()=>{
            this.hardText.setStyle(this.menuTextStyle);
        })

        //Sound Setting
        this.add.text(30, 350, 'Sound Setting', { fontSize: '30px', fill: '#ff3131', align: 'center' }).setOrigin(0, 0)

        //BGM On/Off
        this.music = this.add.text(50, 400, 'Music', this.menuTextStyle).setOrigin(0, 0);
        this.music.setInteractive({useHandCursor: true});
        this.music.on('pointerover', () => {
            this.easyText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        });
        this.music.on('pointerout', () => {
            this.easyText.setStyle(this.menuTextStyle);
        });
        this.music.on('pointerup', () => {
            this.scene.start('levelScene');
        });

        //BGM Volume
        this.musicVolume = this.add.text(50, 450, 'Music Volume', this.menuTextStyle).setOrigin(0, 0);
        // this.mediumText.setInteractive({useHandCursor: true});
        // this.mediumText.on('pointerover', ()=>{
        //     this.mediumText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        // })
        // this.mediumText.on('pointerout', ()=>{
        //     this.mediumText.setStyle(this.menuTextStyle);
        // })

        //SFX Volume
        this.soundEffect = this.add.text(50, 500, 'Sound Effect', this.menuTextStyle).setOrigin(0, 0);
        // this.hardText.setInteractive({useHandCursor: true});
        // this.hardText.on('pointerover', ()=>{
        //     this.hardText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        // })
        // this.hardText.on('pointerout', ()=>{
        // this.hardText.setStyle(this.menuTextStyle);
        // })

        this.soundVolume = this.add.text(50, 550, 'Sound Effect Volume', this.menuTextStyle).setOrigin(0, 0);
        // this.hardText.setInteractive({useHandCursor: true});
        // this.hardText.on('pointerover', ()=>{
        //     this.hardText.setStyle({ fill: '#ffff00', fontSize: '35px' });
        // })
        // this.hardText.on('pointerout', ()=>{
        // this.hardText.setStyle(this.menuTextStyle);
        // })
    }
}
