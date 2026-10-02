
export const GAME_DURATION_SECONDS = 50;
export const BOMB_PENALTY_SECONDS = 10;
export const TIME_BONUS_SECONDS = 10;
export const MISMATCH_DELAY_MS = 800;
export const TICK_INTERVAL_MS = 1000;
export const LOW_TIME_THRESHOLD_SECONDS = 10;
export const PAIR_SYMBOLS = ['', '', '', '', ''];
export const BOMB_SYMBOL = '';
export const TIME_SYMBOL = '⏱';
export const TOTAL_PAIRS = PAIR_SYMBOLS.length;
export const TOTAL_PAIR_CARDS = TOTAL_PAIRS * 2;
export const CARD_TYPES = {
    PAIR: 'pair',
    BOMB: 'bomb',
    TIME: 'time',
};
export const GAME_STATUS = {
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
};
export const ACTIONS = {
    NEW_GAME: 'NEW_GAME',
    FLIP_CARD: 'FLIP_CARD',
    CLEAR_FLIPPED: 'CLEAR_FLIPPED',
    TICK: 'TICK',
};
