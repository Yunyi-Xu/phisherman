import Phaser from '../lib/phaser.js'

export default class Interval extends Phaser.Scene
{
    constructor()
    {
        super('interval')
    }
    init(data) {
        this.game_level = data.level;
        this.score=data.sum_score;
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
            this.game.config.height / 4,
            'You have '+this.score+' points now,\n'+'For next level, you need to get at least ' + (this.game_level+1)*10+' points!',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );


        // Add a back button
        const continue_button = this.add.text(
        this.game.config.width / 3,
        this.game.config.height *3/ 4,
        'Continue',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        continue_button.setInteractive();

        // Add a Exit button
        const exit_button = this.add.text(
            this.game.config.width*2 / 3,
            this.game.config.height *3/ 4,
            'Exit',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
            exit_button.setInteractive();
            
        continue_button.on('pointerdown', () => {
        this.scene.stop('interval')
        // this.scene.setActive(true,"game")
        this.scene.wake('game')
        });

        exit_button.on('pointerdown', () => {
            this.scene.stop('interval')
            this.scene.setVisible(false,'game')
            this.scene.setActive(true,"home")
            this.scene.setVisible(true,"home")
            // this.scene.launch('home')
            });
    }
    update()
    {

    }
}