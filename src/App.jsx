import {useState} from "react";
import Board from "./components/Board";
import {createDeck} from "./game/deck";

function App() {
  const [cards] = useState(() => createDeck());
  const [openIds, setOpenIds] = useState([]);
  function handleFlip(id) {
    setOpenIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((openId) => openId !== id)
        : [...previousIds, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-center text-4xl font-extrabold">
          Memory Blast
        </h1>
        <Board
          cards={cards}
          flippedIds={openIds}
          matchedIds={[]}
          onFlip={handleFlip}
        />
      </div>
    </main>
  );
}

export default App;
