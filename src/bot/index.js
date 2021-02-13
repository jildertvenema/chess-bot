import * as ENUMS from "../chess/enums";
import * as POINTS from "./points";

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

const generateMoves = (chess, board, color) => {
  let moves = [];

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const element = board[x][y];
      if (element && element.color === color) {
        moves = moves.concat(
          chess.getMovesForPiece(element, board).map((target) => ({
            target,
            element
          }))
        );
      }
    }
  }

  return moves;
};

let nodes = 0;

const DoMove = (chess) => {
  return new Promise((resolve) => {
    const depth = 4;
    nodes = 0;
    const { element, target, value } = minimax(
      chess,
      chess.board,
      depth,
      true,
      -Infinity,
      Infinity
    );

    const pointsElement = document.getElementById("bot-points");
    pointsElement.innerHTML = "Bot eval: " + value;

    if (value > 0) {
      pointsElement.innerHTML += " (in bot's favour)";
      pointsElement.style.color = "red";
    } else if (value < 0) {
      pointsElement.innerHTML += " (in your favour)";
      pointsElement.style.color = "green";
    } else {
      pointsElement.innerHTML = "Bot points: 0 (tie)";
      pointsElement.style.color = "white";
    }

    const evalElement = document.getElementById("bot-evaluated");
    evalElement.innerHTML = nodes + " moves evaluated.";

    resolve({ element, target });
  });
};

const evalBoard = (board) => {
  let points = 0;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const type = board[x][y].type;
      if (type) {
        let currentPoints = type ? POINTS[type.toUpperCase()] || 0 : 0;

        if (board[x][y].color === ENUMS.WHITE) {
          points -= currentPoints;
        } else if (board[x][y].color === ENUMS.BLACK) {
          points += currentPoints;
        }
      }
    }
  }

  return points;
};

const hasWinner = (board) => {
  const kings = [];
  board.forEach((row) => {
    row.forEach((element) => {
      if (element && element.type === ENUMS.KING) {
        kings.push(element);
      }
    });
  });

  if (kings.length === 2) {
    return false;
  } else {
    return kings[0];
  }
};

const cloneBoard = (board) => {
  const clone = [];
  board.forEach((row, x) => {
    clone.push([]);
    row.forEach((element, y) => {
      clone[x][y] = element ? { ...element } : 0;
    });
  });

  return clone;
};

const swapPieces = (element, target, clonedBoard) => {
  clonedBoard[element.x][element.y] = 0;
  clonedBoard[target.x][target.y] = element;

  element.x = target.x;
  element.y = target.y;
  element.moves++;

  if (element.type === ENUMS.PAWN) {
    if (element.color === ENUMS.WHITE && element.x === 0) {
      element.type = ENUMS.QUEEN;
    }
    if (element.color === ENUMS.BLACK && element.x === 7) {
      element.type = ENUMS.QUEEN;
    }
  }
};

const doMove = (board, element, target) => {
  element = { ...element };
  target = { ...target };

  const clonedBoard = cloneBoard(board);

  // castling
  if (
    element.type === ENUMS.KING &&
    Math.abs(element.y - target.y) === 2 &&
    element.moves === 0
  ) {
    let rook = null;
    let x = 0;
    if (element.color === ENUMS.WHITE) {
      x = 7;
    }
    if (element.x === x) {
      let y = 1;
      if (target.y > element.y) {
        rook = clonedBoard[x][7];
        y = 5;
      } else {
        rook = clonedBoard[x][0];
        y = 3;
      }
      if (rook) {
        swapPieces(rook, { x, y }, clonedBoard);
      }
    }
  }

  swapPieces(element, target, clonedBoard);

  return clonedBoard;
};

const minimax = (chess, board, depth, maximizingPlayer, a, b) => {
  nodes++;
  if (depth === 0) {
    return { value: evalBoard(board) };
  }

  const winner = hasWinner(board);
  if (winner && winner.color === ENUMS.BLACK) {
    return { value: Infinity };
  } else if (winner && winner.color === ENUMS.WHITE) {
    return { value: -Infinity };
  }

  if (maximizingPlayer) {
    let max = -Infinity;
    const moves = generateMoves(chess, board, "black");
    let move = getRandom(moves);
    for (let { element, target } of moves) {
      const board2 = doMove(board, element, target);
      const nextNode = minimax(chess, board2, depth - 1, false, a, b);
      const newScore = nextNode && nextNode.value ? nextNode.value : 0;

      if (newScore > max) {
        max = newScore;
        move = { element, target, value: newScore };
      }

      a = Math.max(a, newScore);
      if (a >= b) {
        break;
      }
    }
    return move;
    // minimizing
  } else {
    let min = Infinity;
    const moves = generateMoves(chess, board, "white");
    let move = getRandom(moves);
    for (let { element, target } of moves) {
      const board2 = doMove(board, element, target);
      const nextNode = minimax(chess, board2, depth - 1, true, a, b);
      const newScore = nextNode && nextNode.value ? nextNode.value : 0;

      if (newScore < min) {
        min = newScore;
        move = { element, target, value: newScore };
      }

      b = Math.min(b, newScore);
      if (a >= b) {
        break;
      }
    }
    return move;
  }
};

export default DoMove;
