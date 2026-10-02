import { BOMB_SYMBOL, CARD_TYPES, PAIR_SYMBOLS, TIME_SYMBOL } from './constants';

export function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function createDeck() {
    const pairCards = PAIR_SYMBOLS.flatMap((symbol) => [
        { type: CARD_TYPES.PAIR, symbol, pairKey: symbol },
        { type: CARD_TYPES.PAIR, symbol, pairKey: symbol },
    ]);
    const specialCards = [
        { type: CARD_TYPES.BOMB, symbol: BOMB_SYMBOL },
        { type: CARD_TYPES.TIME, symbol: TIME_SYMBOL },
    ];
    return shuffle([...pairCards, ...specialCards]).map((card, index) => ({
        ...card,
        id: index,
    }));
}
