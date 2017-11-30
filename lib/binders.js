export const bindKeys = (game) => {
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
      }
    }
  }

  document.removeEventListener("keydown", configs["1"])
  document.removeEventListener("keydown", configs["2"])
  let currentConfig = configs[$("input[name='config']:checked").val()]
  setControlText($("input[name='config']:checked").val())
  document.addEventListener("keydown", currentConfig)
  $(".close-controls").off("click")
  $(".close-controls").on("click", () => {
    document.removeEventListener("keydown", currentConfig)
    currentConfig = configs[$("input[name='config']:checked").val()]
    document.addEventListener("keydown", currentConfig)
    setControlText($("input[name='config']:checked").val())
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

export function setControlText(config) {
  const controls = configsText[config]
  Object.keys(controls).forEach( key => {
    document.getElementById(key).innerHTML = controls[key]
  })
}

export const setRestart = (game) => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 82) {
      game.restart();
    }
  })
}

const configsText = {
  "1" : {
    "left": "A",
    "right": "D",
    "down": "S",
    "hard": "W",
    "rot-left": "Left-Arrow",
    "rot-right": "Right-Arrow",
    "piece-hold": "Shift",
    "restart": "R",
  },
  "2" : {
    "left": "Left-Arrow",
    "right": "Right-Arrow",
    "down": "Down-Arrow",
    "hard": "Spacebar",
    "rot-left": "Z",
    "rot-right": "X",
    "piece-hold": "C",
    "restart": "R",
  },
}
