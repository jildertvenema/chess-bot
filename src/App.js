import React, { useRef, useState } from "react";
import "./styles.css";
import styled from "styled-components";
import Chess from "./chess";
import MoveHistory from "./MoveHistory";
import BotMove from "./bot";

const Board = styled.div`
  position: relative;
  width: 92vh;
  height: 92vh;

  @media (max-width: 900px) {
    width: 92vw;
    height: 92vw;
  }

  max-width: 900px;
  max-height: 900px;
  margin: 0 auto;
  user-select: none;
`;

const Square = styled.div`
  position: absolute;
  left: ${(props) => (100 / 8) * props.left}%;
  top: ${(props) => (100 / 8) * props.top}%;
  height: 12.5%;
  width: 12.5%;
  transition: top 1s ease-in-out;

  background-color: ${(props) =>
    (props.left + props.top) % 2 ? "#575757" : "gray"};

  background-color: ${(props) => props.highlighted && "#176717"};
  border: ${(props) => props.highlighted && "1px solid #726969"};
  z-index: ${(props) => props.highlighted && "3"};
`;

const PieceImage = styled.div`
  background-image: url("${(props) => props.image}");
  background-size: cover;
  cursor: pointer;
  width: 100%;
  height: 100%;

  opacity: 0.8;
  
`;

const WinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: grey;
  opacity: 0.8;
  z-index: 3;
`;

const Centerd = styled.div`
  color: white;
  font-size: 32px;
  height: 40px;
  margin-top: 20%;
`;

// const Cordinate = styled.div`
//   position: absolute;
//   top: 0;
//   padding: 4px;
//   color: white;
//   background-color: #555555;
// `;

const CurrentTurn = styled.div`
  color: white;
  font-size: 26px;
  margin-top: 16px;
  margin-bottom: 4px;
`;

const PromoteOverlay = styled(WinnerOverlay)`
  position: fixed;
`;

const PieceSelector = styled.div`
  width: 100px;
  height: 100px;
  z-index: 5;
  border: 1px solid darkgray;
  margin: 16px;
  float: left;
`;

const chess = new Chess();
let _selectedPiece = null;

const ChessPiece = React.memo(
  function ChessPiece({ x, y, piece, highlighted, onClick, pieceKey }) {
    return (
      <Square
        key={x + "-" + y}
        left={y}
        top={x}
        highlighted={highlighted}
        onClick={() => onClick(piece, x, y)}
      >
        {pieceKey ? (
          <PieceImage image={"pieces-images/" + pieceKey + ".png"} />
        ) : null}
        {/* <Cordinate>
          x:{x}y:{y}
        </Cordinate> */}
      </Square>
    );
  },
  function (prev, next) {
    return (
      next.highlighted === prev.highlighted &&
      next.piece.type === prev.piece.type &&
      next.piece.color === prev.piece.color
    );
  }
);

export default function App() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [promotion, setPromotion] = useState(false);
  const [animating, setAnimating] = useState(null);
  const animatedPiece = useRef();

  const getMovesForPiece = (selectedPiece) => {
    const validMoves = chess.getMovesForPiece(selectedPiece);
    setValidMoves(validMoves);
  };

  const animateMove = (element, target) => {
    setAnimating(element);

    const left = (100 / 8) * element.y;
    const top = (100 / 8) * element.x;
    animatedPiece.current.style.left = left + "%";
    animatedPiece.current.style.top = top + "%";
    animatedPiece.current.style.display = "block";

    const newLeft = (100 / 8) * target.y;
    const newTop = (100 / 8) * target.x;

    const stepLeft = (newLeft - left) / 20;
    const steptop = (newTop - top) / 20;

    let currentLeft = left;
    let currentTop = top;

    const interval = setInterval(() => {
      currentLeft += stepLeft;
      currentTop += steptop;

      animatedPiece.current.style.left = currentLeft + "%";
      animatedPiece.current.style.top = currentTop + "%";
    }, 20);

    setTimeout(() => {
      clearInterval(interval);
      animatedPiece.current.style.left = newLeft + "%";
      animatedPiece.current.style.top = newTop + "%";
      animatedPiece.current.style.display = "none";
      setAnimating(null);
    }, 400);
  };

  const doBotMove = () => {
    setTimeout(() => {
      BotMove(chess).then(({ element, target }) => {
        animateMove(element, target);
        chess.doMove(element, target);
        //  render
        setValidMoves([]);
      });
    }, 500);
  };

  const onPieceClick = (piece, x, y) => {
    if (!selectedPiece) {
      if (piece.color === "white") {
        _selectedPiece = piece;
        setSelectedPiece(piece);
        getMovesForPiece(piece);
      }
    } else {
      const pawn = selectedPiece.type === "pawn";
      animateMove(_selectedPiece || selectedPiece, { x, y });
      if (chess.doMove(_selectedPiece || selectedPiece, { x, y })) {
        if (pawn && x === 0) {
          setPromotion({ x, y });
        } else {
          doBotMove();
        }
        _selectedPiece = null;
        setSelectedPiece(null);
        setValidMoves([]);
      } else {
        if (piece.color === "white") {
          _selectedPiece = piece;
          setSelectedPiece(piece);
          getMovesForPiece(piece);
        }
      }
    }
  };

  const isHighlighted = (piece, x, y) => {
    return (
      validMoves.find((validMove) => validMove.x === x && validMove.y === y) &&
      (!piece.color || piece.color !== chess.currentTurn)
    );
  };

  const promoteClick = (type) => {
    chess.promote(promotion, type);
    setPromotion(false);
    doBotMove();
  };

  return (
    <div className="App">
      {promotion && (
        <PromoteOverlay>
          <Centerd>Pawn promotion</Centerd>
          <PieceSelector onClick={() => promoteClick("queen")}>
            <PieceImage image="pieces-images/white-queen.png" />
          </PieceSelector>
          <PieceSelector onClick={() => promoteClick("bishop")}>
            <PieceImage image="pieces-images/white-bishop.png" />
          </PieceSelector>
          <PieceSelector onClick={() => promoteClick("rook")}>
            <PieceImage image="pieces-images/white-rook.png" />
          </PieceSelector>
          <PieceSelector onClick={() => promoteClick("knight")}>
            <PieceImage image="pieces-images/white-knight.png" />
          </PieceSelector>
        </PromoteOverlay>
      )}

      <CurrentTurn>
        Current Turn:
        {chess.currentTurn === "white" ? " White (you)" : " Black (AI)"}
      </CurrentTurn>
      <div id="bot-points"></div>
      <div id="bot-evaluated"></div>

      {chess.winner && (
        <WinnerOverlay>
          <Centerd>
            {chess.winner[0].toUpperCase() + chess.winner.substring(1)} wins!
          </Centerd>
          <button
            onClick={() => {
              chess.resetGame();
              setValidMoves([]);
            }}
          >
            Play again
          </button>
        </WinnerOverlay>
      )}
      <Board>
        {chess.board.map((row, x) => {
          return row.map((piece, y) => (
            <ChessPiece
              key={x + "-" + y + piece.color + "-" + piece.type + animating}
              pieceKey={animating !== piece && piece.color + "-" + piece.type}
              y={y}
              x={x}
              piece={piece}
              highlighted={isHighlighted(piece, x, y)}
              onClick={onPieceClick}
            />
          ));
        })}
        {
          <div
            ref={animatedPiece}
            style={{
              position: "absolute",
              width: "12.5%",
              height: "12.5%",
              zIndex: 9,
              backgroundSize: "cover",
              transition: "",
              opacity: 0.8,
              backgroundImage:
                animating &&
                `url("pieces-images/${animating.color}-${animating.type}.png")`
            }}
          />
        }
      </Board>
      <MoveHistory
        lastIsBot={
          chess.moveHistory.length
            ? chess.moveHistory[0].piece.color === "black"
            : true
        }
      >
        {chess.moveHistory.map(({ piece, target }, i) => {
          return (
            <div key={i}>
              {chess.moveHistory.length - i + ": "}
              {piece.color + " "}
              {piece.type}
              {" x: " + piece.x}
              {" y: " + piece.y}
              {target.type
                ? " takes " + target.color + " " + target.type
                : " to "}
              {" x: " + target.x}
              {" y: " + target.y}
            </div>
          );
        })}
      </MoveHistory>
      {/* <button onClick={() => setShowCoordinates(!showCoordinates)}>
        Show coordinates
      </button> */}
    </div>
  );
}
