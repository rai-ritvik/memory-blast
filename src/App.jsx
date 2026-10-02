import Board from "./components/Board";
import {useMemoryGame} from "./hooks/useMemoryGame";
function App() {
  const game = useMemoryGame();
  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-center text-4xl font-extrabold">
          Memory Blast
        </h1>
        <Board
          cards={game.cards}
          flippedIds={game.flippedIds}
          matchedIds={game.matchedIds}
          onFlip={game.flipCard}
        />
      </div>
    </main>
  );
}
export default App;
