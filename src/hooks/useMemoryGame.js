import { useEffect, useReducer } from 'react';
import {
    ACTIONS,
    GAME_STATUS,
    MISMATCH_DELAY_MS,
    TICK_INTERVAL_MS,
} from '../game/constants';
import { createDeck } from '../game/deck';
import { createInitialState, gameReducer } from '../game/gameReducer';

export function useMemoryGame() {
    const [state, dispatch] = useReducer(gameReducer, null, () =>
        createInitialState(createDeck()),
    );
    const { status, flippedIds } = state;

    useEffect(() => {
        if (status !== GAME_STATUS.PLAYING) {
            return;
        }

        const intervalId = setInterval(() => {
            dispatch({ type: ACTIONS.TICK });
        }, TICK_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [status]);

    useEffect(() => {
        if (status !== GAME_STATUS.PLAYING || flippedIds.length !== 2) {
            return;
        }

        const timeoutId = setTimeout(() => {
            dispatch({ type: ACTIONS.CLEAR_FLIPPED });
        }, MISMATCH_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [flippedIds, status]);

    function flipCard(id) {
        dispatch({ type: ACTIONS.FLIP_CARD, id });
    }

    return { ...state, flipCard };
}