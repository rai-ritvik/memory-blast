import {
    ACTIONS,
    BOMB_PENALTY_SECONDS,
    CARD_TYPES,
    GAME_DURATION_SECONDS,
    GAME_STATUS,
    TIME_BONUS_SECONDS,
    TOTAL_PAIR_CARDS,
} from './constants';

export function createInitialState(cards, gameId = 0) {
    return {
        gameId,
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

function applySpeciallEffect(state, card) {
    const isSpecial = card.type == CARD_TYPES.BOMB || card.type == CARD_TYPES.TIME;

    if (!isSpecial || state.usedSpecialIds.includes(card.id)) {
        return state;
    }

    const change = card.type == CARD_TYPES.BOMB ? -BOMB_PENALTY_SECONDS : TIME_BONUS_SECONDS;
    const timeLeft = Math.max(0, state.timeLeft + change);

    return {
        ...state,
        timeLeft,
        usedSpecialIds: [...state.usedSpecialIds, card.id],
        status: timeLeft == 0 ? GAME_STATUS.LOST : state.status,
    };
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

    next = applySpeciallEffect(next, card);

    if (next.flippedIds.length === 2) {
        next = { ...next, moves: next.moves + 1 };
        const [firstId, secondId] = next.flippedIds;

        if (isMatch(getCard(next.cards, firstId), getCard(next.cards, secondId))) {
            next = {
                ...next,
                matchedIds: [...next.matchedIds, firstId, secondId],
                flippedIds: [],
            };

            if (next.matchedIds.length === TOTAL_PAIR_CARDS) {
                next = { ...next, status: GAME_STATUS.WON };
            }
        }
    }
    return next;
}

export function gameReducer(state, action) {
    switch (action.type) {

        case ACTIONS.NEW_GAME:
            return createInitialState(action.cards, state.gameId + 1);

        case ACTIONS.FLIP_CARD:
            return flipCard(state, action.id);

        case ACTIONS.CLEAR_FLIPPED:
            if (state.flippedIds.length != 2) {
                return state;
            }
            return { ...state, flippedIds: [] };

        case ACTIONS.TICK: {
            if (state.status != GAME_STATUS.PLAYING) {
                return state;
            }
            const timeLeft = Math.max(0, state.timeLeft - 1);
            return {
                ...state,
                timeLeft,
                status: timeLeft == 0 ? GAME_STATUS.LOST : state.status,
            };
        }

        default:
            return state;
    }
}
