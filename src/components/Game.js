import React, { useEffect, useState } from "react";
import Colors from "./Colors";
import Board from "./Board";
import EndGame from "./EndGame";

const Game = (props) => {
  let colors = ["yellow", "red", "blue", "green", "purple"];
  let trueRow = [];

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      trueRow.push(colors[Math.floor(Math.random() * 4) + 1]);
    }
    console.log(trueRow);
  }, []);

  const [gameState, setGameState] = useState({
    colors,
    activeColor: "yellow",
    previousRows: [],
    previousHints: [],
    currentRow: ["", "", "", ""],
    hints: [0, 0, 0, 0],
    activeRow: 0,
    totalRows: 10,
    trueRow,
    canCheck: false, //this checks if it's ok to eval currentRow
    victory: false,
    defeat: false,
    success: false,
    endGame: false,
  });

  const activateColor = (activeColor) => {
    setGameState((prevState) => {
      return {
        ...prevState,
        activeColor,
      };
    });
  };

  const setColor = (color, id) => {
    if (gameState.victory) {
      return false;
    }
    const rowId = +id.substr(1, id.indexOf("-") - 1);
    const pegId = +id.substr(id.indexOf("-") + 1);
    let currentRow = gameState.currentRow;
    let isArrayFull = 0; //row checker

    if (gameState.activeRow === rowId && color) {
      currentRow[pegId] = color;

      setGameState((prevState) => {
        return {
          ...prevState,
          currentRow: currentRow,
        };
      });

      /* Checking if currentRow is Full */
      for (let i in currentRow) {
        if (currentRow[i].length > 0) {
          isArrayFull++;
        }
      }
      if (isArrayFull >= currentRow.length) {
        // setGameState({ canCheck: true })
        setGameState((prevState) => {
          return {
            ...prevState,
            canCheck: true,
          };
        });
      } else {
        setGameState((prevState) => {
          return {
            ...prevState,
            canCheck: false,
          };
        });
      }
    }
  };

  const checkRow = () => {
    const currentRow = JSON.parse(JSON.stringify(gameState.currentRow));
    // console.log(currentRow); color in string we enter
    const trueRow = JSON.parse(JSON.stringify(gameState.trueRow));
    // console.log(trueRow); true row
    const hints = gameState.hints;
    const previousHints = gameState.previousHints;
    const previousRows = gameState.previousRows;

    /* Checking black matches */
    for (let i = 0; i < 4; i++) {
      if (currentRow[i] === trueRow[i]) {
        hints[i] = 2;
        delete currentRow[i];
        delete trueRow[i];
      }
    }

    for (let i = 0; i < 4; i++) {
      if (currentRow[i] !== trueRow[i]) {
        hints[i] = -1;
        // delete (currentRow[i])
        // delete (trueRow[i])
      }
    }

    /* Checking white matches */
    for (let i in currentRow) {
      for (let j in trueRow) {
        if (currentRow[i] === trueRow[j]) {
          hints[i] = 1;
          delete currentRow[i];
          delete trueRow[j];
        }
      }
    }

    console.log(hints.sort((a, b) => b - a));

    /* checking if player won */
    let victory = true;
    for (let i in hints) {
      if (hints[i] < 2) {
        victory = false;
        break;
      }
    }

    /* checking if player lost */
    let defeat = gameState.defeat;
    if (gameState.activeRow >= gameState.totalRows - 1) {
      defeat = true;
    }

    /* updating board */
    console.log(previousHints.push(hints)); // guess row
    previousRows.push(gameState.currentRow);

    setGameState((prevState) => {
      return {
        ...prevState,
        hints: [0, 0, 0, 0],
        activeRow: gameState.activeRow + 1,
        previousHints: previousHints,
        currentRow: ["", "", "", ""],
        previousRows: previousRows,
        canCheck: false,
        victory: victory,
        defeat: defeat,
      };
    });
    //   let final=[2, 2, 2, 2];
    //   for (let i = 0; i < 4; i++) {
    //     if (final[i] === trueRow[i]) {
    //       <EndGame final={final}/>
    //     }
    // }
  };

  return (
    <div className="game-container">
      <Colors
        list={gameState.colors}
        activeColor={gameState.activeColor}
        action={activateColor}
      />

      <Board
        gameState={gameState}
        pegAction={setColor}
        checkAction={checkRow}
      />

      <EndGame state={gameState} />
    </div>
  );
};

export default Game;
