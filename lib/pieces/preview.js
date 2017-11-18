import { PIECE_BLOCK_LOCS, PIECE_COLOR_OFFSETS } from './util'

class PreviewPiece {
  constructor(ctx, piece){
    this.ctx = ctx
    this.blocks = PIECE_BLOCK_LOCS[piece.type][0]
    this.img = piece.img
    this.colorOffset = piece.colorOffset
  }

  draw() {
    const renderCoords = this._blockRenderCoords();
    renderCoords.forEach( block => {
      this.ctx.drawImage(this.img, this.colorOffset , 0, 32, 32, ...block, 32, 32)
    })
  }

  _blockRenderCoords(){
    return this.blocks.map( loc => {
      return [loc[1] * 32, loc[0] * 32]
    })
  }
}

export default PreviewPiece
