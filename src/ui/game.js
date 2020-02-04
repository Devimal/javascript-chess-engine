import engine from '../engine/engine.js';

let board = null;
const game = new window.Chess();

function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
    // see if the move is legal
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // handle illegal move
    if (move === null) return 'snapback';

    // engine move
    setTimeout(() => {
        engine(game, board);
    }, 100);
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen());
}

const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};
board = window.Chessboard('myBoard', config);
