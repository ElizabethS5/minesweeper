class Board {
  constructor(rows = 25, columns = 40, numMines = 100) {
    this.gameOver = false;
    this.gameWin = false;
    this.gameLost;
    this.numMines = numMines;
    this.markedCount = 0;
    this.rows = rows;
    this.columns = columns;
    this.array = [];
    this.tiles = [];
    this.clearedTiles = 0;
    this.needToCLear = rows * columns - numMines;
    this.fillArray();
    this.element = null;
    this.generate();
  }

  checkWin() {
    this.gameOver = this.clearedTiles === this.needToCLear;
    this.gameWin = this.clearedTiles === this.needToCLear && !this.gameLost;
  }

  fillArray() {
    const randomNumbers = this.getRandomNums();
    let currentTileNum = 1;
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      this.array.push(row);
      for (let j = 0; j < this.columns; j++) {
        if (randomNumbers.includes(currentTileNum)) {
          row.push(true);
        } else {
          row.push(false);
        }
        currentTileNum++;
      }
    }
    console.log(this.array);
  }

  getRandomNums() {
    const aSet = new Set();
    const numTiles = this.rows * this.columns;
    while (aSet.size < this.numMines) {
      aSet.add(Math.floor(Math.random() * numTiles));
    }
    return [...aSet];
  }

  generate() {
    this.element = document.createElement("div");
    this.element.classList.add("board");
    this.array.forEach((row, i) => {
      const currentRow = new Row(i, this);
      const arr = [];
      this.tiles.push(arr);
      row.forEach((val, j) => {
        const currentTile = new Tile(val, i, j, this);
        arr.push(currentTile);
        currentRow.element.append(currentTile.element);
      });
    });
  }
}
