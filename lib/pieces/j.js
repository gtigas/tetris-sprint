import Piece from './piece'

class J extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [0,0],
      [1,0],
      [1,1],
      [1,2],
    ]
    this.colorOffset = 7 * 32
  }
}

export default J
