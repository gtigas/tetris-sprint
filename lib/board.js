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
      let square = new Square(type, ctx, img, blockPos)
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
    pieces = pieces.map( type => new Piece(type, ctx, img, this))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}
export default Board
