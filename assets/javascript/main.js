const startModal = new Modal("WELCOME TO MINESWEEPER");

const startButton = new Button("Start Game");
startButton.addClickHandler((e) => {
  new Game();
  startModal.element.remove();
});

startModal.addElement(startButton.element);
// new Game();
