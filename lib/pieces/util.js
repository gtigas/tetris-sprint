export const PIECE_COLOR_OFFSETS = {
  "I": 6 * 32,
  "J": 7 * 32,
  "L": 3 * 32,
  "O": 4 * 32,
  "S": 5 * 32,
  "Z": 2 * 32,
  "T": 8 * 32,
}

export const PIECE_BLOCK_LOCS = {
  "I": [
  [  [1,0],[1,1],[1,2],[1,3] ],
  [  [0,2],[1,2],[2,2],[3,2] ],
  [  [2,0],[2,1],[2,2],[2,3] ],
  [  [0,1],[1,1],[2,1],[3,1] ]
  ],
  "J": [
    [[0,0],[1,0], [1,1],[1,2]],
    [[0,1],[0,2], [1,1],[2,1]],
    [[1,0],[1,1], [1,2],[2,2]],
    [[2,0],[0,1], [1,1],[2,1]]
  ],
  "L": [
    [[1,0], [1,1],[1,2],[0,2]],
    [[0,1], [1,1],[2,1],[2,2]],
    [[2,0], [1,0],[1,1],[1,2]],
    [[0,0], [0,1],[1,1],[2,1]]
  ],
  "O": [
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]],
    [[0,0],[1,1],[0,1],[1,0]]
  ],
  "S": [
    [[0,1],[0,2],[1,0],[1,1]],
    [[0,1],[1,1],[1,2],[2,2]],
    [[1,1],[1,2],[2,0],[2,1]],
    [[0,0],[1,0],[1,1],[2,1]]
  ],
  "Z": [
    [[0,0],[0,1],[1,1],[1,2]],
    [[0,2],[1,2],[1,1],[2,1]],
    [[1,0],[1,1],[2,1],[2,2]],
    [[0,1],[1,0],[1,1],[2,0]]
  ],
  "T": [
    [[0,1],[1,0],[1,1], [1,2]],
    [[0,1],[1,1],[2,1], [1,2]],
    [[1,0],[1,1],[1,2], [2,1]],
    [[1,0],[0,1],[1,1], [2,1]],
  ],
}