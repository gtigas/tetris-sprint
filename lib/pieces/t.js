import Piece from './piece'

class T extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [0,1],
      [1,0],
      [1,1],
      [1,2],
    ]
    this.colorOffset = 8 * 32
  }
}

export default T
