class Modal {
  constructor(heading = "test") {
    this.heading = heading;
    this.generate();
  }

  generate() {
    this.element = document.createElement("div");
    this.element.classList.add("modal", "hidden");
    const h2 = document.createElement("h2");
    h2.append(this.heading);

    this.element.append(h2);
    document.body.append(this.element);
  }

  addElement(element) {
    this.element.append(element);
  }
}
