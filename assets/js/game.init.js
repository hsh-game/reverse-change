window.addEventListener('DOMContentLoaded', () => {
  $('#version').innerHTML = game.version;
  $('#life').innerHTML = game.lifePoint;

  function processStage(n) {
    game.stage.start(n, () => {
      setTimeout(() => {
        processStage(n + 1);
      }, 500);
    });
  }

  setTimeout(() => {
    processStage(3);
  }, 1500);
});
