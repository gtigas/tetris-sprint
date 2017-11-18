import Board from './board'
import Piece from './pieces/piece'
import Game from './game'
import bindKeys from './binders'

document.addEventListener("DOMContentLoaded", () =>{
  const game = document.getElementById("game");
  const hold = document.getElementById("hold");
  const preview1 = document.getElementById("preview1");
  const preview2 = document.getElementById("preview2");
  const preview3 = document.getElementById("preview3");
  const ctx = {};
  ctx.game = game.getContext("2d");
  ctx.hold = hold.getContext("2d");
  ctx.preview1 = preview1.getContext("2d");
  ctx.preview2 = preview2.getContext("2d");
  ctx.preview3 = preview3.getContext("2d");
  const blocks = new Image();
  blocks.src = "assets/images/blocks.png"
  blocks.onload = () => {
    const game = new Game(ctx, blocks)
    bindKeys(game);
  }
});
