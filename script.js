let gameSeq = [];
let playerSeq = [];

let btns = ["b1", "b2", "b3", "b4","b5","b6", "b7","b8", "b9"]

let started = false;
let score = 0;

let h2 =document.querySelector("h2");
let highScored = document.querySelector("#HS");
let current = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage
highScored.innerText = `Highscore: ${current}`;

document.addEventListener("keypress", () =>{
    if(started == false){ 
        console.log("game started");
        started = true;
        levelUp();
    }
})
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
    btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
    btn.classList.remove("userFlash");
    }, 250);
}

function levelUp(){
    playerSeq = [];
    score++;
    h2.innerText = `score : ${score}`;

    let randomIdx = Math.floor(Math.random()*9);
    let randomBox = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomBox}`)
    gameSeq.push(randomBox);
    console.log(gameSeq)
    gameFlash(randomBtn);
}

function checking(i){
    if(playerSeq[i] === gameSeq[i]){
        if(playerSeq.length === gameSeq.length){
            setTimeout(levelUp,750);
        }
    }else{
        h2.innerHTML = `Game over !!! Your final score was <b>${score}</b>.<br>Press any key to restart the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() =>{
            document.querySelector("body").style.backgroundColor = "white";    
        },150);
        
        if (score > current) {
            current = score;
            highScored.innerText = `Highscore: ${current}`;
            localStorage.setItem("highScore", current); // Save the new high score to localStorage
        }
        
        reset(); 
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userBox = btn.getAttribute("id");
    playerSeq.push(userBox);

    checking(playerSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    playerSeq = [];
    score = 0;
}