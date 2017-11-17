import Board from './board'
import Piece from './pieces/piece'


class Game{
  constructor(ctx, blocks){
    this.board = new Board()
    this.ctx = ctx
    this.blocks = blocks
    this.newPiece = this.newPiece.bind(this)
  }

  move(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.currentPiece.move(dir)
  }

  rotate(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.currentPiece.rotate(dir)
  }

  newPiece(){
    const piece = new Piece('I',this.ctx, this.blocks, this.board)
    this.board.addPiece(piece)
    piece.draw();
  }
}

export default Game
