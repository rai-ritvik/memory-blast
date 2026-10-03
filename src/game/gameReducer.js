import {
    ACTIONS,
    CARD_TYPES,
    GAME_DURATION_SECONDS,
    GAME_STATUS,
} from './constants';

export function createInitialState(cards) {
    return {
        cards,
        flippedIds: [],
        matchedIds: [],
        usedSpecialIds: [],
        timeLeft: GAME_DURATION_SECONDS,
        moves: 0,
        status: GAME_STATUS.PLAYING,
    };
}

function getCard(cards, id) {
    return cards.find((card) => card.id === id);
}

function isMatch(firstCard, secondCard) {
    return (
        firstCard.type === CARD_TYPES.PAIR &&
        secondCard.type === CARD_TYPES.PAIR &&
        firstCard.pairKey === secondCard.pairKey
    );
}

function flipCard(state, id) {
    const isPlaying = state.status === GAME_STATUS.PLAYING;
    const isUnlocked = state.flippedIds.length < 2;
    const isNotOpen = !state.flippedIds.includes(id) && !state.matchedIds.includes(id);
    const card = getCard(state.cards, id);

    if (!isPlaying || !isUnlocked || !isNotOpen || !card) {
        return state;
    }

    let next = { ...state, flippedIds: [...state.flippedIds, id] };

    if (next.flippedIds.length === 2) {
        next = { ...next, moves: next.moves + 1 };
        const [firstId, secondId] = next.flippedIds;

        if (isMatch(getCard(next.cards, firstId), getCard(next.cards, secondId))) {
            next = {
                ...next,
                matchedIds: [...next.matchedIds, firstId, secondId],
                flippedIds: [],
            };
        }
    }
    return next;
}

export function gameReducer(state, action) {
    switch (action.type) {

        case ACTIONS.NEW_GAME:
            return createInitialState(action.cards);

        case ACTIONS.FLIP_CARD:
            return flipCard(state, action.id);

        case ACTIONS.CLEAR_FLIPPED:
            if (state.flippedIds.length != 2) {
                return state;
            }
            return { ...state, flippedIds: [] };

        default:
            return state;
    }
}
