import Board from './board'
import Piece from './pieces/piece'


class Game{
  constructor(ctx, blocks){
    this.board = new Board(ctx, blocks)
    this.ctx = ctx
    this.blocks = blocks
  }

  move(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.rotatePiece(dir)
  }

}

export default Game
