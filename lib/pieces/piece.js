class Piece {
  constructor(ctx, img) {
    this.ctx = ctx
    this.img = img
    this.x = 0
    this.y = 0
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this.draw();
  }

  move(dir) {
    switch (dir) {
      case 'left':
      this.x--
        break;
      case 'up':
      this.y--
        break;
      case 'right':
      this.x++
        break;
      case 'down':
      this.y++
        break;
    }
    this.draw()
  }

  draw() {
    const renderCoords = this._getRenderCoords();
    this.ctx.drawImage(this.img, 32 , 0, 32, 32, ...renderCoords, 32, 32)
  }

  _getRenderCoords(){
    return [this.x * 32, this.y * 32]
  }
}

export default Piece
