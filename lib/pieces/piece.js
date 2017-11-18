import { PIECE_BLOCK_LOCS, PIECE_COLOR_OFFSETS } from './util'

class Piece {
  constructor(type, ctx, img, board) {
    this.type = type
    this.ctx = ctx
    this.img = img
    this.board = board
    this.x = 3
    this.y = 0
    this.rotation = 0
    this.blocks = PIECE_BLOCK_LOCS[type][0].map( loc => [this.y + loc[0], this.x + loc[1] ] )
    this.colorOffset = PIECE_COLOR_OFFSETS[type]
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this._invalidRotation = this._invalidRotation.bind(this)
    this.rotate = this.rotate.bind(this)
    this.setBlocks = this.setBlocks.bind(this)
  }

  rotate(dir){
    if (dir === 'left') {
      this.rotation++
      this.setBlocks();
      if (this._invalidRotation()) {
        this.rotation--
        this.setBlocks();
      }
    } else if (dir === 'right') {
      this.rotation--
      this.setBlocks();
      if (this._invalidRotation()) {
        this.rotation++
        this.setBlocks();
      }
    }
  }

  move(dir) {
    switch (dir) {
      case 'left': { this.x-- }
        break;
      case 'up': { this.y-- }
        break;
      case 'right': { this.x++ }
        break;
      case 'down': { this.y++ }
        break;
    }
    this.setBlocks();
  }

  draw() {
    const renderCoords = this._blockRenderCoords();
    renderCoords.forEach( block => {
      this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...block, 32, 32)
    })
  }

  _invalidRotation(){
    const inBounds = this.blocks.every( ([row, col]) => (
      (row >= -1) && (row <= 10)
    ))
    if (!inBounds) return true;
    if (this.blocks.some( ([row,_]) => row === -1)) {
      this.x++
    } else if (this.blocks.some( ([row,_]) => row === 10)) {
      this.x--
    }
    return false
  }

  setBlocks(){
    this.blocks = PIECE_BLOCK_LOCS[this.type]
                          [Math.abs(this.rotation % 4)]
                          .map( loc => [this.y + loc[0], this.x + loc[1] ])
  }

  _getRenderCoords(){
    return [this.x * 32, this.y * 32]
  }


  _blockRenderCoords(){
    return this.blocks.map( loc => {
      return [loc[1] * 32, loc[0] * 32]
    })
  }

}

export default Piece
