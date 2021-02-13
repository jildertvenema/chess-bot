import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MoveHistory = styled.div`
  height: 400px;
  overflow-y: scroll;
  width: 500px;
  margin: 0 auto;
  background-color: darkgray;
  margin-top: 8px;
  max-width: 100%;

  @media (min-width: 1441px) {
    position: absolute;
    right: 16px;
    top: 20%;
  }
`;

const secondsToDate = (s) => new Date(s * 1000).toISOString().substr(11, 8);

export default (props) => {
  const [playertime, setPlayertime] = useState(0);
  const [botTime, setBotTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (props.lastIsBot) {
        setPlayertime((prev) => prev + 1);
      } else {
        setBotTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [props.lastIsBot]);

  return (
    <MoveHistory>
      <div style={{ paddingTop: 8 }}>
        Player time: {secondsToDate(playertime)}
      </div>
      <div>Bot time: {secondsToDate(botTime)}</div>
      ------------------------------------
      {props.children}
    </MoveHistory>
  );
};
