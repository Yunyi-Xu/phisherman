import Phaser from '../lib/phaser.js'

export default class Rank extends Phaser.Scene
{
    constructor()
    {
        super('rank')
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

        // Add a Back button
        const back_button = this.add.text(
            this.game.config.width / 2,
            this.game.config.height *3/ 4,
            'Back',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
            back_button.setInteractive();
            

        back_button.on('pointerdown', () => {
            this.scene.stop('rank')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            });
    }
    update()
    {

    }
}