import Phaser from '../lib/phaser.js'

export default class Setting extends Phaser.Scene
{
    constructor()
    {
        super('setting')
    }
    preload ()
    {
        this.physics.start();
        this.load.image('menu', 'imgs/menu.png');

    }
    create ()
    {
        // Add a background image
        this.add.image(this.game.config.width / 2, this.game.config.height /2, 'menu')
            .setScale(0.5);


        // Add a back button
        const back_button = this.add.text(
        this.game.config.width / 3,
        this.game.config.height *3/ 4,
        'Back',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        back_button.setInteractive();

        // Add a Exit button
        const exit_button = this.add.text(
            this.game.config.width*2 / 3,
            this.game.config.height *3/ 4,
            'Exit',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
            exit_button.setInteractive();
            
        back_button.on('pointerdown', () => {
        this.scene.stop('setting')
        this.scene.setActive(true,"game")
        // this.scene.resume('game')
        });

        exit_button.on('pointerdown', () => {
            this.scene.launch("confirm_3")
            this.scene.setActive(false,"setting")
            this.scene.setVisible(false,"setting")
            // this.scene.launch('home')
            });
    }
    update()
    {

    }
}