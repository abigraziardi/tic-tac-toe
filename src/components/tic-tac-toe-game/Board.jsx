import Square from "./Square";
import { checkWinner } from "../../scripts/checkWinner";

export default function Board({
  squares,
  xIsNext,
  onHandleHistory,
  onHandleReset,
  onHandleHistoryBox,
  historyBox,
}) {
  let status;
  const winner = checkWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (isDraw) {
    status = `Draw`;
  } else {
    status = `Next turn: ${xIsNext ? "X" : "O"}`;
  }

  const handleSquare = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const newSquare = squares.slice();
    newSquare[index] = xIsNext ? "X" : "O";
    onHandleHistory(newSquare);
  };

  return (
    <div>
      <div className="text-lg font-medium text-slate-50 py-2 px-5 md:text-xl md:py-3">
        {status}
      </div>

      <div className="board m-auto">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onHandleSquare={() => handleSquare(index)}
          />
        ))}
      </div>

      <div className="flex justify-between p-5">
        <button
          onClick={onHandleReset}
          className="btn-secondary cursor-pointer bg-teal-700 text-slate-900 hover:text-slate-50 hover:bg-teal-800"
        >
          Reset
        </button>
        <button
          onClick={onHandleHistoryBox}
          className={`btn-secondary cursor-pointer ${historyBox ? "scale-90 bg-emerald-700 text-slate-50 ring-2 ring-emerald-300 z-10 relative hover:bg-emerald-800 hover:text-slate-900" : "bg-teal-700 text-slate-900 hover:text-slate-50 hover:bg-teal-800 "} transition-all`}
        >
          History
        </button>
      </div>
    </div>
  );
}
