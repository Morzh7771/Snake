let playGround = document.getElementById('playGround')
let playGroundSize = playGround.offsetWidth;

let snakeRotateX = 1 //1 вправо 0 место -1 влево
let snakeRotateY = 0 //1 вверх 0 место -1 вниз
let game;

let pause = 0;
let snakeHead;
document.addEventListener('keydown',(event)=>{
    if (event.keyCode === 38 && snakeRotateY != -1){
        snakeRotateX = 0
        snakeRotateY = 1
        console.log('вверх')
    }else if (event.keyCode === 39 && snakeRotateX != -1){
        snakeRotateX = 1
        snakeRotateY = 0
        console.log('право')
    }else if (event.keyCode === 40 && snakeRotateY != 1){
        snakeRotateX = 0
        snakeRotateY = -1
        console.log('вниз')
    }else if (event.keyCode === 37 && snakeRotateX != 1){
        snakeRotateX = -1
        snakeRotateY = 0
        console.log('лево')
    }else if (event.keyCode === 32){
        if(pause === 0){
            pause = 1
            clearInterval(game)
        }else if(pause === 1){
            game = setInterval(startGame,1000/10)
            pause = 0
        }
    }
})

window.onload =()=>{
    gameLoop()
}
function gameLoop(){
    playGround.style.width = playGroundSize + 'px'
    playGround.style.height = playGroundSize + 'px'
    snakeHead = newGame()
    game = setInterval(startGame,1000/15)
}
function startGame(){
    update()
}
function newGame()
{
    const snake_head = document.createElement("div");
    snake_head.classList.add("snakeHead");
    playGround.append(snake_head);
    let test = 0
    let x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
    let y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
    test = x
    while (true){
        test = x
        x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
        if(test/10%1 === 0){
            snake_head.style.left = test + "px";
            break
        }
    }
    test = y
    while (true){
        test = y
        y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
        if(test/10%1 === 0){
            snake_head.style.top = test + "px";
            break
        }
    }
    return snake_head
   
}
function update(){
    move()
}
function move(){
    if(snakeRotateX === 1){
        snakeHead.style.left = parseInt(snakeHead.style.left) + 10 + 'px'
    }else if(snakeRotateX === -1){
        snakeHead.style.left = parseInt(snakeHead.style.left) - 10 + 'px'
    }else if(snakeRotateY === 1){
        snakeHead.style.top = parseInt(snakeHead.style.top) - 10 + 'px'
    }else if(snakeRotateY === -1){
        snakeHead.style.top = parseInt(snakeHead.style.top) + 10 + 'px'
    }
    if(parseInt(snakeHead.style.left) === playGround.offsetWidth){
        snakeHead.style.left = 10 + 'px'
    }else if(parseInt(snakeHead.style.left) === 10){
        snakeHead.style.left = playGround.offsetWidth - 10 + 'px'
        snakeRotateX = -1
    }else if(parseInt(snakeHead.style.top) === playGround.offsetHeight){
        snakeHead.style.top = 10 + 'px'
    }else if(parseInt(snakeHead.style.top) === 10){
        snakeHead.style.top = playGround.offsetHeight - 10 + 'px'
    }
}