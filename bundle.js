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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__binders__ = __webpack_require__(2);





document.addEventListener("DOMContentLoaded", () =>{
  const c = document.getElementById("myCanvas");
  const ctx = c.getContext("2d");
  const blocks = new Image();
  blocks.src = "assets/images/blocks.png"
  blocks.onload = () => {
    const game = new __WEBPACK_IMPORTED_MODULE_2__game__["a" /* default */](ctx, blocks)
    Object(__WEBPACK_IMPORTED_MODULE_3__binders__["a" /* default */])(game);
  }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pieces_square__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(3);



class Board {
  constructor(ctx, img) {
    this.ctx = ctx
    this.img = img
    this.grid = []
    this.pieceQueue = []
    this._generateGrid();
    this._fillPieceQueue();
    this.currentPiece = this.pieceQueue.shift()
    this.draw();
  }


  draw() {
    this.currentPiece.draw()
    const allSquares = [].concat(...this.grid)
    allSquares.forEach( square => {
      if (square === undefined) return;
      square.draw();
    })
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
        if (this._hitBottomOrPiece()) {
          this._setPiece()
        } else if (this._validMove(this.currentPiece, 'down'))  {
          this.currentPiece.move('down')
        }
        break;
      }
    this.draw();
  }

  rotatePiece(dir){

  }

  addPiece(piece){
    this.currentPiece = piece
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
    this.currentPiece = this.pieceQueue.shift();
    if (this.pieceQueue.length < 3) {
      this._fillPieceQueue();
    }
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
  }

  _hitBottomOrPiece() {
    return this.currentPiece.blocks.some( ([col,row]) => (
      (col + 1 === 20) || (this.getSquare([col + 1, row]))
    ))
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

  _fillPieceQueue(){
    let pieces = ['I', 'J', 'L', 'O', 'S', 'Z', 'T']
    for (var i = 0; i < pieces.length - 1; i++) {
      let randIdx = Math.floor(Math.random() * (pieces.length -1))
      let temp = pieces[randIdx]
      pieces[randIdx] = pieces[i]
      pieces[i] = temp
    }
    const { ctx, img } = this
    pieces = pieces.map( type => new __WEBPACK_IMPORTED_MODULE_1__pieces_piece__["a" /* default */](type, ctx, img, this))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    }
  })

  document.addEventListener('keyup', function () {
    down = false;
  }, false);

}

/* harmony default export */ __webpack_exports__["a"] = (bindKeys);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);


class Piece {
  constructor(type, ctx, img, board) {
    this.type = type
    this.ctx = ctx
    this.img = img
    this.board = board
    this.x = 3
    this.y = 0
    this.rotation = 0
    this.blocks = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* PIECE_BLOCK_LOCS */][type][0].map( loc => [this.y + loc[0], this.x + loc[1] ] )
    this.colorOffset = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* PIECE_COLOR_OFFSETS */][type]
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this._invalidRotation = this._invalidRotation.bind(this)
    this.rotate = this.rotate.bind(this)
    this.setBlocks = this.setBlocks.bind(this)
  }

  rotate(dir){
    if (dir === 'left') {
      this.rotation++
      this.setBlocks();
      if (this._invalidRotation()) {
        this.rotation--
        this.setBlocks();
      }
    } else if (dir === 'right') {
      this.rotation--
      this.setBlocks();
      if (this._invalidRotation()) {
        this.rotation++
        this.setBlocks();
      }
    }
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

  _invalidRotation(){
    const inBounds = this.blocks.every( ([row, col]) => (
      (row >= -1) && (row <= 10)
    ))
    if (!inBounds) return true;
    if (this.blocks.some( ([row,_]) => row === -1)) {
      this.x++
    } else if (this.blocks.some( ([row,_]) => row === 10)) {
      this.x--
    }
    return false
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(3);




class Game{
  constructor(ctx, blocks){
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](ctx, blocks)
    this.ctx = ctx
    this.blocks = blocks
  }

  move(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.currentPiece.rotate(dir)
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
  [  [1,0],[1,1],[1,2],[1,3] ],
  [  [0,2],[1,2],[2,2],[3,2] ],
  [  [2,0],[2,1],[2,2],[2,3] ],
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);


class Square {
  constructor(type, ctx, img, pos){
    this.type = type
    this.ctx = ctx
    this.img = img
    this.pos = pos
    this.colorOffset = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* PIECE_COLOR_OFFSETS */][type]
  }

  draw() {
    const renderPos = [this.pos[1] * 32, this.pos[0] * 32]
    this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...renderPos, 32, 32)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map