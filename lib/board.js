
class Board {
  constructor(ctx) {
    this.ctx = ctx
    this.grid = []
    this.pieces = []
    this.currentPiece = null
    this._generateGrid();
  }


  draw() {
    this.pieces.forEach( piece => {
      piece.draw();
    })
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
  }

  addPiece(piece){
    this.pieces.push(piece)
    this.currentPiece = piece
  }
}
export default Board
