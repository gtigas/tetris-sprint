import Board from './board'
import Piece from './pieces/piece'
import PreviewPiece from './pieces/preview'


class Game{
  constructor(ctx, blocks){
    this.board = new Board(ctx.game, blocks, this)
    this.pieceQueue = []
    this.ctx = ctx
    this.blocks = blocks
    this._fillPieceQueue();
    this.sendNewPiece();
    this.board.draw();
  }

  move(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.rotatePiece(dir)
  }

  sendNewPiece(){
    this.board.addPiece(this.pieceQueue.shift())
    if (this.pieceQueue.length < 3) {
      this._fillPieceQueue();
    }
    this._drawPreview();
  }

  _drawPreview(){
    const ctx1 = this.ctx.preview1
    ctx1.clearRect(0,0,128,128)
    const first = new PreviewPiece(ctx1, this.pieceQueue[0])
    const ctx2 = this.ctx.preview2
    ctx2.clearRect(0,0,128,128)
    const second = new PreviewPiece(ctx2, this.pieceQueue[1])
    const ctx3 = this.ctx.preview3
    ctx3.clearRect(0,0,128,128)
    const third = new PreviewPiece(ctx3, this.pieceQueue[2])
    first.draw();
    second.draw();
    third.draw();
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
    pieces = pieces.map( type => new Piece(type, ctx.game, blocks, this))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}

export default Game
