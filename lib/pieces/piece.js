import { PIECE_BLOCK_LOCS, PIECE_COLOR_OFFSETS } from './util'

class Piece {
  constructor(type, ctx, img, x = 3, rot = 48) {
    this.type = type
    this.ctx = ctx
    this.img = img
    this.x = x
    this.y = 0
    this.rotation = rot
    this.blocks = PIECE_BLOCK_LOCS[type][0].map( loc => [this.y + loc[0], this.x + loc[1] ] )
    this.colorOffset = PIECE_COLOR_OFFSETS[type]
    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
    this._blockRenderCoords = this._blockRenderCoords.bind(this)
    this.setBlocks = this.setBlocks.bind(this)
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
