const randomPos = (max) => Math.floor(Math.random() * max) + 0;

const DoMove = (chess) => {
  const board = chess.board;

  while (true) {
    const randomPiece = board[randomPos(7)][randomPos(7)];

    if (randomPiece.color === "black") {
      const validMoves = chess.getMovesForPiece(randomPiece);
      if (validMoves.length > 0) {
        const target = validMoves[randomPos(validMoves.length - 1)];

        return {
          element: randomPiece,
          target
        };
      }
    }
  }
};

export default DoMove;
