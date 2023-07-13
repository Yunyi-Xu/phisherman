import Phaser from '../lib/phaser.js'


export default class Confirm_2 extends Phaser.Scene
{
    constructor()
    {
        super('confirm_2')
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
            'Would you like to continue previous game progress?',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );


        // Add a back button
        const continue_button = this.add.text(
        this.game.config.width / 3,
        this.game.config.height *3/ 4,
        'Yes',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        continue_button.setInteractive();

        // Add a Exit button
        const back_button = this.add.text(
            this.game.config.width*2 / 3,
            this.game.config.height *3/ 4,
            'Back',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
        back_button.setInteractive();
           

        continue_button.on('pointerdown', () => {
            this.scene.stop('confirm_2');
            this.scene.setActive(true,"game")
            this.scene.setVisible(true,"game")
        });

        back_button.on('pointerdown', () => {
            this.scene.stop('confirm_2')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            });
    }
    update()
    {

    }
}