import { PIECE_BLOCK_LOCS, PIECE_COLOR_OFFSETS } from './util'

class Piece {
  constructor(type, ctx, img, board) {
    this.type = type
    this.ctx = ctx
    this.img = img
    this.board = board
    this.x = 0
    this.y = 0
    this.rotation = 0
    this.blocks = PIECE_BLOCK_LOCS[type][0]
    this.colorOffset = PIECE_COLOR_OFFSETS[type]
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockLocations = this._blockLocations.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this._validMove = this._validMove.bind(this)
    this.rotate = this.rotate.bind(this)
    this.draw();
  }

  rotate(dir){
    if (dir === 'left') {
      this.rotation++
      this.blocks = PIECE_BLOCK_LOCS[this.type][Math.abs(this.rotation % 4)]
    } else if (dir === 'right') {
      this.rotation--
      this.blocks = PIECE_BLOCK_LOCS[this.type][Math.abs(this.rotation % 4)]
    }
    this.draw()
  }

  move(dir) {
    switch (dir) {
      case 'left': if (this._validMove('left')) { this.x-- }
        break;
      case 'up': if (this._validMove('up'))  { this.y-- }
        break;
      case 'right': if (this._validMove('right'))  { this.x++ }
        break;
      case 'down': if (this._validMove('down'))  { this.y++ }
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

  _validMove(dir){
    const blockLocations = this._blockLocations();
    switch (dir) {
      case 'left':
        return blockLocations.every( ([row, _]) => (
          row - 1 >= 0
        ))
        break;
      case 'up':
        return blockLocations.every( ([_, col]) => (
        col - 1 >= 0
      ))
        break;
      case 'right':
        return blockLocations.every( ([row, _]) => (
        row + 1 <= 9
      ))
        break;
      case 'down':
        return blockLocations.every( ([_, col]) => (
        col + 1 <= 19
      ))
        break;
    }
  }
}

export default Piece
