let isCircleTurn;

function comecoX(){
    const menu = document.querySelector(".menu");
    const board = document.getElementById('board')
    menu.style.visibility = 'hidden';
    board.style.visibility = 'visible';
    board.classList.add('x');
    startGame(board, 'x');
}
function comecoO(){
    const menu = document.querySelector(".menu");
    const board = document.getElementById('board')
    menu.style.visibility = 'hidden';
    board.style.visibility = 'visible';
    board.classList.add('circle');
    startGame(board, 'circle');
}
function winMessage(player){
    const gameOver = document.querySelector('.game-over')
    const finalText = document.getElementById('finalText')
    gameOver.style.visibility = 'visible'
    if (player === 'x'){
        finalText.textContent = `X GANHOU!`
    } else {
        finalText.textContent = `O GANHOU!`
    }
}
function drawMessage() {
    const gameOver = document.querySelector('.game-over')
    const finalText = document.getElementById('finalText')
    gameOver.style.visibility = 'visible'
    finalText.textContent = `DEU VELHA!`
}
function checkWin(player){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const cellElements = document.querySelectorAll('[data-cell]');
    let index = 0;
    let combination = [];
    for (const cellElement of cellElements) {
        if (cellElement.classList.contains(player)){
            combination.push(index)
        }
        index++;
    }
    for (const winningCombination of winningCombinations) {
        if(combination.toString().includes(winningCombination.toString())){
            return true
        }
    }
}
function checkForDraw(){
    const cellElements = document.querySelectorAll('[data-cell]');
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
}
function classBoard(board){
    board.classList.remove("circle");
    board.classList.remove("x");
    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}
function turn(cell, classAdd){
    const board = document.getElementById('board')
    cell.classList.add(classAdd)
    isCircleTurn = !isCircleTurn;
    classBoard(board)
}
function click(cell){
    cell = cell.target;
    const player = isCircleTurn? 'circle':'x'
    turn(cell,player)
    if(checkWin(player)){
        winMessage(player);
    } else if (checkForDraw()) {
        drawMessage()
    }
}
function startGame(board, player){
    isCircleTurn = player !== 'x';
    const cellElements = document.querySelectorAll(".cell");
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove('x');
        cell.addEventListener("click", click, { once: true });
    }
}
function restart(){
    window.location.reload()
    return false;
}