function engine(game, board) {
    const possibleMoves = game.moves();

    // game over
    if (possibleMoves.length === 0) return;

    // pick move
    const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);

    // make move
    game.move(possibleMoves[randomMoveIndex]);
    board.position(game.fen());
}

export default engine;
