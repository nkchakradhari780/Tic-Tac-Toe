let boxes = document.querySelectorAll(".box");
let playerX = true;
let winbox = document.querySelector(".winbox");
let container = document.querySelector(".container");
let ResetGame = document.querySelector("#resetgame");
let NewGame = document.querySelector("#newgame");
let xScore = document.querySelector("#xscore");
let tieScore = document.querySelector("#tiescore");
let oScore = document.querySelector("#oscore");
let strike = document.querySelector("#strike");
let btnclick=0;
let changeMode = document.querySelector("#mode");
let win = false;
let checktie = false;
const winningState = [
    {combo:[0,1,2], strikeClass: "line1"},
    {combo:[3,4,5], strikeClass: "line2"},
    {combo:[6,7,8], strikeClass: "line3"},
    {combo:[0,3,6], strikeClass: "line4"},
    {combo:[1,4,7], strikeClass: "line5"},
    {combo:[2,5,8], strikeClass: "line6"},
    {combo:[0,4,8], strikeClass: "line7"},
    {combo:[2,4,6], strikeClass: "line8"},
];

const clickedBox = [];
let px = 0;
let po = 0;
let tie = 0;

ResetGame.addEventListener("click", () => {
    console.log("Reset button clicked");
    for(let pattern of winningState){
        const {combo,strikeClass} = pattern;
        strike.classList.remove(strikeClass);
    }
    playerX = true;
    win = false;
    btnclick = 0;
    winbox.style.display = "none"; 
    textRemove();
    enableBox();
    clickedBox.splice(0,clickedBox.length);
    box.innerText = "";
});

NewGame.addEventListener("click", ()=> {
    console.log("New Game button clicked");
    winbox.style.display = "none";
    for(let pattern of winningState){
        const {combo,strikeClass} = pattern;
        strike.classList.remove(strikeClass);
    }
    playerX = true;
    win = false;
    px = 0;
    po = 0;
    tie = 0;
    btnclick = 0;
    xScore.innerText = px;
    oScore.innerText = po;
    tieScore.innerText = tie;
    enableBox();
    textRemove();
    clickedBox.splice(0,clickedBox.length);
    box.innerText = "";
});

boxes.forEach( (box,index) =>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        btnclick++;
        if(playerX===true){
            disableBox();
            box.innerText = "X";
            playerX = false;
            clickedBox.push(index);
            checkWinner();
            console.log("btnclick:"+btnclick);
            if(win === false ){
                setTimeout(()=>computerTurn(), 1000);
            }
        }
        box.disabled = true;
    });
});

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
        console.log("Disable box was clicked");
    }
}
const checkWinner = () => {
    for(let pattern of winningState){
        const {combo,strikeClass} = pattern;
        let pos1 = boxes[combo[0]].innerText;
        let pos2 = boxes[combo[1]].innerText;
        let pos3 = boxes[combo[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("winnner");
                strike.style.display = "block";
                strike.classList.add(strikeClass);
                winbox.style.display = "block";
                if(playerX === false){
                    winbox.innerText = "Winner is X"
                    px++;
                    xScore.innerText = px;
                    win = true;
                    break;
                }
                else{
                    winbox.innerText = "Winner is O"
                    po++;
                    oScore.innerText = po;
                }
                disableBox();
            }
            if( pos1 !== pos2 || pos1 !== pos3 || pos2 !== pos3){
                console.log("inside");
                if(btnclick===9 && checktie===false){
                    winbox.innerText = "Tie";
                    tie++;
                    tieScore.innerText = tie;
                    winbox.style.display="block";
                    console.log("Tie");
                    checktie = true;
                }
            }
        }
    }
}

const enableBox = () => {
    for(let box of boxes ){
        if(box.innerText === ""){
            box.disabled = false;
        }
        console.log("Enable box was called");
    }
}

const textRemove =() =>{
    for(let box of boxes){
        box.innerText = "";
    }
}

let randomBox = () =>{
    if(btnclick === 9){
        return;
    }
    let min = 0;
    let max = 8;
    let randval =  Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(clickedBox);
    console.log("rand")
    for(let i = 0;i<clickedBox.length;i++){
        if(clickedBox[i] === randval){
            console.log("overlapped");
            randval = randomBox();
        }
    }
    return randval;
} 

let computerTurn = () =>{
    let boxpos = randomBox();
    console.log(boxpos);
    for(let i = 0;i<=8;i++){
        if(i === boxpos){
            console.log("Success");
            let cmpbox = boxes[i];
            cmpbox.innerText = "O";
            playerX = true;
            clickedBox.push(i);
            console.log(clickedBox);
            btnclick++;
            console.log("btnclick:"+btnclick);
            checkWinner();
            enableBox();
            break;
        }
    }

}
