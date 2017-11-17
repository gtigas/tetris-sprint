class Board {
  constructor() {
    this.grid = []
    this._generateGrid();
  }

  _generateGrid(){
    for (var i = 0; i < 20; i++) {
      this.grid[i] = new Array(10)
    }
  }
}
export default Board
