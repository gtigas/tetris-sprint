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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binders__ = __webpack_require__(2);




document.addEventListener("DOMContentLoaded", () =>{
  const c = document.getElementById("myCanvas");
  const ctx = c.getContext("2d");
  const blocks = new Image();
  blocks.src = "assets/images/blocks.png"
  const piece = new __WEBPACK_IMPORTED_MODULE_1__pieces_piece__["a" /* default */](ctx, blocks)
  Object(__WEBPACK_IMPORTED_MODULE_2__binders__["a" /* default */])(piece);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor() {
    this.grid = []
    this._generateGrid();
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
  }
}
/* unused harmony default export */ var _unused_webpack_default_export = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (bindKeys);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
  constructor(ctx, img) {
    this.ctx = ctx
    this.img = img
    this.x = 0
    this.y = 0
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.draw();
  }

  move(dir) {
    switch (dir) {
      case 'left':
      this.x--
        break;
      case 'up':
      this.y--
        break;
      case 'right':
      this.x++
        break;
      case 'down':
      this.y++
        break;
    }
    this.draw()
  }

  draw() {
    const renderCoords = this._getRenderCoords();
    this.ctx.drawImage(this.img, 32 , 0, 32, 32, ...renderCoords, 32, 32)
  }

  _getRenderCoords(){
    return [this.x * 32, this.y * 32]
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map