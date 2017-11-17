class Piece {
  constructor(ctx, img, board) {
    this.ctx = ctx
    this.img = img
    this.board = board
    this.x = 0
    this.y = 0
    this.blocks = []
    this.colorOffset = 0
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockLocations = this._blockLocations.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this.draw();
  }

  move(dir) {
    switch (dir) {
      case 'left': if (this.x > 0) { this.x-- }
        break;
      case 'up': if (this.y > 0) { this.y-- }
        break;
      case 'right': if (this.x < 9) { this.x++ }
        break;
      case 'down': if (this.y < 19) { this.y++ }
        break;
    }
    this.draw()
  }

  draw() {
    const renderCoords = this._blockRenderCoords();
    renderCoords.forEach( block => {
      this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...block, 32, 32)
    })
  }

  _getRenderCoords(){
    return [this.x * 32, this.y * 32]
  }

  _blockLocations(){
    const locations = []
    this.blocks.forEach( loc => {
      let blockLoc = [this.x + loc[1], this.y + loc[0]]
      locations.push(blockLoc)
    });
    return locations
  }

  _blockRenderCoords(){
    return this._blockLocations().map( loc => {
      return [loc[0] * 32, loc[1] * 32]
    })
  }
}

export default Piece
