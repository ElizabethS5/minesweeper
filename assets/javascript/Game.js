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
    this.element = document.createElement("main");
    this.element.classList.add("game");
    this.topDiv = document.createElement("div");
    this.topDiv.classList.add("top");
    this.timerDiv = document.createElement("div");
    this.time = document.createElement("span");
    this.timerDiv.append(this.secs);
    this.topDiv.append(this.timerDiv);
    this.faceDiv = document.createElement("div");
    this.faceDiv.innerHTML = "🙂";
    this.topDiv.append(this.faceDiv);
    this.mineCount = document.createElement("div");
    this.mineCount.append(this.numMines);
    this.topDiv.append(this.mineCount);
    this.parent.append(this.topDiv);
    this.parent.append(this.element);
    console.log(this.numMines);
    this.board = new Board(20, 40, this.numMines);
    this.element.append(this.board.element);
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
    }
    if (this.board.gameLost) {
      this.lost = true;
      this.startTimer = false;
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
      this.timerDiv.innerHTML = this.secs;
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
