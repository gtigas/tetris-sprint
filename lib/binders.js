const bindKeys = (game) => {
  let down = false
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 37:
        game.move('left')
        break;
      case 38:
        game.move('up')
        break;
      case 39:
        game.move('right')
        break;
      case 40:
        game.move('down')
        break;
      case 65:
        if (down) return
        down = true
        game.rotate('left')
        break;
      case 83:
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
