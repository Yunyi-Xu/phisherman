import Phaser from '../lib/phaser.js'
import Eventbus from '../Eventbus.js';

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    init(data) {
        this.game_level = data.level;
        this.sum_score = data.sum_score;
    }

    preload ()
    {
        this.physics.start();
    // This function will load all the assets like images, audio files, etc.
        this.load.image('sea', 'imgs/sea.png');
        this.load.image('man', 'imgs/man.png');
        this.load.image('hook', 'imgs/hook.png');
        this.load.image('fish1', 'imgs/fish1.png');
        this.load.image('fish2', 'imgs/fish2.png');
        this.load.image('fish3', 'imgs/fish3.png');
        this.load.image('fish4', 'imgs/fish4.png');
        this.load.image('set', 'imgs/setting_w.png');

    // this.load.image('ground', 'imgs/platform.png');
    }

    create ()
    {
        // to handle problem game star in the interval
        // if (this.game_level>1){
        //     this.scene.setActive(false,'game');
        // }

        // This function will set up the game, display sprites, etc.
        this.add.image(650, 100, 'sea')
            .setScale(1.3);
        this.add.image(650, 75, 'man')
            .setScale(0.2);
        const setting=this.add.image(this.game.config.width, 0, 'set')
            .setScale(0.1)
            .setOrigin(1,0);
        setting.setInteractive();

        setting.on('pointerdown', () => {
            this.scene.setActive(false,"game");
            this.scene.launch('setting'); 
            // this.scene.pause('game'); 
        });

        // set hook
        this.hook = this.add.sprite(650, 130, 'hook').setScale(0.03);
        this.hook.setOrigin(0.5,0);
        this.hook.setRotation(Phaser.Math.DegToRad(90)); //start from -90 degrees

        this.rotation=this.tweens.add({
            targets: this.hook,
            rotation: Phaser.Math.DegToRad(-90), // Rotate to -90 degrees
            duration: 2000, // Duration in milliseconds
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1, /// Repeat indefinitely  
        });

        this.hookorigin_x=this.hook.x;
        this.hookorigin_y=this.hook.y;

        this.catch_area=this.physics.add.sprite(650, 130, 'hook').setScale(0.03);
        this.catch_area.setOrigin(0.5,0.5);
        this.catch_area.setAlpha(0);
        this.catch_area.body.allowGravity = false;


        
        this.string = new Phaser.Geom.Line(this.hook.x, this.hook.y, this.hook.x, this.hook.y);
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.strokeLineShape(this.string);


        // timer
        this.total_time=5000*(3-parseInt((this.game_level-0.1)/5));  //in millisecond
        this.timer =this.time.delayedCall(this.total_time,this.timecomplete,[],this);
        this.timer_text=this.add.text(10,10,'',{fontFamily: 'Arial', fontSize: '24px', color: '#ffffff'});
        // this.timer_text.setOrigin(0, 0);

        //score
        this.score=this.add.text(50,10,'',{fontFamily: 'Arial', fontSize: '24px', color: '#ffffff'});
        // this.score.setOrigin(0, 0);
        this.score.text=this.sum_score;


        // generate fishes
        const numberOfFish = 5-(this.game_level-1)%5;
        this.fishGroup1 = this.physics.add.group();
         
        for (let i = 0; i < numberOfFish; i++) {
            const randx=Math.floor(Math.random() * this.game.config.width);
            const randy=Math.floor(Math.random() * (this.game.config.height-300))+300;
            const randwidth=Math.floor(Math.random() * this.game.config.width/4);
            const randheight=Math.floor(Math.random() * (this.game.config.height-300)/4);
            const fishbound =new Phaser.Geom.Rectangle(randx, randy, randwidth, randheight);

            this.fish1 = this.fishGroup1.create(
            Phaser.Math.Between(fishbound.x, fishbound.x + fishbound.width),
            Phaser.Math.Between(fishbound.y, fishbound.y + fishbound.height),
            'fish1'
            );
            this.fish1.caught=false;
            this.fish1.group=1;

    
            const direction = Math.random() < 0.5 ? -1 : 1;
            if (direction==-1){
                this.fish1.setVelocityX(Phaser.Math.Between(-150, -50)); // Set vertical movement speed
            }else{
                this.fish1.setVelocityX(Phaser.Math.Between(50, 150)); 
            }
            this.fish1.setBounce(1,1); //  Make fish bounce off walls or boundaries
            this.fish1.setCollideWorldBounds(true);
            this.fish1.body.allowGravity = false;
            this.fish1.setScale(0.2);
            this.fish1.setOrigin(0,0.5);
        

            // filp the fish if they are moving right
            if (this.fish1.body.velocity.x < 0) {
                this.fish1.setFlipX(false); 
            } else if (this.fish1.body.velocity.x > 0) {
                this.fish1.setFlipX(true); 
            }
        }

        this.fishGroup2 = this.physics.add.group();
         
        for (let i = 0; i < numberOfFish; i++) {
            const randx=Math.floor(Math.random() * this.game.config.width);
            const randy=Math.floor(Math.random() * (this.game.config.height-300))+300;
            const randwidth=Math.floor(Math.random() * this.game.config.width/4);
            const randheight=Math.floor(Math.random() * (this.game.config.height-300)/4);
            const fishbound =new Phaser.Geom.Rectangle(randx, randy, randwidth, randheight);

            this.fish2 = this.fishGroup2.create(
            Phaser.Math.Between(fishbound.x, fishbound.x + fishbound.width),
            Phaser.Math.Between(fishbound.y, fishbound.y + fishbound.height),
            'fish2'
            );
            this.fish2.caught=false;
            this.fish2.group=2;

    
            const direction = Math.random() < 0.5 ? -1 : 1;
            if (direction==-1){
                this.fish2.setVelocityX(Phaser.Math.Between(-150, -50)); // Set vertical movement speed
            }else{
                this.fish2.setVelocityX(Phaser.Math.Between(50, 150)); 
            }
            this.fish2.setBounce(1,1); //  Make fish bounce off walls or boundaries
            this.fish2.setCollideWorldBounds(true);
            this.fish2.body.allowGravity = false;
            this.fish2.setScale(0.2);
            this.fish2.setOrigin(0,0.5);
        

            // filp the fish if they are moving right
            if (this.fish2.body.velocity.x < 0) {
                this.fish2.setFlipX(false); 
            } else if (this.fish2.body.velocity.x > 0) {
                this.fish2.setFlipX(true); 
            }
        }
        
        this.fishGroup3 = this.physics.add.group();
         
        for (let i = 0; i < numberOfFish; i++) {
            const randx=Math.floor(Math.random() * this.game.config.width);
            const randy=Math.floor(Math.random() * (this.game.config.height-300))+300;
            const randwidth=Math.floor(Math.random() * this.game.config.width/4);
            const randheight=Math.floor(Math.random() * (this.game.config.height-300)/4);
            const fishbound =new Phaser.Geom.Rectangle(randx, randy, randwidth, randheight);

            this.fish3 = this.fishGroup3.create(
            Phaser.Math.Between(fishbound.x, fishbound.x + fishbound.width),
            Phaser.Math.Between(fishbound.y, fishbound.y + fishbound.height),
            'fish3'
            );
            this.fish3.caught=false;
            this.fish3.group=3;

    
            const direction = Math.random() < 0.5 ? -1 : 1;
            if (direction==-1){
                this.fish3.setVelocityX(Phaser.Math.Between(-150, -50)); // Set vertical movement speed
            }else{
                this.fish3.setVelocityX(Phaser.Math.Between(50, 150)); 
            }
            this.fish3.setBounce(1,1); //  Make fish bounce off walls or boundaries
            this.fish3.setCollideWorldBounds(true);
            this.fish3.body.allowGravity = false;
            this.fish3.setScale(0.2);
            this.fish3.setOrigin(0,0.5);

        

            // filp the fish if they are moving right
            if (this.fish3.body.velocity.x < 0) {
                this.fish3.setFlipX(false); 
            } else if (this.fish3.body.velocity.x > 0) {
                this.fish3.setFlipX(true); 
            }
        }

        this.fishGroup4 = this.physics.add.group();
         
        for (let i = 0; i < numberOfFish; i++) {
            const randx=Math.floor(Math.random() * this.game.config.width);
            const randy=Math.floor(Math.random() * (this.game.config.height-300))+300;
            const randwidth=Math.floor(Math.random() * this.game.config.width/4);
            const randheight=Math.floor(Math.random() * (this.game.config.height-300)/4);
            const fishbound =new Phaser.Geom.Rectangle(randx, randy, randwidth, randheight);

            this.fish4 = this.fishGroup4.create(
            Phaser.Math.Between(fishbound.x, fishbound.x + fishbound.width),
            Phaser.Math.Between(fishbound.y, fishbound.y + fishbound.height),
            'fish4'
            );
            this.fish4.caught=false;
            this.fish4.group=4;


    
            const direction = Math.random() < 0.5 ? -1 : 1;
            if (direction==-1){
                this.fish4.setVelocityX(Phaser.Math.Between(-150, -50)); // Set vertical movement speed
            }else{
                this.fish4.setVelocityX(Phaser.Math.Between(50, 150)); 
            }
            this.fish4.setBounce(1,1); //  Make fish bounce off walls or boundaries
            this.fish4.setCollideWorldBounds(true);
            this.fish4.body.allowGravity = false;
            this.fish4.setScale(0.2);
            this.fish4.setOrigin(0,0.5);

        

            // filp the fish if they are moving right
            if (this.fish4.body.velocity.x < 0) {
                this.fish4.setFlipX(false); 
            } else if (this.fish4.body.velocity.x > 0) {
                this.fish4.setFlipX(true); 
            }
        }

        this.clickcount = 0;

        // Listen for the pointerdown event
        this.input.keyboard.on('keydown', (event) => {
            if (event.code === 'ArrowDown' || event.key === 'Down') {
                this.clickcount++;

                if (this.clickcount==1) {
                    this.extendString();
                    this.rotation.pause();
                }
            }
            
        }, this);

        this.isExtending = false;
        this.isRetracting = false;
        this.stringLength = 0;

        //catch fish
        this.fishonhook=false; //check if there is fish on hook
        // this.allfishgroup=this.physics.add.group();
        // this.allfishgroup.addMultiple([this.fishGroup1,this.fishGroup2,this.fishGroup3,this.fishGroup4],true);
        
        this.fishGroup1.children.iterate(fish => {
            this.physics.add.collider(this.catch_area, this.fishGroup1, this.catchfish, null, this);
        });
        this.fishGroup2.children.iterate(fish => {
            this.physics.add.collider(this.catch_area, this.fishGroup2, this.catchfish, null, this);
        });
        this.fishGroup3.children.iterate(fish => {
            this.physics.add.collider(this.catch_area, this.fishGroup3, this.catchfish, null, this);
        });
        this.fishGroup4.children.iterate(fish => {
            this.physics.add.collider(this.catch_area, this.fishGroup4, this.catchfish, null, this);
        });

        this.answer=false;
    }

    update()
    {
        this.time_left_ms=this.total_time - this.timer.getElapsed();
        this.time_left=Math.ceil(this.time_left_ms / 1000);
        this.timer_text.text=this.time_left;
        
        this.fish_adjust(this.fishGroup1);
        this.fish_adjust(this.fishGroup2);
        this.fish_adjust(this.fishGroup3);
        this.fish_adjust(this.fishGroup4);
        // this.fish_adjust(this.allfishgroup);

        // this.score.text=fish.x.toString()+" + " +fish.y.toString();

        // extend and retract string
        this.extend_retract_string();
        // this.catch_point = new Phaser.Geom.Point(this.hook.x,this.hook.y); 
        // this.check_catch_fish(this.catch_point);
        // var answer=false;
        Eventbus.on('checkanswer', (message)=>{
            this.answer=message;
        });
        if (this.answer==true){
            this.score.text=(parseInt(this.score.text)+10);
            this.answer=false;
        }
    

    }
    fish_adjust(group)
    {
        
        group.children.iterate(fish=> {
            if (fish.body.velocity.x < 0) {
                fish.setFlipX(false); // Do not flip the fish sprite when moving to the right
            } else if (fish.body.velocity.x > 0) {
                fish.setFlipX(true); // Flip the fish sprite horizontally when moving to the left
            }
        })
            

    }

    extendString() {
        this.isExtending = true;
        // this.time_pre=performance.now();
        this.time_pre=this.time_left_ms;
    }

    extend_retract_string() {
        
        // this.time_now=performance.now();
        this.time_now=this.time_left_ms;
        this.deltatime=this.time_pre-this.time_now;
        const extendrate = 0.1; // Units per second
        const extendamount = extendrate * this.deltatime;
        this.time_pre=this.time_now;
        if (this.isExtending && !this.isRetracting) {
            this.stringLength += extendamount; // Increase the string length

            if (this.stringLength >= 500) {
                this.isExtending = false; // Stop extending when reaching the maximum length
                this.isRetracting=true;
            }
            
        }
        if (!this.isExtending && this.isRetracting){
            this.stringLength -= extendamount;

            this.fishGroup1.children.iterate(fish => {
                if (fish.caught) {
                    fish.x = this.hook.x;
                    fish.y = this.hook.y;
                }
            });
            this.fishGroup2.children.iterate(fish => {
                if (fish.caught) {
                    fish.x = this.hook.x;
                    fish.y = this.hook.y;
                }
            });
            this.fishGroup3.children.iterate(fish => {
                if (fish.caught) {
                    fish.x = this.hook.x;
                    fish.y = this.hook.y;
                }
            });
            this.fishGroup4.children.iterate(fish => {
                if (fish.caught) {
                    fish.x = this.hook.x;
                    fish.y = this.hook.y;
                }
            });

            // if (this.stringLength>0&&this.stringLength<1&&this.fishcaught) {
            //     this.score.text=(parseInt(this.score.text)+10);
            // }

            if (this.stringLength <=0) {       
                this.isExtending = false; // Stop retracting when reaching the minimum length
                this.isRetracting=false;      
            }

        }

        if (!this.isExtending && !this.isRetracting){
            // this.fishGroup1.children.iterate(fish => {
            //     if (fish.caught) {
            //         fish.re
            //         this.score.text+=10;
            //     }
            // });
            // this.fishGroup2.children.iterate(fish => {
            //     if (fish.caught) {
            //         this.fishGroup2.remove(fish, true);
            //         this.score.text+=10;
            //     }
            // });
            // this.fishGroup3.children.iterate(fish => {
            //     if (fish.caught) {
            //         this.fishGroup3.remove(fish, true);
            //         this.score.text+=10;
            //     }
            // });
            // this.fishGroup4.children.iterate(fish => {
            //     if (fish.caught) {
            //         this.fishGroup4.remove(fish, true);
            //         this.score.text+=10;
            //     }
            // });

            this.fishGroup1.remove(this.fishcaught, true,true);
            this.fishGroup2.remove(this.fishcaught, true,true);
            this.fishGroup3.remove(this.fishcaught, true,true);
            this.fishGroup4.remove(this.fishcaught, true,true);
            // this.score.text=this.score.val;
            if (this.fishcaught){
                var fishtype=this.fishcaught.group;
                this.fishcaught=null;
                // this.score.text=(parseInt(this.score.text)+10);
                // this.scene.pause("game");
                this.scene.setActive(false,"game")
                this.scene.launch("question",{type:fishtype});
                
            }
            
            this.rotation.resume();
            this.clickcount=0;
            // this.hookfishcollider=this.physics.add.collider(this.catch_area, this.allfishgroup, this.catchfish, null, this);
            this.catch_area.enableBody(false,true,true);
            this.fishGroup1.children.iterate(fish => {
                this.physics.add.collider(this.catch_area, this.fishGroup1, this.catchfish, null, this);
            });
            this.fishGroup2.children.iterate(fish => {
                this.physics.add.collider(this.catch_area, this.fishGroup2, this.catchfish, null, this);
            });
            this.fishGroup3.children.iterate(fish => {
                this.physics.add.collider(this.catch_area, this.fishGroup3, this.catchfish, null, this);
            });
            this.fishGroup4.children.iterate(fish => {
                this.physics.add.collider(this.catch_area, this.fishGroup4, this.catchfish, null, this);
            });
        }

        const endpoint = new Phaser.Math.Vector2();

        endpoint.x=this.hookorigin_x-this.stringLength*Math.sin(this.hook.rotation);
        endpoint.y=this.hookorigin_y+this.stringLength*Math.cos(this.hook.rotation);

        Phaser.Geom.Line.SetToAngle(this.string, this.hookorigin_x, this.hookorigin_y,this.hook.rotation+Math.PI/2, this.stringLength);

        this.graphics.clear();
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.strokeLineShape(this.string);

        this.hook.x = endpoint.x;
        this.hook.y = endpoint.y;
        this.catch_area.x = endpoint.x;
        this.catch_area.y = endpoint.y;
    }

    catchfish(area,fish) {
        // Attach the fish to the hook
        // this.physics.world.enable(fish);
        fish.body.moves = false;
        fish.setTint(0x00ff00); 
        fish.caught=true;
        this.fishcaught=fish;
        // this.fishonhook=true
        area.disableBody(true);
        

        // fish.body.enable = true;
        // fish.body.stop();
        // fish.body.rotation(this.hook.rotation);
        // this.physics.world.remove(fish); // Remove fish from the physics world
    
        
        // fish.body.setCollideWorldBounds(false);
        // fish.body.setImmovable(true);
        // fish.body.enable = false;
        // this.physics.world.disableBody(fish.body);

        
        // this.hookfishcollider.destroy();
        this.isExtending=false;
        this.isRetracting=true;
                
      }

    // check_catch_fish(point)
    // {
        
    //     this.allfishgroup.children.iterate(fish => {
    //         // (fish.x, fish.y, fish.width, fish.height);
    //         if (fish.body.(point.x,point.y)){
    //             this.catchfish(fish);
    //             this.fishonhook=true;
    //         }
    //     })
    // }

    timecomplete() 
    {
        if (this.game_level<15){
            this.fishcaught=null;
            if(parseInt(this.score.text)>=this.game_level*10){
                this.scene.launch('interval',{level:this.game_level,sum_score:parseInt(this.score.text)})
                this.scene.start('game',{level:this.game_level+1,sum_score:parseInt(this.score.text)})
                this.scene.sleep('game')
            }else{
                alert("Game Over! You did not Get Enough Points");
                this.scene.start('home');
            }
            
            
        }else{
            this.scene.start('home');
        }
        

    }
}
