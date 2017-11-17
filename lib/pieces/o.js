import Piece from './piece'

class O extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [0,0],
      [1,1],
      [0,1],
      [1,0],
    ]
    this.colorOffset = 4 * 32
  }
}

export default O
