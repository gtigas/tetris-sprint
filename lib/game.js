import Board from './board'
import Piece from './pieces/piece'
import PreviewPiece from './pieces/preview'
import { bindKeys } from './binders'


class Game{
  constructor(ctx, blocks){
    this.board = new Board(ctx.game, blocks, this)
    this.clearedLines = 0
    this.pieceQueue = []
    this.ctx = ctx
    this.blocks = blocks
    this.heldPiece = null
    this.swapped = false
    this._fillPieceQueue();
    this.updateLinesRemaining();
  }

  restart(){
    clearInterval(this.tick)
    this.unbindKeys()
    this.keysBound = false
    this.ctx.game.clearRect(0,0, 320, 640)
    this.ctx.hold.clearRect(0,0, 320, 640)
    this.clearedLines = 0
    this.pieceQueue = []
    this._fillPieceQueue();
    this.updateLinesRemaining();
    this.stopTimer();
    this.heldPiece = null
    this.board.clearSquares();
    this.sendNewPiece();
    document.getElementById('timer').innerHTML = '0.0s'
    this.play()
  }

  play(){
    this._countdownTimer();
    this._drawPreview();
    setTimeout( () => {
      this.ctx.game.clearRect(0, 200, 640, 300)
      if (!this.keysBound) {
        if (this.unbindKeys) { this.unbindKeys() }
        this.unbindKeys = bindKeys(this);
        this.keysBound = true
      }
      this.stopTimer = this._drawTimer();
      this.sendNewPiece();
      this.board.draw();
      this.tick = setInterval( ()=> {
        this.move('down')
      }, 1500)
    }, 4000)
  }

  lose(){
    clearInterval(this.tick)
    alert('you lose')
  }

  won(){
    clearInterval(this.tick)
    alert('you win')
  }

  move(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.movePiece(dir)
  }

  rotate(dir){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.rotatePiece(dir)
  }

  hardDrop(){
    this.ctx.game.clearRect(0,0, 320, 640)
    this.board.hardDrop()
  }

  holdPiece(){
    if (!this.swapped) {
      if (this.heldPiece) {
        const piece = this.heldPiece
        this.heldPiece = this.currentPiece
        this.currentPiece = piece
        this._resetPositions();
        this.board.currentPiece = this.currentPiece
      } else {
        this.heldPiece = this.currentPiece
        this.sendNewPiece();
      }
      this.ctx.game.clearRect(0,0, 320, 640)
      this.board.draw();
      this._drawHeldPiece();
      this.swapped = true;
    }
  }

  sendNewPiece(arg){
    this.currentPiece = this.pieceQueue.shift()
    this.board.currentPiece = this.currentPiece
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

  _countdownTimer(i = 3){
    if (i === 0) {
      setTimeout( () => {
        this.ctx.game.fillStyle = "black"
        this.ctx.game.fillRect(0, 200, 640, 100)
        this.ctx.game.fillStyle = "yellow"
        this.ctx.game.font = "60px Sarpanch"
        this.ctx.game.fillText('Start!', 75,270)
      }, 1000)
      return
    } else if (i === 3) {
      this._drawCountdown(i)
      i--
      this._countdownTimer(i)
    } else {
      setTimeout( () => {
        this._drawCountdown(i)
        i--
        this._countdownTimer(i)
      }, 1000)
    }
  }

  _drawCountdown(i){
    this.ctx.game.fillStyle = "black"
    this.ctx.game.fillRect(0, 200, 640, 100)
    this.ctx.game.fillStyle = "yellow"
    this.ctx.game.font = "60px Sarpanch"
    this.ctx.game.fillText(i, 135,270)
  }

  _resetPositions(){
    this.heldPiece.y = 0
    this.currentPiece.y = 0
    this.heldPiece.x = 3
    this.currentPiece.x = 3
    this.currentPiece.rotation = 48
    this.currentPiece.setBlocks();
  }
  _drawHeldPiece(){
    const ctx = this.ctx.hold
    ctx.clearRect(0,0,128,128)
    const held = new PreviewPiece(ctx, this.heldPiece)
    held.draw();
  }

  updateLinesRemaining(){
    document.getElementById('lines-remaining')
                      .innerHTML = Math.max(0, 40 - this.clearedLines)
  }

  _drawTimer(){
    const start = new Date().getTime()
    let elapsed = '0.0'
    const timer = setInterval( () => {
      let time = new Date().getTime() - start
      elapsed = Math.floor(time / 100) / 10
      if (Math.round(elapsed) == elapsed) {
        elapsed += '.0'
      }
      this.time = elapsed
      document.getElementById('timer').innerHTML = elapsed + 's'
    })
    return () => { clearInterval(timer) }
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
    pieces = pieces.map( type => new Piece(type, ctx.game, blocks))
    this.pieceQueue = this.pieceQueue.concat(pieces)
  }
}

export default Game
