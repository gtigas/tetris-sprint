const bindKeys = (game) => {
  let down = false
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 65:
        game.move('left')
        break;
      case 87:
        game.hardDrop()
        break;
      case 68:
        game.move('right')
        break;
      case 83:
        game.move('down')
        break;
      case 39:
        if (down) return
        down = true
        game.rotate('left')
        break;
      case 37:
        if (down) return
        down = true
        game.rotate('right')
        break;
      case 16:
        game.holdPiece();
        break;
    }
  })

  document.addEventListener('keyup', function () {
    down = false;
  }, false);

}

export default bindKeys;
