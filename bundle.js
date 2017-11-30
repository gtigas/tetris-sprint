/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PIECE_COLOR_OFFSETS = {
  "I": 6 * 32,
  "J": 7 * 32,
  "L": 3 * 32,
  "O": 4 * 32,
  "S": 5 * 32,
  "Z": 2 * 32,
  "T": 8 * 32,
}
/* harmony export (immutable) */ __webpack_exports__["b"] = PIECE_COLOR_OFFSETS;


const PIECE_BLOCK_LOCS = {
  "I": [
  [  [0,0],[0,1],[0,2],[0,3] ],
  [  [0,2],[1,2],[2,2],[3,2] ],
  [  [1,0],[1,1],[1,2],[1,3] ],
  [  [0,1],[1,1],[2,1],[3,1] ]
  ],
  "J": [
    [[0,0],[1,0], [1,1],[1,2]],
    [[0,1],[0,2], [1,1],[2,1]],
    [[1,0],[1,1], [1,2],[2,2]],
    [[2,0],[0,1], [1,1],[2,1]]
  ],
  "L": [
    [[1,0], [1,1],[1,2],[0,2]],
    [[0,1], [1,1],[2,1],[2,2]],
    [[2,0], [1,0],[1,1],[1,2]],
    [[0,0], [0,1],[1,1],[2,1]]
  ],
  "O": [
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]]
  ],
  "S": [
    [[0,1],[0,2],[1,0],[1,1]],
    [[0,1],[1,1],[1,2],[2,2]],
    [[1,1],[1,2],[2,0],[2,1]],
    [[0,0],[1,0],[1,1],[2,1]]
  ],
  "Z": [
    [[0,0],[0,1],[1,1],[1,2]],
    [[0,2],[1,2],[1,1],[2,1]],
    [[1,0],[1,1],[2,1],[2,2]],
    [[0,1],[1,0],[1,1],[2,0]]
  ],
  "T": [
    [[0,1],[1,0],[1,1], [1,2]],
    [[0,1],[1,1],[2,1], [1,2]],
    [[1,0],[1,1],[1,2], [2,1]],
    [[1,0],[0,1],[1,1], [2,1]],
  ],
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PIECE_BLOCK_LOCS;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Piece {
  constructor(type, ctx, img, x = 3, rot = 48) {
    this.type = type
    this.ctx = ctx
    this.img = img
    this.x = x
    this.y = 0
    this.rotation = rot
    this.blocks = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* PIECE_BLOCK_LOCS */][type][0].map( loc => [this.y + loc[0], this.x + loc[1] ] )
    this.colorOffset = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* PIECE_COLOR_OFFSETS */][type]
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this.setBlocks = this.setBlocks.bind(this)
  }

  move(dir) {
    switch (dir) {
      case 'left': { this.x-- }
        break;
      case 'up': { this.y-- }
        break;
      case 'right': { this.x++ }
        break;
      case 'down': { this.y++ }
        break;
    }
    this.setBlocks();
  }

  draw() {
    const renderCoords = this._blockRenderCoords();
    renderCoords.forEach( block => {
      this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...block, 32, 32)
    })
  }


  setBlocks(){
    this.blocks = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* PIECE_BLOCK_LOCS */][this.type]
                          [Math.abs(this.rotation % 4)]
                          .map( loc => [this.y + loc[0], this.x + loc[1] ])
  }

  _getRenderCoords(){
    return [this.x * 32, this.y * 32]
  }


  _blockRenderCoords(){
    return this.blocks.map( loc => {
      return [loc[1] * 32, loc[0] * 32]
    })
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pieces_square__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(1);



class Board {
  constructor(ctx, img, game) {
    this.ctx = ctx
    this.img = img
    this.game = game
    this.grid = []
    this._generateGrid();
    this.currentPiece = null
  }


  draw(lost = false) {
    this._drawGrid();
    if (!lost) {
      this.currentPiece.draw()
      this._showPreview()
    }
    const allSquares = [].concat(...this.grid)
    allSquares.forEach( square => {
      if (square === undefined) return;
      square.draw(lost);
    })
  }

  clearSquares(){
    this._generateGrid();
    this.currentPiece = null;
  }

  hardDrop(){
    while (!this._hitBottomOrPiece(this.currentPiece)) {
      this.currentPiece.move('down')
    }
    this._setPiece()
    if (this._checkGameOver() === 'lost') {
      this.game.lose();
      return
    } else if (this._checkGameOver() === 'won') {
      this.game.won();
      return
    }
    this.draw();
  }


  movePiece(dir){
    switch (dir) {
      case 'left': if (this._validMove(this.currentPiece, 'left')) { this.currentPiece.move('left') }
        break;
      case 'up': if (this._validMove(this.currentPiece, 'up'))  { this.currentPiece.move('up') }
        break;
      case 'right': if (this._validMove(this.currentPiece, 'right'))  { this.currentPiece.move('right')}
        break;
      case 'down':
        if (this._hitBottomOrPiece(this.currentPiece)) {
          this._setPiece()
        } else if (this._validMove(this.currentPiece, 'down'))  {
          this.currentPiece.move('down')
        }
        break;
      }
    this.draw();
  }

  rotatePiece(dir){
    const piece = this.currentPiece
    if (dir === 'left') {
      piece.rotation++
      piece.setBlocks();
      if (this._invalidRotation()) {
        piece.rotation--
        piece.setBlocks();
      }
    } else if (dir === 'right') {
      piece.rotation--
      piece.setBlocks();
      if (this._invalidRotation()) {
        piece.rotation++
        piece.setBlocks();
      }
    }
    this.draw();
  }

  getSquare([x,y]){
    return this.grid[x][y]
  }

  setSquare([x,y], mark){
    this.grid[x][y] = mark
  }

  _setPiece(){
    const { type, ctx, img } = this.currentPiece
    this.currentPiece.blocks.forEach( blockPos => {
      let square = new __WEBPACK_IMPORTED_MODULE_0__pieces_square__["a" /* default */](type, ctx, img, blockPos)
      this.setSquare(blockPos, square)
    });
    this._clearLines();
    this.game.sendNewPiece();

    this.game.swapped = false;

  }

  _showPreview(){
    const { type, ctx, img, x, rotation } = this.currentPiece
    const previewPiece = new __WEBPACK_IMPORTED_MODULE_1__pieces_piece__["a" /* default */](type, ctx, img, x, rotation)
    while (!this._hitBottomOrPiece(previewPiece)) {
      previewPiece.move('down')
    }
    if (this.currentPiece.y > previewPiece.y) {
      previewPiece.y = this.currentPiece.y
      previewPiece.setBlocks();
    }
    this.ctx.globalAlpha= 0.6
    previewPiece.draw()
    this.ctx.globalAlpha= 1
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
  }

  _hitBottomOrPiece(piece) {
    return piece.blocks.some( ([col,row]) => (
      (col + 1 === 20) || (this.getSquare([col + 1, row]))
    ))
  }

  _animateGameOver(i = 20){
    if (i < 0) { return }
    for (var j = 0; j < 10; j++) {
      this.ctx.drawImage(this.img, 0 , 0, 32, 32, j * 32, i * 32, 32, 32)
    }
    setTimeout( () => {
      this._animateGameOver(i - 1)
    }, 30)
  }

  _invalidRotation(){
    const blocks = this.currentPiece.blocks
    const inBounds = blocks.every( ([col, row]) => (
      (row >= -1) && (row <= 10) && (!this.getSquare([col, row]))
    ))
    if (!inBounds) return true;
    if (blocks.some( ([_,row]) => row === -1)) {
      this.currentPiece.x++
    } else if (blocks.some( ([_,row]) => row === 10)) {
      this.currentPiece.x--
    }
    return false
  }

  _checkGameOver(){
    const blocks = this.currentPiece.blocks
    if (blocks.some( ([col, row]) => this.getSquare([col, row]))){
      this.game.stopTimer()
      this.draw(true)
      this._animateGameOver()
      return 'lost'

    } else if (this.game.clearedLines >= 40) {
      this.game.stopTimer()
      this.draw(true)
      this._animateGameOver()
      return 'won'
    }
  }

  _validMove(piece, dir){
    switch (dir) {
      case 'left':
        return piece.blocks.every( ([col, row]) => (
          (row - 1 >= 0) && (!this.getSquare([col, row - 1]))
        ))
        break;
      case 'right':
        return piece.blocks.every( ([col, row]) => (
        row + 1 <= 9 && (!this.getSquare([col, row + 1]))
      ))
        break;
      case 'down':
        return piece.blocks.every( ([col, row]) => (
        col + 1 <= 19
      ))
        break;
    }
  }

  _clearLines(){
    this.grid.forEach( (row, idx)  => {
      if (this._fullRow(row)) {
        for (let i = 0; i < idx; i++) {
          this._shiftSquaresDown(this.grid[i])
        }
        this.grid.splice(idx , 1)
        this.grid.unshift(new Array(10))
        this.game.clearedLines++
        this.game.updateLinesRemaining();
      }
    });
  }

  _shiftSquaresDown(row){
    row.forEach( square => square.pos[0]++)
  }

  _fullRow(row) {
    let fullRow = true
    for (let i = 0; i < row.length; i++) {
      if (row[i] === undefined) fullRow = false
    }
    return fullRow
  }

  _drawGrid(){
    const ctx = this.ctx
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 0.5
    for (var i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(32 * i, 0);
      ctx.lineTo(32 * i, 640);
      ctx.stroke();
    }
    for (var j = 0; j < 20; j++) {
      ctx.beginPath();
      ctx.moveTo(0, 32 * j);
      ctx.lineTo(320, 32 * j);
      ctx.stroke();
    }
  }


}
/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setControlText;
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
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 82) {
        game.restart();
      }
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = bindKeys;


function setControlText(config) {
  const controls = configsText[config]
  Object.keys(controls).forEach( key => {
    document.getElementById(key).innerHTML = controls[key]
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__binders__ = __webpack_require__(3);






document.addEventListener("DOMContentLoaded", () =>{
  const game = document.getElementById("game");
  const hold = document.getElementById("hold");
  const preview1 = document.getElementById("preview1");
  const preview2 = document.getElementById("preview2");
  const preview3 = document.getElementById("preview3");
  const ctx = {};

  ctx.game = game.getContext("2d");
  ctx.hold = hold.getContext("2d");
  ctx.preview1 = preview1.getContext("2d");
  ctx.preview2 = preview2.getContext("2d");
  ctx.preview3 = preview3.getContext("2d");
  const blocks = new Image();
  blocks.src = "assets/images/blocks.png"
  blocks.onload = () => {
    const game = new __WEBPACK_IMPORTED_MODULE_2__game__["a" /* default */](ctx, blocks)
    game.play()
  }
  $(".radio-box").click((e) => {
    let config;
    if (e.target.innerText.includes("1")) {
      config = "1"
    } else {
      config = "2"
    }
    Object(__WEBPACK_IMPORTED_MODULE_3__binders__["b" /* setControlText */])(config)
  })
  $(".open-controls").on("click", () => {
    $(".controls").toggleClass("hidden")
  })

});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Square {
  constructor(type, ctx, img, pos){
    this.type = type
    this.ctx = ctx
    this.img = img
    this.pos = pos
    this.colorOffset = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* PIECE_COLOR_OFFSETS */][type]
  }

  draw(lost) {
    const renderPos = [this.pos[1] * 32, this.pos[0] * 32]
    const colorOffset = lost ? 0 : this.colorOffset
    this.ctx.drawImage(this.img, colorOffset , 0, 32, 32, ...renderPos, 32, 32)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pieces_preview__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__binders__ = __webpack_require__(3);






class Game{
  constructor(ctx, blocks){
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](ctx.game, blocks, this)
    this.clearedLines = 0
    this.pieceQueue = []
    this.ctx = ctx
    this.blocks = blocks
    this.heldPiece = null
    this.swapped = false
    this._fillPieceQueue();
    this.updateLinesRemaining();
  }

  restart(){
    clearInterval(this.tick)
    this.unbindKeys()
    this.keysBound = false
    this.ctx.game.clearRect(0,0, 320, 640)
    this.ctx.hold.clearRect(0,0, 320, 640)
    this.clearedLines = 0
    this.pieceQueue = []
    this._fillPieceQueue();
    this.updateLinesRemaining();
    this.stopTimer();
    this.heldPiece = null
    this.board.clearSquares();
    this.sendNewPiece();
    document.getElementById('timer').innerHTML = '0.0s'
    this.play()
  }

  play(){
    this._countdownTimer();
    this._drawPreview();
    setTimeout( () => {
      this.ctx.game.clearRect(0, 200, 640, 300)
      if (!this.keysBound) {
        if (this.unbindKeys) { this.unbindKeys() }
        this.unbindKeys = Object(__WEBPACK_IMPORTED_MODULE_3__binders__["a" /* bindKeys */])(this);
        this.keysBound = true
      }
      this.stopTimer = this._drawTimer();
      this.sendNewPiece();
      this.board.draw();
      this.tick = setInterval( ()=> {
        this.move('down')
      }, 1500)
    }, 4000)
  }

  lose(){
    clearInterval(this.tick)
    this.unbindKeys()
    this.keysBound = false
  }

  won(){
    clearInterval(this.tick)
    this.unbindKeys()
    this.keysBound = false
  }

  move(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.rotatePiece(dir)
  }

  hardDrop(){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.hardDrop()
  }

  holdPiece(){
    if (!this.swapped) {
      if (this.heldPiece) {
        const piece = this.heldPiece
        this.heldPiece = this.currentPiece
        this.currentPiece = piece
        this._resetPositions();
        this.board.currentPiece = this.currentPiece
      } else {
        this.heldPiece = this.currentPiece
        this.sendNewPiece();
      }
      this.ctx.game.clearRect(0,0, 320, 640)
      this.board.draw();
      this._drawHeldPiece();
      this.swapped = true;
    }
  }

  sendNewPiece(arg){
    this.currentPiece = this.pieceQueue.shift()
    this.board.currentPiece = this.currentPiece
    if (this.pieceQueue.length < 3) {
      this._fillPieceQueue();
    }
    this._drawPreview();
  }

  _drawPreview(){
    const ctx1 = this.ctx.preview1
    ctx1.clearRect(0,0,128,128)
    const first = new __WEBPACK_IMPORTED_MODULE_2__pieces_preview__["a" /* default */](ctx1, this.pieceQueue[0])
    const ctx2 = this.ctx.preview2
    ctx2.clearRect(0,0,128,128)
    const second = new __WEBPACK_IMPORTED_MODULE_2__pieces_preview__["a" /* default */](ctx2, this.pieceQueue[1])
    const ctx3 = this.ctx.preview3
    ctx3.clearRect(0,0,128,128)
    const third = new __WEBPACK_IMPORTED_MODULE_2__pieces_preview__["a" /* default */](ctx3, this.pieceQueue[2])
    first.draw();
    second.draw();
    third.draw();
  }

  _countdownTimer(i = 3){
    if (i === 0) {
      setTimeout( () => {
        this.ctx.game.fillStyle = "black"
        this.ctx.game.fillRect(0, 200, 640, 100)
        this.ctx.game.fillStyle = "yellow"
        this.ctx.game.font = "60px Sarpanch"
        this.ctx.game.fillText('Start!', 75,270)
      }, 1000)
      return
    } else if (i === 3) {
      this._drawCountdown(i)
      i--
      this._countdownTimer(i)
    } else {
      setTimeout( () => {
        this._drawCountdown(i)
        i--
        this._countdownTimer(i)
      }, 1000)
    }
  }

  _drawCountdown(i){
    this.ctx.game.fillStyle = "black"
    this.ctx.game.fillRect(0, 200, 640, 100)
    this.ctx.game.fillStyle = "yellow"
    this.ctx.game.font = "60px Sarpanch"
    this.ctx.game.fillText(i, 135,270)
  }

  _resetPositions(){
    this.heldPiece.y = 0
    this.currentPiece.y = 0
    this.heldPiece.x = 3
    this.currentPiece.x = 3
    this.currentPiece.rotation = 48
    this.currentPiece.setBlocks();
  }
  _drawHeldPiece(){
    const ctx = this.ctx.hold
    ctx.clearRect(0,0,128,128)
    const held = new __WEBPACK_IMPORTED_MODULE_2__pieces_preview__["a" /* default */](ctx, this.heldPiece)
    held.draw();
  }

  updateLinesRemaining(){
    document.getElementById('lines-remaining')
                      .innerHTML = Math.max(0, 40 - this.clearedLines)
  }

  _drawTimer(){
    const start = new Date().getTime()
    let elapsed = '0.0'
    const timer = setInterval( () => {
      let time = new Date().getTime() - start
      elapsed = Math.floor(time / 100) / 10
      if (Math.round(elapsed) == elapsed) {
        elapsed += '.0'
      }
      this.time = elapsed
      document.getElementById('timer').innerHTML = elapsed + 's'
    })
    return () => { clearInterval(timer) }
  }

  _fillPieceQueue(){
    let pieces = ['I', 'J', 'L', 'O', 'S', 'Z', 'T']
    for (var i = 0; i < pieces.length - 1; i++) {
      let randIdx = Math.floor(Math.random() * (pieces.length -1))
      let temp = pieces[randIdx]
      pieces[randIdx] = pieces[i]
      pieces[i] = temp
    }
    const { ctx, blocks } = this
    pieces = pieces.map( type => new __WEBPACK_IMPORTED_MODULE_1__pieces_piece__["a" /* default */](type, ctx.game, blocks))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class PreviewPiece {
  constructor(ctx, piece){
    this.ctx = ctx
    this.blocks = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* PIECE_BLOCK_LOCS */][piece.type][0]
    this.img = piece.img
    this.colorOffset = piece.colorOffset
  }

  draw() {
    const renderCoords = this._blockRenderCoords();
    renderCoords.forEach( block => {
      this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...block, 32, 32)
    })
  }

  _blockRenderCoords(){
    return this.blocks.map( loc => {
      return [loc[1] * 32, loc[0] * 32]
    })
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PreviewPiece);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map