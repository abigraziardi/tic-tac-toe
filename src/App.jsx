import { useState, useEffect } from "react";
import Board from "./components/Board";
import checkWinner from "./components/checkWinner";
import HistoryList from "./components/HistoryList";

export default function App() {
  const [gameMode, setGameMode] = useState("pvp");
  const [historyBox, setHistoryBox] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handleHistoryBox = () => {
    setHistoryBox(!historyBox);
  };

  const handleHistory = (newSquare) => {
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, currentMove + 1),
      newSquare,
    ]);
    setCurrentMove((prevMove) => prevMove + 1);
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const handleModeChange = (mode) => {
    if (gameMode === mode) {
      return;
    }
    setGameMode(mode);
    handleReset();
  };
  useEffect(() => {
    const winner = checkWinner(currentSquares);
    if (gameMode === "cpu" && !xIsNext && !winner) {
      const emptySquares = currentSquares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);

      if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const cpuMoveIndex = emptySquares[randomIndex];

        const timer = setTimeout(() => {
          const newSquare = currentSquares.slice();
          newSquare[cpuMoveIndex] = "O";
          setHistory((prevHistory) => [
            ...prevHistory.slice(0, currentMove + 1),
            newSquare,
          ]);
          setCurrentMove((prevMove) => prevMove + 1);
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [currentSquares, xIsNext, gameMode, currentMove]);

  const handleChangeMove = (index) => {
    setCurrentMove(index);
  };

  return (
    <div className="bg-linear-to-b from-teal-800 to-emerald-700 w-full min-h-screen flex flex-col items-center justify-center gap-10">
      <header className="text-4xl font-bold text-slate-50 text-shadow-lg md:text-5xl">
        Tic-Tac-Toe
      </header>

      <div className="flex items-center justify-center gap-4">
        <div className="h-118 bg-teal-900 border-4 border-slate-800 rounded-lg overflow-hidden shadow-lg md:px-8 md:h-full">
          <div className=" py-5 px-8 flex items-center justify-around gap-4 mt-2 md:mt-0">
            <button
              onClick={() => handleModeChange("pvp")}
              className={`btn-primary ${gameMode === "pvp" ? "scale-110 bg-teal-600 text-slate-50 ring-2 ring-teal-300 z-10 relative" : "bg-teal-700 text-slate-50 hover:text-slate-200 hover:bg-teal-600"} transition-all`}
            >
              PvP
            </button>
            <span className="text-xl font-bold text-slate-50 md:text-3xl">
              |
            </span>
            <button
              onClick={() => handleModeChange("cpu")}
              className={`btn-primary ${gameMode === "cpu" ? "scale-110 bg-teal-600 text-slate-50 ring-2 ring-teal-300 z-10 relative" : "bg-teal-700 text-slate-100 hover:text-slate-200 hover:bg-teal-600"} transition-all`}
            >
              CPU
            </button>
          </div>

          <Board
            squares={currentSquares}
            xIsNext={xIsNext}
            onHandleHistory={handleHistory}
            onHandleReset={handleReset}
            historyBox={historyBox}
            onHandleHistoryBox={handleHistoryBox}
          />
        </div>

        <div
          className={`h-118 w-45 bg-teal-900 border-4 border-slate-800 px-4 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${!historyBox && "hidden"} md:h-129 md:w-60`}
        >
          <HistoryList
            history={history}
            onChangeMove={handleChangeMove}
            currentMove={currentMove}
          />
        </div>
      </div>
    </div>
  );
}
