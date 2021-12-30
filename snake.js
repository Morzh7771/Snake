let playGround = document.getElementById('playGround')
let playGroundSize = playGround.offsetWidth;

let snakeRotateX = 1 //1 вправо 0 место -1 влево
let snakeRotateY = 0 //1 вверх 0 место -1 вниз
let game;

let haveTail = 0;

let score = 0;

let fps = 15 ;

let tail = []

let pause = 0;
let apple;
let snakeHead;
let foodOnPage
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 38 && snakeRotateY != -1) {
        snakeRotateX = 0
        snakeRotateY = 1
        //console.log('вверх')
    } else if (event.keyCode === 39 && snakeRotateX != -1) {
        snakeRotateX = 1
        snakeRotateY = 0
        //console.log('право')
    } else if (event.keyCode === 40 && snakeRotateY != 1) {
        snakeRotateX = 0
        snakeRotateY = -1
        //console.log('вниз')
    } else if (event.keyCode === 37 && snakeRotateX != 1) {
        snakeRotateX = -1
        snakeRotateY = 0
        //console.log('лево')
    } else if (event.keyCode === 32) {
        if (pause === 0) {
            pause = 1
            clearInterval(game)
        } else if (pause === 1) {
            game = setInterval(startGame, 1000 / fps)
            pause = 0
        }
    }
})

window.onload = () => {
    gameLoop()
}

function gameLoop() {
    playGround.style.width = playGroundSize + 'px'
    playGround.style.height = playGroundSize + 'px'
    snakeHead = newGame()
    game = setInterval(startGame, 1000 / fps)
}

function startGame() {
    update()
}

function newGame() {
    const snake_head = document.createElement("div");
    snake_head.classList.add("snakeHead");
    playGround.append(snake_head);

    let test = 0
    let x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
    let y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
    test = x
    while (true) {
        test = x
        x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
        if (test / 10 % 1 === 0) {
            snake_head.style.left = test + "px";
            break
        }
    }
    test = y
    while (true) {
        test = y
        y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
        if (test / 10 % 1 === 0) {
            snake_head.style.top = test + "px";
            tail.push({
                top:snake_head.style.top,
                left:snake_head.style.left,
            })
            break
        }
    }
    
    return snake_head

}

function update() {
    move()
    if (foodOnPage != 1) {
        foodOnPage = 1
        apple = createFood()
    }
    intersection()
}

function move() {
    if(snakeRotateX === 1){
        snakeHead.style.left = parseInt(snakeHead.style.left) + 10 + 'px'
        moveTail("right")
    }else if(snakeRotateX === -1){
        snakeHead.style.left = parseInt(snakeHead.style.left) - 10 + 'px'
        moveTail("left")
    }else if(snakeRotateY === 1){
        snakeHead.style.top = parseInt(snakeHead.style.top) - 10 + 'px'
        moveTail("top")
    }else if(snakeRotateY === -1){
        snakeHead.style.top = parseInt(snakeHead.style.top) + 10 + 'px'
        moveTail("down")
    }
    
    if (parseInt(snakeHead.style.left) === playGround.offsetWidth) {
        snakeHead.style.left = 10 + 'px'
    } else if (parseInt(snakeHead.style.left) === -10) {
        snakeHead.style.left = playGround.offsetWidth - 10 + 'px'
    } else if (parseInt(snakeHead.style.top) === playGround.offsetHeight) {
        snakeHead.style.top = 10 + 'px'
    } else if (parseInt(snakeHead.style.top) === -10) {
        snakeHead.style.top = playGround.offsetHeight - 10 + 'px'
    }
    tail.shift();
    tail.unshift({
        top:snakeHead.style.top,
        left:snakeHead.style.left,
    })
}
function moveTail(vector){
    let i = 1;
    if(haveTail === 1){
    while(i < tail.length){
        tail.splice(i, 1);
        tail.splice(i, 0, {
            top: playGround.children[i].style.top,
            left: playGround.children[i].style.left,
            vector:vector,
        })
        consol.log(vector)
        if(vector === 'right'){
            playGround.children[i].style.top = playGround.children[i].style.top
            playGround.children[i].style.left = parseInt(playGround.children[i].style.left) + 10 + 'px'
        }
        i++;
        if(i < teil.length){
            i = 1;
        }
    }
}
}

function createFood() {
    const apple = document.createElement("div");
    apple.classList.add("apple");
    boddy.append(apple);
    let test = 0
    let x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
    let y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
    test = x
    while (true) {
        test = x
        x = Math.round(Math.random() * (playGround.offsetWidth / 10) * 10);
        if (test / 10 % 1 === 0) {
            if (test >= 15 || test >=480) {
                apple.style.left = test + "px";
                break
            }
        }
    }
    test = y
    while (true) {
        test = y
        y = Math.round(Math.random() * (playGround.offsetHeight / 10) * 10);
        if (test / 10 % 1 === 0) {
            if (test >= 15 || test >=480) {
                apple.style.top = test + "px";
                break
            }
        }
    }
    return apple
}

function intersection() {
    if (parseInt(snakeHead.style.left) === parseInt(apple.style.left)-10 && parseInt(snakeHead.style.top) === parseInt(apple.style.top)-10) {
        apple.remove()
        apple = createFood()
        score++;
        console.log(score)
        newTail()
    }
}
function newTail(){
    const newTail = document.createElement("div");
    newTail.classList.add("snakeBody");
    playGround.append(newTail);
    let x = parseInt(tail[tail.length - 1].left)
    let y = parseInt(tail[tail.length - 1].top)
    if(snakeRotateX === 1){
    newTail.style.top = y + "px"
    newTail.style.left = x - 10 + "px"
    }else if(snakeRotateX === -1){
        newTail.style.top = y + "px"
        newTail.style.left = x + 10 + "px"
    }else if(snakeRotateY === 1){
        newTail.style.top = y + 10 + "px"
        newTail.style.left = x + "px"
    }else if(snakeRotateY === -1){
        newTail.style.top = y - 10 + "px"
        newTail.style.left = x + "px"
    }
    tail.push({
        top:newTail.style.top,
        left:newTail.style.left,
    })
    haveTail = 0
}