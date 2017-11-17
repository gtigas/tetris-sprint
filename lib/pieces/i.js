import Piece from './piece'



class I extends Piece {
  constructor(...args){
    super(...args)
    this.blocks = [
      [1,0],
      [1,1],
      [1,2],
      [1,3]
    ]
    this.colorOffset = 6 * 32
  }
}

export default I
