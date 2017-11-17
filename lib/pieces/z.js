import Piece from './piece'

class Z extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [0,0],
      [0,1],
      [1,1],
      [1,2],
    ]
    this.colorOffset = 2 * 32
  }
}

export default Z
