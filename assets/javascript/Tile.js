class Tile {
  constructor(hasMine, rowIndex, colIndex, board) {
    this.hasMine = hasMine;
    this.show = false;
    this.marked = false;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.board = board;
    this.adjacentMines = 0;
    this.adjacentTiles = [];
    this.element = null;
    this.generate();
  }

  generate() {
    this.element = document.createElement("div");
    this.element.classList.add("tile");
    this.element.addEventListener("click", () => this.clickTile());
    this.element.addEventListener("contextmenu", (e) => this.markTile(e));
  }

  markTile(event) {
    event.preventDefault();
    if (this.show) {
      return;
    }
    if (!this.marked) {
      this.marked = true;
      this.element.innerHTML = "🚩";
      this.board.markedCount++;
    } else if (this.element.innerHTML === "🚩") {
      this.element.innerHTML = "❓";
      this.board.markedCount--;
    } else {
      this.marked = false;
      this.element.innerHTML = "";
    }
    // console.log(this.board.markedCount);
  }

  getTileElement() {
    return this.element;
  }

  checkNeighborTile(y, x) {
    if (
      this.rowIndex + y < 0 ||
      this.rowIndex + y >= this.board.rows ||
      this.colIndex + x < 0 ||
      this.colIndex + x >= this.board.columns
    ) {
      return;
    }
    const tile = this.board.tiles[this.rowIndex + y][this.colIndex + x];

    if (tile.hasMine) {
      this.adjacentMines++;
    }
    this.adjacentTiles.push(tile);
  }

  findAdjacentMines() {
    this.checkNeighborTile(0, -1);
    this.checkNeighborTile(+1, -1);
    this.checkNeighborTile(-1, -1);
    this.checkNeighborTile(0, +1);
    this.checkNeighborTile(+1, +1);
    this.checkNeighborTile(-1, +1);
    this.checkNeighborTile(-1, 0);
    this.checkNeighborTile(+1, 0);
  }

  chainExplosions() {
    this.board.tiles
      .flat(1)
      .filter((tile) => tile.hasMine)
      .forEach((tile) => {
        tile.element.classList.add("clicked");
        tile.show = true;
        tile.element.innerText = "💥";
      });
  }

  clickTile() {
    if (this.show || this.gameOver || this.marked) {
      return;
    }
    this.element.classList.add("clicked");
    this.show = true;
    this.findAdjacentMines();
    if (this.hasMine) {
      this.element.innerText = "💣";
      setTimeout(() => {
        this.element.innerText = "💥";
        this.chainExplosions();
      }, 500);

      this.board.gameOver = true;
      this.board.gameLost = true;
      return;
    }
    this.board.clearedTiles++;
    if (!this.adjacentMines) {
      this.adjacentTiles.forEach((tile) => tile.clickTile());
    } else {
      this.element.classList.add(`adj${this.adjacentMines}`);
      this.element.innerText = this.adjacentMines;
    }
    this.board.checkWin();
  }
}
