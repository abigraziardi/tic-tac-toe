export default function HistoryList({ history, onChangeMove, currentMove }) {
  const moves = history.map((_, index) => {
    const isCurrent = index === currentMove;

    let description;
    if (index > 0) {
      description = `Move: ${index}`;
      return (
        <li key={index}>
          <button
            onClick={() => onChangeMove(index)}
            className={`cursor-pointer w-full border shadow-lg mt-2 p-1 text-center rounded-lg transition-all ${
              isCurrent
                ? "scale-107 text-slate-50  ring-2 ring-emerald-300 font-bold bg-emerald-800 z-10 relative"
                : " bg-teal-700 border-slate-800 text-slate-900 hover:text-slate-50 hover:bg-teal-800"
            } md:p-1.5`}
          >
            {description}
          </button>
        </li>
      );
    }
  });

  return (
    <div className="p-2 text-lg">
      <ul className="flex flex-col gap-1">{moves}</ul>
    </div>
  );
}
