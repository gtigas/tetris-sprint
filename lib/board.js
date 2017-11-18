import Square from './pieces/square'
import Piece from './pieces/piece'

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
    this._showPreview()
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
      let square = new Square(type, ctx, img, blockPos)
      this.setSquare(blockPos, square)
    });
    this._clearLines();
    this.currentPiece = this.pieceQueue.shift();
    if (this.pieceQueue.length < 3) {
      this._fillPieceQueue();
    }
  }

  _showPreview(){
    const { type, ctx, img, x, rotation } = this.currentPiece
    const previewPiece = new Piece(type, ctx, img, this, x, rotation)
    while (!this._hitBottomOrPiece(previewPiece)) {
      previewPiece.move('down')
    }
    this.ctx.globalAlpha= 0.5
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

  _fillPieceQueue(){
    let pieces = ['I', 'J', 'L', 'O', 'S', 'Z', 'T']
    for (var i = 0; i < pieces.length - 1; i++) {
      let randIdx = Math.floor(Math.random() * (pieces.length -1))
      let temp = pieces[randIdx]
      pieces[randIdx] = pieces[i]
      pieces[i] = temp
    }
    const { ctx, img } = this
    pieces = pieces.map( type => new Piece(type, ctx, img, this))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}
export default Board
