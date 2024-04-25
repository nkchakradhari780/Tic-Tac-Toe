let boxes = document.querySelectorAll(".box");
let playerX = true;
let winbox = document.querySelector(".winbox");
let container = document.querySelector(".container");
let ResetGame = document.querySelector("#resetgame");
let NewGame = document.querySelector("#newgame");
let xScore = document.querySelector("#xscore");
let tieScore = document.querySelector("#tiescore");
let oScore = document.querySelector("#oscore");
let btnclick=0;
const winningState = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let px = 0;
let po = 0;
let tie = 0;
ResetGame.addEventListener("click", () => {
    console.log("Reset button clicked");
    winbox.style.display = "none"; // Hide the winbox div
    enableBox();
    box.innerText = "";
});

NewGame.addEventListener("click", ()=> {
    console.log("New Game button clicked");
    winbox.style.display = "none";
    px = 0;
    po = 0;
    tie = 0;
    xScore.innerText = px;
    oScore.innerText = po;
    tieScore.innerText = tie;
    enableBox();
    box.innerText = "";
});

boxes.forEach( box =>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        btnclick++;
        if(playerX===true){
            box.innerText = "X";
            playerX = false;
        }
        else{
            box.innerText = "O";
            playerX = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const checkWinner = () => {
    for(let pattern of winningState){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("winnner");
                winbox.style.display = "block";
                if(playerX === false){
                    winbox.innerText = "Winner is X"
                    px++;
                    xScore.innerText = px;
                }
                else{
                    winbox.innerText = "Winner is O"
                    po++;
                    oScore.innerText = po;
                }
                disableBox();
            }
            if(pos1 !== pos2 && pos2 !== pos3 && btnclick===9){
                winbox.innerText = "Tie";
                tie++;
                btnclick=0;
                tieScore.innerText = tie;
                winbox.style.display="block";
            }
        }
    }
}

const enableBox = () => {
    for(let box of boxes ){
        box.disabled = false;
        box.innerText = "";
    }
}