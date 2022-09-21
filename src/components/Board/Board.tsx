import { useEffect, useState } from "react";
import { Tuple3, Tuple9 } from "../../types";
import Region from "../Region/Region";
import "./Board.css";

export const BOARD_ROWS = 9;
export const BOARD_COLS = 9;
export const REGION_ROWS = 3;
export const REGION_COLS = 3;
export const REGIONS_IN_BOARD_ROWS = BOARD_ROWS / REGION_ROWS;
export const REGIONS_IN_BOARD_COLS = BOARD_COLS / REGION_COLS;

export type CellValue = number | null;

let initialBoardState: Tuple9<Tuple9<CellValue>> = [
  [null, null, null, 2, 6, null, 7, null, 1],
  [6, 8, null, null, 7, null, null, 9, null],
  [1, 9, null, null, null, 4, 5, null, null],
  [8, 2, null, 1, null, null, null, 4, null],
  [null, null, 4, 6, null, 2, 9, null, null],
  [null, 5, null, null, null, 3, null, 2, 8],
  [null, null, 9, 3, null, null, null, 7, 4],
  [null, 4, null, null, 5, null, null, 3, 6],
  [7, null, 3, null, 1, 8, null, null, null],
];

function getRegionState(
  boardState: Tuple9<Tuple9<CellValue>>,
  rowIdx: number,
  colIdx: number
) {
  return boardState
    .slice(rowIdx * 3, rowIdx * 3 + 3)
    .map((row) => row.slice(colIdx * 3, colIdx * 3 + 3)) as unknown as Tuple3<
    Tuple3<CellValue>
  >;
}

function isRowsUnique(boardState: Tuple9<Tuple9<CellValue>>) {
  let valuesSet: Set<number>;
  for (let i = 0; i < BOARD_ROWS; i++) {
    let row = boardState[i];
    valuesSet = new Set();
    for (let j = 0; j < row.length; j++) {
      let v = row[j];
      if (v === null) continue;
      if (valuesSet.has(v)) return false;
      valuesSet.add(v);
    }
  }
  return true;
}

function isColumnsUnique(boardState: Tuple9<Tuple9<CellValue>>) {
  let valuesSet: Set<number>;
  for (let i = 0; i < BOARD_ROWS; i++) {
    valuesSet = new Set();
    for (let j = 0; j < BOARD_COLS; j++) {
      let v = boardState[j][i];
      if (v === null) continue;
      if (valuesSet.has(v)) return false;
      valuesSet.add(v);
    }
  }
  return true;
}

function isRegionsUnique(boardState: Tuple9<Tuple9<CellValue>>) {
  for (let i = 0; i < REGIONS_IN_BOARD_ROWS; i++) {
    for (let j = 0; j < REGIONS_IN_BOARD_COLS; j++) {
      let regionState = getRegionState(boardState, i, j);
      if (!isRegionUnique(regionState)) return false;
    }
  }
  return true;
}

function isRegionUnique(boardState: Tuple3<Tuple3<CellValue>>) {
  let valuesSet = new Set<number>();
  for (let i = 0; i < REGION_ROWS; i++) {
    for (let j = 0; j < REGION_COLS; j++) {
      let v = boardState[i][j];
      if (v === null) continue;
      if (valuesSet.has(v)) return false;
      valuesSet.add(v);
    }
  }
  return true;
}

function isValid(boardState: Tuple9<Tuple9<CellValue>>) {
  return (
    isRowsUnique(boardState) &&
    isColumnsUnique(boardState) &&
    isRegionsUnique(boardState)
  );
}

function isFilled(boardState: Tuple9<Tuple9<CellValue>>) {
  for (let i = 0; i < BOARD_COLS; i++) {
    for (let j = 0; j < BOARD_ROWS; j++) {
      if (typeof boardState[i][j] !== "number") return false;
    }
  }
  return true;
}

function cloneBoard(
  state: Tuple9<Tuple9<CellValue>>
): Tuple9<Tuple9<CellValue>> {
  let clonedState: Tuple9<Tuple9<CellValue>> = state.slice() as Tuple9<
    Tuple9<CellValue>
  >;
  for (let i = 0; i < state.length; i++) {
    // @ts-ignore
    clonedState[i] = state[i].slice();
  }
  return clonedState;
}

type BoardProps = {
  validate: boolean;
  setValidate: (v: boolean) => void;
  setFinished: (v: boolean) => void;
  setErrorMessage: (msg: string) => void;
};

function Board({
  validate,
  setValidate,
  setFinished,
  setErrorMessage,
}: BoardProps) {
  let [state, setState] =
    useState<Tuple9<Tuple9<CellValue>>>(initialBoardState);

  function setCellState(rowIdx: number, colIdx: number, value: number | null) {
    let boardState = cloneBoard(state);
    boardState[rowIdx][colIdx] = value;
    setState(boardState);
  }

  useEffect(() => {
    if (!validate) return;

    let valid = isValid(state);
    if (!valid) {
      setErrorMessage("Invalid board state");
      setFinished(false);
    } else {
      setErrorMessage("");
      setFinished(isFilled(state));
    }

    setValidate(false);
  }, [validate, state, setValidate, setFinished, setErrorMessage]);

  return (
    <>
      <div className="board">
        {Array.from({ length: REGIONS_IN_BOARD_ROWS }, (_, i) => i).map((i) =>
          Array.from({ length: REGIONS_IN_BOARD_COLS }, (_, j) => j).map(
            (j) => (
              <Region
                key={i * REGIONS_IN_BOARD_ROWS + j}
                cellValues={getRegionState(state, i, j)}
                rowIdx={i}
                colIdx={j}
                setCellState={setCellState}
              />
            )
          )
        )}
      </div>
    </>
  );
}

export default Board;
