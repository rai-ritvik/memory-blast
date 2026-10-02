import { useReducer } from 'react';
import { ACTIONS } from '../game/constants';
import { createDeck } from '../game/deck';
import { createInitialState, gameReducer } from '../game/gameReducer';

export function useMemoryGame() {
    const [state, dispatch] = useReducer(gameReducer, null, () =>
        createInitialState(createDeck()),
    );

    function flipCard(id) {
        dispatch({ type: ACTIONS.FLIP_CARD, id });
    }
    
    return { ...state, flipCard };
}