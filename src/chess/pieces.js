// {
//   x: 0,
//   y: 0,
//   moves: 0
// }

export default class PiecesMoves {
  static routeIsFree = (board, element, target) => {
    if (element.type === "knight") {
      return true;
    }

    const deltaX = target.x > element.x ? 1 : target.x === element.x ? 0 : -1;
    const deltaY = target.y > element.y ? 1 : target.y === element.y ? 0 : -1;

    let y = element.y;
    let x = element.x;

    while (y !== target.y || x !== target.x) {
      if (x !== target.x) x += deltaX;
      if (y !== target.y) y += deltaY;

      if (board[x][y] && !(target.x === x && target.y === y)) {
        return false;
      }
    }

    return true;
  };

  static rook = (element, target) => {
    // staight line
    return element.x === target.x || element.y === target.y;
  };
  static king = (element, target) => {
    // castling
    let diffY = Math.abs(target.y - element.y);
    if (element.x === target.x && diffY === 2 && element.moves === 0) {
      return true;
    }

    return (
      // each dimension max distance of 1
      Math.abs(element.x - target.x) <= 1 && Math.abs(element.y - target.y) <= 1
    );
  };
  static queen = (element, target) => {
    // staight line
    if (element.x === target.x || element.y === target.y) {
      return true;
    }

    // diagonal
    if (Math.abs(element.x - target.x) === Math.abs(element.y - target.y)) {
      return true;
    }

    return false;
  };

  static bishop = (element, target) => {
    // diagonal
    return Math.abs(element.x - target.x) === Math.abs(element.y - target.y);
  };

  static knight = (element, target) => {
    if (
      Math.abs(element.x - target.x) === 2 &&
      Math.abs(element.y - target.y) === 1
    ) {
      return true;
    }

    if (
      Math.abs(element.y - target.y) === 2 &&
      Math.abs(element.x - target.x) === 1
    ) {
      return true;
    }

    return false;
  };

  static pawn = (element, target) => {
    const diffX =
      element.color === "white" ? element.x - target.x : target.x - element.x;

    if (element.y !== target.y) {
      const diffY = Math.abs(target.y - element.y);

      return (
        diffY === 1 &&
        diffX === 1 &&
        target.color &&
        target.color !== element.color
      );
    }

    if (diffX <= 0) {
      return false;
    }

    if (target.color && target.color !== element.color) {
      return false;
    }

    if (element.moves === 0) {
      return diffX <= 2;
    } else {
      return diffX === 1;
    }
  };
}
