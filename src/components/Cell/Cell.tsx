import { CellValue } from "../Board/Board";
import "./Cell.css";

type CellProps = {
  value: CellValue;
  rowIdx: number;
  colIdx: number;
  setCellState: (rowIdx: number, colIdx: number, value: number | null) => void;
};

function Cell({ value, rowIdx, colIdx, setCellState }: CellProps) {
  return (
    <input
      type="number"
      step="1"
      min="0"
      max="9"
      className="cell"
      value={value ?? ""}
      onChange={(e) => {
        let v = e.target.value;
        if (String(v).length <= 1) {
          setCellState(rowIdx, colIdx, v === "" ? null : parseInt(v, 10));
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Backspace" || e.key === "Del") return true;
        let regex = /[0-9]{1}/;
        if (!regex.test(e.key)) {
          if (e.preventDefault) e.preventDefault();
        }
      }}
    />
  );
}

export default Cell;
