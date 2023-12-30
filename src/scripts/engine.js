const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeHearts: document.querySelector("#life-hearts"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 5, // in seconds
        lifeHearts: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTImerId: setInterval(countDown, 1000),
    }
};

function endGame () {
    playSound("end-game");
    alert("Game Over! Your Score: " + state.values.result + ". \nClick [OK] to restart the game!");
    location.reload();
}

function countDown () {
    state.values.currentTime --;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTImerId);
        clearInterval(state.actions.timerId);
        endGame();
    }
}

function playSound (audioName) {
    let audio = new Audio(`./src/audios/${audioName}.wav`);
    audio.volume = 0.3;  // >>> this property changes the volume
    audio.play();
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox () {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else if (square.id != state.values.hitPosition) {
                playSound("damage-taken");
                state.values.lifeHearts --;
                state.view.lifeHearts.textContent = state.values.lifeHearts;
                if (state.values.lifeHearts <= 0) {
                    endGame();
                }
            }
        })
    })
}

function initialize () {
    addListenerHitBox();
}

initialize();