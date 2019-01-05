game.start = function () {
  function whenGameover() {
    const board = $('#board');
    board.style.display = 'block';
    board.innerHTML = '<p id="game-over"><br><b>GAME<br>OVER</b><br>Click here to restart!</p>';
    $('#game-over').addEventListener('click',
    function onclick() {
      game.reset();
      this.removeEventListener('click', onclick);
    });
  }

  function processStage(n) {
    game.stage.start(n, () => {
      setTimeout(() => {
        processStage(n + 1);
      }, 500);
    }, whenGameover);
  }

  setTimeout(() => {
    processStage(3);
  }, 1500);
}

game.reset = function () {
  game.lifePoint = GAME_INIT_LIFE_POINT;
  game.score = GAME_INIT_SCORE;

  $('#life').innerHTML = game.lifePoint;
  $('#score').innerHTML = game.score;
  $('#board').innerHTML = '';
  $('#board').style.display = 'grid';

  game.start();
}

window.addEventListener('DOMContentLoaded', () => {
  $('#version').innerHTML = game.version;
  game.reset();
});
