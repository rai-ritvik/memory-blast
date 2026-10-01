function Card({ card, isFaceUp, onFlip }) {
  return (
    <button
      type="button"
      onClick={() => onFlip(card.id)}
      className="aspect-square w-full rounded-xl bg-indigo-600 text-4xl text-white shadow-md transition hover:bg-indigo-500"
    >
      {isFaceUp ? card.symbol : "?"}
    </button>
  );
}
export default Card;