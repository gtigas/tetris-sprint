import Square from './pieces/square'
import Piece from './pieces/piece'

class Board {
  constructor(ctx, img, game) {
    this.ctx = ctx
    this.img = img
    this.game = game
    this.grid = []
    this._generateGrid();
    this.currentPiece = null
  }


  draw(lost = false) {
    this._drawGrid();
    if (!lost) {
      this.currentPiece.draw()
      this._showPreview()
    }
    const allSquares = [].concat(...this.grid)
    allSquares.forEach( square => {
      if (square === undefined) return;
      square.draw(lost);
    })
  }

  clearSquares(){
    this._generateGrid();
    this.currentPiece = null;
  }

  hardDrop(){
    while (!this._hitBottomOrPiece(this.currentPiece)) {
      this.currentPiece.move('down')
    }
    this._setPiece()
    if (this._checkGameOver() === 'lost') {
      this.game.lose();
      return
    } else if (this._checkGameOver() === 'won') {
      this.game.won();
      return
    }
    this.draw();
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
    this.game.sendNewPiece();

    this.game.swapped = false;

  }

  _showPreview(){
    const { type, ctx, img, x, rotation } = this.currentPiece
    const previewPiece = new Piece(type, ctx, img, x, rotation)
    while (!this._hitBottomOrPiece(previewPiece)) {
      previewPiece.move('down')
    }
    if (this.currentPiece.y > previewPiece.y) {
      previewPiece.y = this.currentPiece.y
      previewPiece.setBlocks();
    }
    this.ctx.globalAlpha= 0.6
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

  _animateGameOver(i = 20){
    if (i < 0) { return }
    for (var j = 0; j < 10; j++) {
      this.ctx.drawImage(this.img, 0 , 0, 32, 32, j * 32, i * 32, 32, 32)
    }
    setTimeout( () => {
      this._animateGameOver(i - 1)
    }, 30)
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

  _checkGameOver(){
    const blocks = this.currentPiece.blocks
    if (blocks.some( ([col, row]) => this.getSquare([col, row]))){
      this.game.stopTimer()
      this.draw(true)
      this._animateGameOver()
      return 'lost'

    } else if (this.game.clearedLines >= 40) {
      this.game.stopTimer()
      this.draw(true)
      this._animateGameOver()
      return 'won'
    }
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
        this.game.clearedLines++
        this.game.updateLinesRemaining();
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

  _drawGrid(){
    const ctx = this.ctx
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 0.5
    for (var i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(32 * i, 0);
      ctx.lineTo(32 * i, 640);
      ctx.stroke();
    }
    for (var j = 0; j < 20; j++) {
      ctx.beginPath();
      ctx.moveTo(0, 32 * j);
      ctx.lineTo(320, 32 * j);
      ctx.stroke();
    }
  }


}
export default Board
