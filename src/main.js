import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';
import Home from './scenes/Home.js';
import Question from './scenes/Question.js';
import Setting from './scenes/Setting.js';
import Interval from './scenes/Interval.js';
import Rank from './scenes/Rank.js';
import Confirm_1 from './scenes/Confirm_1.js';
import Confirm_2 from './scenes/Confirm_2.js';
import Confirm_3 from './scenes/Confirm_3.js';



export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Home,Game,Question,Setting,Interval,Confirm_1,Confirm_2,Rank,Confirm_3]
})
