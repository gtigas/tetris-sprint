const bindKeys = (piece) => {
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 37:
      piece.move('left')
      break;
      case 38:
      piece.move('up')
      break;
      case 39:
      piece.move('right')
      break;
      case 40:
      piece.move('down')
      break;
    }
  })
}

export default bindKeys;
