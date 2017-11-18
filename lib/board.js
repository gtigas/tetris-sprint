import Square from './pieces/square'

class Board {
  constructor(ctx) {
    this.ctx = ctx
    this.grid = []
    this.currentPiece = null
    this._generateGrid();
  }


  draw() {
    this.currentPiece.draw()
    const allSquares = [].concat(...this.grid)
    allSquares.forEach( square => {
      if (square === undefined) return;
      square.draw();
    })
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
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
    console.log(this.grid)
  }

  _hitBottomOrPiece() {
    return this.currentPiece.blocks.some( (pos) => (
      (this.getSquare(pos)) || (pos[0] + 1 === 20)
    ))
  }

  _validMove(piece, dir){
    switch (dir) {
      case 'left':
        return piece.blocks.every( ([_, row]) => (
          row - 1 >= 0
        ))
        break;
      case 'right':
        return piece.blocks.every( ([_, row]) => (
        row + 1 <= 9
      ))
        break;
      case 'down':
        return piece.blocks.every( ([col, row]) => (
        col + 1 <= 19
      ))
        break;
    }
  }

}
export default Board
