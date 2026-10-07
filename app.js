let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = false;
let clickCnt = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turn0 = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickCnt=0;
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=> {
        if (turn0) {
            box.innerText="O";
        }
        else box.innerText="X";
        turn0=!turn0;
        box.disabled = true;
        clickCnt++;

        if (checkWinner()) return ;
        if (clickCnt===9) {
            showDraw();
        }
    })
})

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val!="" && pos1Val===pos2Val && pos2Val===pos3Val) {
            showWinner(pos1Val);
            disableBoxes();
            return true;
        }
    }
    return false;
}

const showWinner = (winner) => {
    msg.innerText=`Congratulations! ${winner} is the winner.`
    msgContainer.classList.remove("hide");
}

const showDraw = () => {
    msg.innerText = "This game is a draw.";
    msgContainer.classList.remove("hide");
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
}

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);