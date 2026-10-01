import Card from "./Card";

function Board({ cards, flippedIds, matchedIds, onFlip }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
      {cards.map((card) => {
        const isFaceUp =
          matchedIds.includes(card.id) || flippedIds.includes(card.id);
        return (
          <Card key={card.id} card={card} isFaceUp={isFaceUp} onFlip={onFlip} />
        );
      })}
    </div>
  );
}
export default Board;