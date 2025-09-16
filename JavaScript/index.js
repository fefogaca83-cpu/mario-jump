const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score")
const gameOverGif = document.querySelector(".game-over-gif");

const jump = () => {
  if(gameOver) return;
    mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

let score = 0;
let highScore = 0;
let passed = false;
let gameOver = false;
let loop;

function updateScore(){
    score++;
    scoreElement.textContent = score.toString().padStart(5, "0");

    if(score > highScore){
        highScore = score;
        highScoreElement.textContent = "HI " + highScore.toString().padStart(5, "0")
    }
}

function showGameOverGif (){
    gameOverGif.style.display = "block";
}
function hideGameOverGif(){
    gameOverGif.style.display = "none";
}

function getResponsiveValues() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Landscape mode em smartphones
    if (screenHeight <= 500 && window.innerWidth > window.innerHeight) {
        return {
            marioCollisionX: 90,
            marioCollisionY: 60,
            marioWidth: "70px",
            marioDeadWidth: "55px"
        };
    }
    // Smartphones muito pequenos
    else if (screenWidth <= 320) {
        return {
            marioCollisionX: 95,
            marioCollisionY: 65,
            marioWidth: "65px",
            marioDeadWidth: "50px"
        };
    }
    // Smartphones pequenos
    else if (screenWidth <= 480) {
        return {
            marioCollisionX: 100,
            marioCollisionY: 70,
            marioWidth: "80px", 
            marioDeadWidth: "60px"
        };
    }
    // Smartphones
    else if (screenWidth <= 768) {
        return {
            marioCollisionX: 110,
            marioCollisionY: 80,
            marioWidth: "100px",
            marioDeadWidth: "65px"
        };
    }
    // Tablets
    else if (screenWidth <= 1024) {
        return {
            marioCollisionX: 115,
            marioCollisionY: 90,
            marioWidth: "120px",
            marioDeadWidth: "70px"
        };
    }
    // Desktop
    else {
        return {
            marioCollisionX: 120,
            marioCollisionY: 80,
            marioWidth: "150px",
            marioDeadWidth: "75px"
        };
    }
}

function startGame(){
    score = 0;
    passed = false;
    gameOver = false;
     hideGameOverGif();

    scoreElement.textContent = "00000";

    mario.src = "./assets/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0";
  mario.style.bottom = "0px";
  mario.style.animation = "";

   pipe.style.left = "";
  pipe.style.animation = "pipe-animation 1.5s infinite linear";


  if (loop) clearInterval(loop);
  
  
  loop = setInterval(() => {
      const pipePosition = pipe.offsetLeft;
      
      //Para pegarmos a posição do Mario, precisamos converter o valor de string para number
      const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
      
      if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
          pipe.style.animation = "none";
          pipe.style.left = `${pipePosition}px`;
          
          mario.style.animation = "none";
          mario.style.bottom = `${marioPosition}px`;
          
          mario.src = "./assets/game-over.png";
          mario.style.width = "75px";
          mario.style.marginLeft = "50px";
          
          clearInterval(loop);
          gameOver = true;

          showGameOverGif();
          
          score = 0;
          scoreElement.textContent = "00000"
        }
        
        // Esse comando faz o score contar 1 ponto por fez quando pula o cano
        if (pipePosition < 50 && !passed && pipePosition > 0){
            updateScore();
            passed = true;
        }
        
        if (pipePosition <= 0 ){
            passed = false;
        }
        
    }, 10);
}

document.addEventListener("keydown", (event)=>{
    if (event.code === "Space" && gameOver){
        startGame();
}else{
    jump();
}
});

startGame();
