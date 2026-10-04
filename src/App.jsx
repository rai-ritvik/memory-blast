import Board from "./components/Board";
import ResultBanner from "./components/ResultBanner";
import StatsBar from "./components/StatsBar";
import {GAME_STATUS} from "./game/constants";
import {useMemoryGame} from "./hooks/useMemoryGame";

function App() {
  const game = useMemoryGame();
  const isGameOver = game.status !== GAME_STATUS.PLAYING;

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          Memory Blast
        </h1>
        <p className="mb-6 mt-2 text-center text-sm text-slate-400">
          Find all 5 pairs before time runs out.  costs 10 seconds, ⏱ gives 10
          back.
        </p>

        <StatsBar
          timeLeft={game.timeLeft}
          moves={game.moves}
          pairsFound={game.pairsFound}
          onRestart={game.restart}
        />

        <Board
          cards={game.cards}
          flippedIds={game.flippedIds}
          matchedIds={game.matchedIds}
          isGameOver={isGameOver}
          onFlip={game.flipCard}
        />

        <ResultBanner
          status={game.status}
          moves={game.moves}
          timeLeft={game.timeLeft}
          onRestart={game.restart}
        />
      </div>
    </main>
  );
}

export default App;
