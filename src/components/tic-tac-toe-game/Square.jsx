export default function Square({ value, onHandleSquare }) {
  return (
    <button
      onClick={onHandleSquare}
      className="square text-3xl font-semibold md:text-4xl"
    >
      {value}
    </button>
  );
}
