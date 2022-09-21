import { Tuple3 } from "../../types";
import { CellValue, REGION_COLS, REGION_ROWS } from "../Board/Board";
import Cell from "../Cell/Cell";
import "./Region.css";

type RegionProps = {
  cellValues: Tuple3<Tuple3<CellValue>>;
  rowIdx: number;
  colIdx: number;
  setCellState: (rowIdx: number, colIdx: number, value: number | null) => void;
};

function Region({ cellValues, rowIdx, colIdx, setCellState }: RegionProps) {
  return (
    <div className="region">
      {Array.from({ length: REGION_ROWS }, (_, i) => i).map((i) =>
        Array.from({ length: REGION_COLS }, (_, j) => j).map((j) => (
          <Cell
            key={i * REGION_ROWS + j}
            value={cellValues[i][j]}
            rowIdx={rowIdx * REGION_ROWS + i}
            colIdx={colIdx * REGION_COLS + j}
            setCellState={setCellState}
          />
        ))
      )}
    </div>
  );
}

export default Region;
