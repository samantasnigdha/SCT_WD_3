console.log("Welcome to Tic Tac Toe");

let audioTurn = new Audio("turn.mp3");
let turn = "X";
let isgameover = false;
let gameMode = "PvP"; 

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];
    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            isgameover = true;
            document.querySelector('.imgbox img').style.width = "200px";
        }
    });
};

const computerMove = () => {
    if (isgameover) return;
    let emptyBoxes = [];
    let boxes = document.getElementsByClassName("boxtext");
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            emptyBoxes.push(i);
        }
    }
    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxes[randomIndex].innerText = "O";
        audioTurn.play();
        checkWin();
        if (!isgameover) {
            turn = "X";
            document.querySelector(".info").innerText = "Turn for " + turn;
        }
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
                if (gameMode === "PvC" && turn === "O") {
                    setTimeout(computerMove, 500);
                }
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector('.imgbox img').style.width = "0px";
});

document.getElementById("pvp").addEventListener("click", () => {
    gameMode = "PvP";
    document.getElementById("reset").click();
});

document.getElementById("pvc").addEventListener("click", () => {
    gameMode = "PvC";
    document.getElementById("reset").click();
});
