import Piece from './piece'

class S extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [0,1],
      [0,2],
      [1,0],
      [1,1],
    ]
    this.colorOffset = 5 * 32
  }
}

export default S
