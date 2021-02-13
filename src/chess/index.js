import { forEachPosition } from "./utils";
import Moves from "./pieces";
import * as ENUMS from "./enums";
import BoardLayout from "./board-layout";

// const piece = {
//   x: 0,
//   y: 0,
//   moves: 0,
//   color: WHITE,
//   type: ENUMS.KING
// }

export default class Chess {
  board = [];
  currentTurn = ENUMS.WHITE;
  winner = null;
  moveHistory = [];

  constructor() {
    this.initializeBoard();
  }

  resetGame = () => {
    this.board = [];
    this.currentTurn = ENUMS.WHITE;
    this.winner = null;
    this.initializeBoard();
  };

  initializeBoard = () => {
    forEachPosition((x, y) => {
      if (!this.board[x]) {
        this.board.push([]);
      }

      const pieceString = BoardLayout[x] && BoardLayout[x][y];
      if (pieceString) {
        const color = pieceString.startsWith(ENUMS.WHITE)
          ? ENUMS.WHITE
          : ENUMS.BLACK;

        const pieceType = pieceString.substring(pieceString.indexOf("-") + 1);

        this.board[x].push({
          x,
          y,
          moves: 0,
          color: color,
          type: pieceType
        });
      } else {
        this.board[x].push(0);
      }
    });
  };

  swapPieces = (piece, target) => {
    if (this.getPieceAtPosition(target).type === ENUMS.KING) {
      this.winner = piece.color;
    }

    this.board[piece.x][piece.y] = 0;
    this.board[target.x][target.y] = piece;

    piece.x = target.x;
    piece.y = target.y;

    if (piece.type === ENUMS.PAWN) {
      if (piece.color === ENUMS.WHITE && piece.x === 0) {
        piece.type = ENUMS.QUEEN;
      }
      if (piece.color === ENUMS.BLACK && piece.x === 7) {
        piece.type = ENUMS.QUEEN;
      }
    }

    piece.moves++;
  };

  getPieceAtPosition = (position, board) => {
    return (board || this.board)[position.x][position.y];
  };

  isValidMove = (piece, target, board) => {
    board = board || this.board;
    if (piece.x === target.x && piece.y === target.y) {
      return false;
    }

    const targetPiece = this.getPieceAtPosition(target, board);

    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    const isValidMove = Moves[piece.type];

    // if not defined
    if (!isValidMove) {
      return false;
    }

    const valid = isValidMove(piece, targetPiece || target);
    const routeFree = Moves.routeIsFree(board, piece, target);

    // castling
    if (
      piece.type === ENUMS.KING &&
      Math.abs(piece.y - target.y) === 2 &&
      piece.moves === 0
    ) {
      let rook = null;
      let x = 0;
      if (piece.color === ENUMS.WHITE) {
        x = 7;
      }
      if (piece.x === x) {
        let y = 1;
        if (target.y > piece.y) {
          rook = board[x][7];
          y = 5;
        } else {
          rook = board[x][0];
          y = 3;
        }
        return rook && routeFree && valid && rook.moves === 0;
      } else {
        return false;
      }
    }

    return routeFree && valid;
  };

  doMove = (piece, target) => {
    if (piece.color === this.currentTurn && this.isValidMove(piece, target)) {
      this.moveHistory = [
        { piece, target: this.getPieceAtPosition(target) || target },
        ...this.moveHistory
      ];

      // castling
      if (
        piece.type === ENUMS.KING &&
        Math.abs(piece.y - target.y) === 2 &&
        piece.moves === 0
      ) {
        let rook = null;
        let x = 0;
        if (piece.color === ENUMS.WHITE) {
          x = 7;
        }
        if (piece.x === x) {
          let y = 1;
          if (target.y > piece.y) {
            rook = this.board[x][7];
            y = 5;
          } else {
            rook = this.board[x][0];
            y = 3;
          }
          if (rook) {
            this.swapPieces(rook, { x, y });
          }
        }
      }

      this.swapPieces(piece, target);

      // flip moves
      this.currentTurn =
        this.currentTurn === ENUMS.WHITE ? ENUMS.BLACK : ENUMS.WHITE;
      return true;
    } else {
      console.error("NOT VALID MOVE", piece, target);
      return false;
    }
  };

  promote = ({ x, y }, type) => {
    this.board[x][y].type = type;
  };

  getMovesForPiece = (piece, board) => {
    const moves = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const target = { x, y };
        const routeFree = Moves.routeIsFree(board || this.board, piece, target);
        if (this.isValidMove(piece, target, board) && routeFree) {
          moves.push(target);
        }
      }
    }
    return moves;
  };
}
