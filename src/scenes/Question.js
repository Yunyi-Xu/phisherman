import Phaser from '../lib/phaser.js'
import Eventbus from '../Eventbus.js';

let n = 11; // n 是抽的题号，需要这个页面的父页面传进来，赋值给n
let choices = [];
let question ='';
let answer='';
let questionId=-1;
let q_type ='';

export default class Question extends Phaser.Scene
{
    constructor()
    {
        super('question')
    }
    init(data) {
        this.fishtype = data.type;
    }
    preload ()
    {
        this.physics.start();
        this.load.image('ques', 'imgs/ques_board.png');
        this.load.image('single-choice_no', 'imgs/icon_1.png');
        this.load.image('single-choice_yes', 'imgs/icon_2.png');
        this.load.image('multiple-choice_no', 'imgs/icon_3.png');
        this.load.image('multiple-choice_yes', 'imgs/icon_4.png');
        ////////////////////////////////////////////////////////////////



        const apiUrl = 'http://3.96.64.25:9090/fisherman/GPT/questionGetting';
        const requestData = {
            n
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            // 在这里处理接口返回的数据
            console.log(data);
            const questionData = data.data[0];
            choices = [questionData.optionA, questionData.optionB, questionData.optionC, questionData.optionD];
            question = questionData.question;
            answer = questionData.answer;
            questionId = questionData.id;
            q_type = questionData.type;

            console.log(choices);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        ////////////////////////////////////////////////////////////////


    }
    create ()
    {
        // Add a background image
        this.bg=this.add.image(this.game.config.width / 2, this.game.config.height /2, 'ques')
            .setScale(0.8);


        // Add a back button
        const back_button = this.add.text(
        this.bg.x-10,
        this.bg.y+220,
        'Back',
        {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
        );
        back_button.setInteractive();
            
        back_button.on('pointerdown', () => {
        this.scene.stop('question')
        this.scene.setActive(true,"game")
        });

        


        // 延迟添加
        setTimeout(() => {
            
            const question_test=this.add.text(this.bg.x-this.bg.width/8, this.bg.y-this.bg.height/4, question, { fontFamily: 'Arial',fontSize: '24px', fill: '#ffffff' });
            // question_test.setInteractive();
            const num_choice=4;
            // var q_type='best';
            // if(this.fishtype%2==1){
            //     q_type='mult';
            // }
            // const q_type='mult';
            
            // 
            // const choices=["green","red","balck","blue","yellow"];
            console.log(choices); 
            const select_box={};
            for (let i = 0; i < num_choice; i++) {
                this.add.image(this.bg.x-this.bg.width/8-20, this.bg.y-this.bg.height/4+(i+2)*50,q_type+"_yes").setScale(0.2);
                select_box[i]=this.add.image(this.bg.x-this.bg.width/8-20, this.bg.y-this.bg.height/4+(i+2)*50,q_type+"_no").setScale(0.2).setAlpha(1).setInteractive();
                if (q_type==='multiple-choice'){
                    select_box[i].on('pointerdown', () => {
                        select_box[i].setAlpha( this.f_alpha_mult(select_box[i].alpha));
                    });
                }else if(q_type==='single-choice'){
                    select_box[i].on('pointerdown', () => {
                        for (let j = 0; j < num_choice; j++){
                            select_box[j].setAlpha(1);
                        }
                        select_box[i].setAlpha( this.f_alpha_best(select_box[i].alpha));
                    });
                }
                
                this.add.text(this.bg.x-this.bg.width/8, this.bg.y-this.bg.height/4+(i+2)*50-15, choices[i], { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
            }
            const answer_text=this.add.text(
                this.bg.x-this.bg.width/8-60,
                this.bg.y-this.bg.height/4+320,
                'Correct answer is: '+answer,
                {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
                ).setAlpha(0);


            const mapping = { A: 0, B: 1, C: 2,D: 3};
            const answer_idx=answer.split(',').map(letter=>mapping[letter]);
            

            const confirm_button=this.add.text(
                this.bg.x-20,
                this.bg.y+150,
                'Confirm',
                {fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' }
                );
            confirm_button.setInteractive();
            
            confirm_button.once('pointerdown', () => {
                const my_answer=[];
                for (let i = 0; i < num_choice; i++) {
                    my_answer[i]=select_box[i].alpha
                }
                const my_idx = [];
                for (let i = 0; i < num_choice; i++) {
                    if (my_answer[i] === 0.01) {
                    my_idx.push(i);
                    }
                }
            //conpare my answer and real one
            // var checkanswer=false;
            if (JSON.stringify(my_idx)!==JSON.stringify(answer_idx)){
                Eventbus.emit('checkanswer',false);
                answer_text.setColor('red').setAlpha(1);
            }else{
                Eventbus.emit('checkanswer',true);
                this.scene.stop('question')
                this.scene.setActive(true,"game")
            }

            }); 
            
            
            
        }, 1000); // delay 1s

        // define the question and choices
        


    }
    update()
    {
        
    }

    f_alpha_mult(x) {
        if (x === 1) {
          return 0.01;
        } else if (x === 0.01) {
          return 1;
        }
    }
    f_alpha_best(x) {
        if (x === 1) {
          return 0.01;
        } else if (x === 0.01) {
            return 0.01;
          }
    }
}