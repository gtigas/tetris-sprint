import { PIECE_COLOR_OFFSETS } from './util'

class Square {
  constructor(type, ctx, img, pos){
    this.type = type
    this.ctx = ctx
    this.img = img
    this.pos = pos
    this.colorOffset = PIECE_COLOR_OFFSETS[type]
  }

  draw(lost) {
    const renderPos = [this.pos[1] * 32, this.pos[0] * 32]
    const colorOffset = lost ? 0 : this.colorOffset
    this.ctx.drawImage(this.img, colorOffset , 0, 32, 32, ...renderPos, 32, 32)
  }
}

export default Square;
