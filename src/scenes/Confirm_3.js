import Phaser from '../lib/phaser.js'


export default class Confirm_3 extends Phaser.Scene
{
    constructor()
    {
        super('confirm_3')
    }
    preload ()
    {
        // this.physics.start();
        this.load.image('sea', 'imgs/sea.png');

    }
    create ()
    {
        // Add a background image
        this.add.image(650, 100, 'sea')
            .setScale(1.3);

        this.add.text(
            this.game.config.width / 6,
            this.game.config.height/ 4,
            'Are you sure you would like to exit the game?\nThe game progress will be saved.',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );


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
            this.scene.stop('confirm_3');
            this.scene.setActive(true,"setting")
            this.scene.setVisible(true,"setting")
        });

        exit_button.on('pointerdown', () => {
            this.scene.stop('confirm_3')
            this.scene.stop('setting')
            this.scene.setVisible(false,'game')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            });
    }
    update()
    {

    }
}