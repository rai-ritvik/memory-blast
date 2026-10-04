import {LOW_TIME_THRESHOLD_SECONDS, TOTAL_PAIRS} from "../game/constants";

function StatsBar({timeLeft, moves, pairsFound, onRestart}) {
  const isLowTime = timeLeft <= LOW_TIME_THRESHOLD_SECONDS;
  const timeClasses = isLowTime ? "animate-pulse text-red-400" : "text-white";

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-slate-800 p-4 shadow-lg">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400">Time</p>
        <p
          role="timer"
          className={`text-2xl font-bold tabular-nums ${timeClasses}`}
        >
          {timeLeft}s
        </p>
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400">Moves</p>
        <p className="text-2xl font-bold tabular-nums">{moves}</p>
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400">Pairs</p>
        <p className="text-2xl font-bold tabular-nums">
          {pairsFound}/{TOTAL_PAIRS}
        </p>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500 focus-visible:outline-4 focusvisible:outline-offset-2 focus-visible:outline-sky-400"
      >
        Restart
      </button>
    </div>
  );
}

export default StatsBar;
