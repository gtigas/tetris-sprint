import Piece from './piece'

class L extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [1,0],
      [1,1],
      [1,2],
      [0,2],
    ]
    this.colorOffset = 3 * 32
  }
}

export default L
