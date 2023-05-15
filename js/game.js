let boxItemEl = Array.from(document.getElementsByClassName("box-item"));
let restartBtn = document.getElementById("restartBtn");
let restartEl = document.querySelector(".restart");
let achievText = document.querySelector(".achiev"); 

const O_TEXT = "<i class='bx bx-radio-circle'></i>";
const X_TEXT = "<i class='bx bx-x'></i>";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    boxItemEl.forEach((box) => box.addEventListener('click', boxClicked));
};


// ===============================================
function boxClicked(e) {

    const id = e.target.id;

    if(!spaces[id]) {

        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;

        if(playerHasWon() !== false) {
            if(currentPlayer === "<i class='bx bx-x'></i>") {
                achievText.innerHTML = 'Player 1 Wins';
                restart();
            } else if (currentPlayer === "<i class='bx bx-radio-circle'></i>"){
                achievText.innerHTML = 'Player 2 Wins';
                restart();
            };
        };

        if(currentPlayer === "<i class='bx bx-x'></i>") {
            e.target.classList.add("activeX");
        } else if(currentPlayer === "<i class='bx bx-radio-circle'></i>") {
            e.target.classList.add("activeO");
        }

        
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        
    }
};
// ============================================


// =============================================
function playerHasWon() {
    for(const i of winningCombos) {
        let [a, b, c] = i;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }

    return false;
};
// =============================================

// Restart Btn =====================================
restartBtn.addEventListener('click', restartBtnFunc);

function restartBtnFunc() {
    achievText.innerHTML = "";
    restartEl.classList.remove("active");


    spaces.fill(null);

    boxItemEl.forEach((box) => {
        box.innerHTML = '';
        box.classList.remove("activeX");
        box.classList.remove("activeO");
    });

    currentPlayer = X_TEXT;
};
// ===================================================

function restart() {
    restartEl.classList.add("active")
}

restartBtnFunc();
startGame();