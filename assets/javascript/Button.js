class Button {
  constructor(text) {
    this.text = text;
    this.func = null;
    this.generate();
  }
  generate() {
    this.element = document.createElement("button");
    this.element.classList.add("button");
    this.element.innerHTML = this.text;
  }
  addClickHandler(func) {
    this.element.addEventListener("click", func);
  }
}
