const bindKeys = (game) => {
  let down = false
  const configs = {
    "2" : (e) => {
      switch (e.keyCode) {
        case 37:
          game.move('left')
          break;
        case 32:
          game.hardDrop()
          break;
        case 39:
          game.move('right')
          break;
        case 40:
          game.move('down')
          break;
        case 90:
          if (down) return
          down = true
          game.rotate('left')
          break;
        case 88:
          if (down) return
          down = true
          game.rotate('right')
          break;
        case 67:
          game.holdPiece();
          break;
        case 82:
          game.restart();
          break;
      }
    },
    "1": (e) => {
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
        case 82:
          game.restart();
          break;
      }
    }
  }

  document.removeEventListener("keydown", configs["1"])
  document.removeEventListener("keydown", configs["2"])
  let currentConfig = configs[$("input[name='config']:checked").val()]
  document.addEventListener("keydown", currentConfig)
  $(".close-controls").off("click")
  $(".close-controls").on("click", () => {
    document.removeEventListener("keydown", currentConfig)
    currentConfig = configs[$("input[name='config']:checked").val()]
    document.addEventListener("keydown", currentConfig)
    $(".controls").addClass("hidden")
  })
  document.addEventListener('keyup', function () {
    down = false;
  }, false);
  return () => {
    document.removeEventListener("keydown", configs["1"])
    document.removeEventListener("keydown", configs["2"])
  }
}


export default bindKeys;
