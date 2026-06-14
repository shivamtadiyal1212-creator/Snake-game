const board=document.querySelector(".board");
const startbutton=document.querySelector(".btn-start");
const model=document.querySelector(".model");
const startGamemodel=document.querySelector(".start-game");
const gameoverModel=document.querySelector(".game-over");
const restartButton=document.querySelector(".btn-restart");
const highscore=document.querySelector(".high-score");
const score=document.querySelector(".score");
const time=document.querySelector(".time");


const blockHeight=50
const blockwidth=50



let highScore=localStorage.getItem("highScore")||0;
let Score=0;
let Time=`00-00`;
highscore.textContent=`${highScore}`;



const cols=Math.floor(board.clientWidth/blockwidth);
const rows=Math.floor(board.clientHeight/blockHeight);
const blocks=[];
let snake=[{
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols),
}];

let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
let direction="right";

let intervalId=null;
let timerIntervalId=null;
// for(let i=0;i<cols*rows;i++){
//     const div=document.createElement("div");
//     div.classList.add("block");
//     board.appendChild(div);
// }




for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
        const div=document.createElement("div");
        div.classList.add("block");
        board.appendChild(div);
        // div.innerHTML=`${row}-${col}`;
        blocks[`${row}-${col}`]=div;  
    }
}



function render(){
    let head=null;
    if(direction==="left"){
        head= {x:snake[0].x, y: snake[ 0 ].y-1}
    }
    else if(direction==="right"){
        head={x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction==="down"){
        head={x:snake[0].x+1,y:snake[0].y}
    }

    else if(direction==="up"){
        head={x:snake[0].x-1,y:snake[0].y}
    }


        if(head.x<0||head.x>=rows ||head.y<0||head.y>=cols){
            // alert("Game Over");
            clearInterval(intervalId);
            model.style.display="flex";
            startGamemodel.style.display="none";
            gameoverModel.style.display="flex";
            return;
        }

        if(head.x===food.x && head.y===food.y){
            blocks[`${food.x}-${food.y}`].classList.remove("food");

            food.x=Math.floor(Math.random()*rows);
            food.y=Math.floor(Math.random()*cols);
            snake.unshift(head);
            Score=Score+10;
            score.textContent=`${Score}`;
            if(Score>highScore){
                highScore=Score;
                localStorage.setItem("highScore",highScore.toString());
    
            }
        }


    snake.forEach(segment=>{
        const block=blocks[`${segment.x}-${segment.y}`];
        block.classList.remove("fill");
    })

    snake.unshift(head)
    snake.pop();



    snake.forEach(segment=>{
        const block=blocks[`${segment.x}-${segment.y}`];
        block.classList.add("fill");

    })
    const foodblock=blocks[`${food.x}-${food.y}`];
    foodblock.classList.add('food');
}
// intervalId=setInterval(()=>{
    
//     render();
// },300)



startbutton.addEventListener("click",()=>{

    model.style.display="none";
    setInterval(()=>{
        render()
    },400)
    timerIntervalId=setInterval(()=>{
        let [min,sec]=Time.split("-").map(Number)
        if(sec===59){
            min=min+1;
            sec=0;
        }else{
            sec=sec+1;
        }
        Time=`${min}-${sec}`;
        time.textContent=`${Time}`;
    },1000)
})
restartButton.addEventListener("click",()=>{
    model.style.display="none";
    restartgame();
})
    function restartgame(){
        
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        snake.forEach(segment=>{
            blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
        })
        Score=0;
        Time=`00:00`;
        time.textContent=`${Time}`;
         score.textContent=`${Score}`;
        direction="down";
        snake=[{
            x:1,
            y:3,
        }];

        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};

        setInterval(()=>{
            render()
            },1000)
    }




addEventListener("keydown",(event)=>{
//console.log(event.key);


    if(event.key==="ArrowUp")
    {
        direction="up";

    }
    else if(event.key==="ArrowDown"){
        direction="down";
    }
    else if(event.key==="ArrowLeft"){
        direction="left";
    }
    else if(event.key==="ArrowRight"){
        direction="right";
    }
    else if(event.key==="ArrowUp"){
        direction="up";
    }
})
