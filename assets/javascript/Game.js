class Game {
  constructor(parent = document.body, numMines = 100) {
    this.parent = parent;
    this.board = null;
    this.won = false;
    this.lost = false;
    this.over = false;
    this.startTimer = false;
    this.wins = 0;
    this.bestTime = Infinity;
    this.numMines = numMines;
    this.marked = 0;
    this.secs = 0;
    this.generate();
  }

  generate() {
    // new Modal("test", "test");
    this.element = document.createElement("main");
    this.element.classList.add("game");

    this.topDiv = document.createElement("div");
    this.topDiv.classList.add("top");
    this.element.append(this.topDiv);

    this.timerDiv = document.createElement("div");
    this.timerDiv.append("⏱️ ");
    this.time = document.createElement("span");
    this.time.append(this.secs);
    this.timerDiv.append(this.time);

    this.faceDiv = document.createElement("div");
    this.faceDiv.innerHTML = "🙂";

    this.minecountDiv = document.createElement("div");
    this.minecountDiv.append("💣 ");
    this.mineCount = document.createElement("span");
    this.mineCount.append(this.numMines);
    this.minecountDiv.append(this.mineCount);

    this.topDiv.append(this.timerDiv, this.faceDiv, this.minecountDiv);

    this.board = new Board(20, 40, this.numMines);
    this.element.append(this.board.element);
    this.parent.append(this.element);

    this.board.element.addEventListener("mousedown", (e) => this.boardClick(e));
    this.board.element.addEventListener("click", (e) =>
      setTimeout(this.releaseClick(e), 1000)
    );
    this.board.element.addEventListener("contextmenu", (e) => this.markMine(e));
  }

  boardClick(event) {
    event.preventDefault();
    this.faceDiv.innerHTML = "😮";
    if (!this.startTimer) {
      this.startTimer = true;
      this.addSecond();
    }
  }

  checkGame() {
    if (this.board.gameWin) {
      this.won = true;
      this.startTimer = false;
      let winModal = new Modal("You won!");
      if (this.secs < this.bestTime) {
        this.bestTime = this.secs;
        let p = document.createElement("p");
        p.append(
          `New best time of ${this.bestTime} second${
            this.bestTime > 1 ? "s" : ""
          }!`
        );
        winModal.addElement(p);
      }
      let newGameButton = new Button("Start New Game");
      newGameButton.addClickHandler((e) => {
        document.querySelector("main").remove();
        new Game();
        winModal.element.remove();
      });
      winModal.addElement(newGameButton.element);
    } else if (this.board.gameLost) {
      this.lost = true;
      this.startTimer = false;
      let deathModal = new Modal("You died");
      let newGameButton = new Button("Start New Game");
      newGameButton.addClickHandler((e) => {
        document.querySelector("main").remove();
        new Game();
        deathModal.element.remove();
      });
      deathModal.addElement(newGameButton.element);
    }
  }

  markMine(event) {
    event.preventDefault();
    this.marked = this.board.markedCount;
    this.mineCount.innerHTML = this.numMines - this.marked;
    this.releaseClick(event);
  }

  releaseClick(event) {
    event.preventDefault();
    this.checkGame();

    if (this.lost) {
      this.faceDiv.innerHTML = "😵";
    } else if (this.won) {
      this.faceDiv.innerHTML = "😎";
    } else {
      this.faceDiv.innerHTML = "🙂";
    }
    this.mineCount.innerHTML = this.numMines - this.marked;
  }

  addSecond() {
    if (this.startTimer) {
      this.secs++;
      this.time.innerHTML = this.secs;
      setTimeout(() => this.addSecond(), 1000);
    }
  }

  newGame(numMines) {
    this.numMines = numMines;
    this.won = false;
    this.lost = false;
    this.startTimer = false;
    this.marked = 0;
    this.board.element.remove();
    this.board = new Board(10, 10, numMines);
    this.element.append(this.board.element);
  }
}
