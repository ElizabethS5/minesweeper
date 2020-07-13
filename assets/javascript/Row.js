class Row {
  constructor(index, board) {
    this.index = index;
    this.element = null;
    this.board = board;
    this.generate();
  }
  generate() {
    this.element = document.createElement("div");
    this.element.classList.add("row");
    this.board.element.append(this.element);
  }
}
