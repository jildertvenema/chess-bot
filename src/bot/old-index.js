import { forEachPosition } from "../chess/utils";
import * as ENUMS from "../chess/enums";
import * as POINTS from "./points";

const DoMove = (chess) => {
  return new Promise((resolve) => {
    const board = chess.board;

    const depth = 2;
    let bestPoints = -Infinity;
    let bestTarget = null;
    let bestElement = null;

    board.forEach((row, x) => {
      row.forEach((element, y) => {
        if (element.color === "black") {
          const moves = chess.getMovesForPiece(element);
          let resolved = 0;
          moves.forEach((target, i) => {
            evalMove(chess, element, target, depth).then((points) => {
              resolved++;
              console.log({ resolved, i, points });

              if (points > bestPoints) {
                bestPoints = points;
                bestTarget = target;
                bestElement = element;
              }

              if (resolved === moves.length) {
                resolve({
                  element: bestElement,
                  target: bestTarget
                });
              }
            });
          });
        }
      });
    });
  });
};

const evalBoard = (board) => {
  let points = 0;
  forEachPosition((x, y) => {
    const type = board[x][y].type;

    let currentPoints = type ? POINTS[type.toUpperCase()] || 0 : 0;

    if (board[x][y].color === ENUMS.WHITE) {
      currentPoints *= -1;
    }
    points += currentPoints;
  });

  return points;
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

const doMove = (board, element, target) => {
  element = { ...element };
  target = { ...target };

  const clonedBoard = cloneBoard(board);

  clonedBoard[element.x][element.y] = 0;
  clonedBoard[target.x][target.y] = element;

  element.x = target.x;
  element.y = target.y;
  element.moves++;
  return clonedBoard;
};

const searchTree = (chess, depth, color, board) => {
  depth--;

  let minPnts = 99999999999;

  if (color === "black") {
    minPnts = -99999999999;
  }

  forEachPosition((x, y) => {
    const element = board[x][y];
    if (element && element.color === color) {
      const moves = chess.getMovesForPiece(element, board);
      moves.forEach((target) => {
        const board2 = doMove(board, element, target);

        const currentPoints = evalBoard(board2);

        if (color === "white" && currentPoints < minPnts) {
          minPnts = currentPoints;
        } else if (color === "black" && currentPoints > minPnts) {
          minPnts = currentPoints;
        }

        if (depth > 0) {
          minPnts += searchTree(
            chess,
            depth,
            color === "white" ? "black" : "white",
            board2
          );
        }
      });
    }
  });

  return minPnts;
};

const evalMove = (chess, element, target, depth) => {
  return new Promise((resolve) => {
    const board = doMove(chess.board, element, target);
    const points = evalBoard(board);

    depth--;
    if (depth === 0) {
      return resolve(points);
    } else {
      return resolve(points + searchTree(chess, depth, "white", board));
    }
  });
};

export default DoMove;
