import Board from './board'
import Piece from './pieces/piece'


class Game{
  constructor(ctx, blocks){
    this.board = new Board(ctx, blocks, this)
    this.pieceQueue = []
    this.ctx = ctx
    this.blocks = blocks
    this._fillPieceQueue();
    this.sendNewPiece();
    this.board.draw();
  }

  move(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.clearRect(0,0, 320, 640)
    this.board.rotatePiece(dir)
  }

  sendNewPiece(){
    this.board.addPiece(this.pieceQueue.shift())
    if (this.pieceQueue.length < 3) {
      this._fillPieceQueue();
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
    const { ctx, blocks } = this
    pieces = pieces.map( type => new Piece(type, ctx, blocks, this))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}

export default Game
