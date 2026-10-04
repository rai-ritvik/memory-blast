import {GAME_STATUS} from "../game/constants";

function ResultBanner({status, moves, timeLeft, onRestart}) {
  const isWin = status === GAME_STATUS.WON;
  const isOver = status !== GAME_STATUS.PLAYING;

  return (
    <div role="status" aria-live="polite" className="mt-6">
      {isOver && (
        <div
          className={`rounded-2xl p-5 text-center shadow-lg ${
            isWin ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <p className="text-2xl font-bold">
            {isWin ? " You won!" : " Time's up!"}
          </p>
          <p className="mt-1">
            {isWin
              ? `Solved in ${moves} moves with ${timeLeft}s left.`
              : `You made ${moves} moves. Give it another go!`}
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="mt-4 rounded-lg bg-white px-5 py-2 font-semibold text-slate-900 hover:bg-slate-200 focusvisible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultBanner;
