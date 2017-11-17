import Board from './board'
import Piece from './pieces/piece'
import bindKeys from './binders'

document.addEventListener("DOMContentLoaded", () =>{
  const c = document.getElementById("myCanvas");
  const ctx = c.getContext("2d");
  const blocks = new Image();
  blocks.src = "assets/images/blocks.png"
  const piece = new Piece(ctx, blocks)
  bindKeys(piece);
});
