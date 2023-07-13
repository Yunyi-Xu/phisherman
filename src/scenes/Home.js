import Eventbus from '../Eventbus.js';
import Phaser from '../lib/phaser.js'

export default class Home extends Phaser.Scene
{
    constructor()
    {
        super('home')
    }
    preload ()
    {
        this.physics.start();
        this.load.image('sea', 'imgs/sea.png');
    }
    create ()
    {
        // Add a background image
        this.add.image(650, 100, 'sea')
            .setScale(1.3);

        // Add a start button
        const start_button = this.add.text(
        this.game.config.width / 2,
        this.game.config.height / 6,
        'Start Game',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        start_button.setOrigin(0.5);
        start_button.setInteractive();

        const continue_button = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 3,
            'Continue Game',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
            continue_button.setOrigin(0.5);
            continue_button.setInteractive();


        const rank_button = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'Rank',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
        rank_button.setOrigin(0.5);
        rank_button.setInteractive();
        
        const exit_button = this.add.text(
            this.game.config.width / 2,
            this.game.config.height*2 / 3,
            'Exit',
            {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
            );
        exit_button.setOrigin(0.5);
        exit_button.setInteractive();

        this.gamelaunched=false;    
        
        start_button.on('pointerdown', () => {
        this.scene.setActive(false,"home")
        this.scene.setVisible(false,"home")
        this.scene.launch('confirm_1',{gameislaunched:this.gamelaunched}); 

        });

        Eventbus.on('checkgameislaunched', (message)=>{
            this.gamelaunched=message
        });

        continue_button.on('pointerdown', () => {
            if(this.gamelaunched){
                this.scene.launch('confirm_2');
                this.scene.setActive(false,"home")
                this.scene.setVisible(false,"home") 
            }else{
                alert("No Game to Continue, Please Start a New Game!");
            }
            
        });

        rank_button.on('pointerdown', () => {
            this.scene.launch('rank');
            this.scene.setActive(false,"home")
            this.scene.setVisible(false,"home") 
            
            
        });
    }
    update()
    {
        
    }

    
}