import Board from "./components/Board";

const SAMPLE_CARDS = Array.from({length: 12}, (_, index) => ({
  id: index,
  type: "pair",
  symbol: String(index + 1),
  pairKey: String(index + 1),
}));

function App() {
  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-center text-4xl font-extrabold">
          Memory Blast
        </h1>
        <Board
          cards={SAMPLE_CARDS}
          flippedIds={[2]}
          matchedIds={[5]}
          onFlip={() => {}}
        />
      </div>
    </main>
  );
}

export default App;
