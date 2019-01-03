game.stage = {};

game.stage.start = function (size, winCallback, loseCallback) {
  let isGameStart = false;
  const board = $('#board'),
        VOL = size * size;

  function blockClickHandler() {
    const num = +this.getAttribute('number'),
          selectors = [];

    function reverse(color) {
      return (color === "black")? "white" : (color === "white")? "black" : color;
    }

    if (num % size)
      selectors.push(`
        #board > div[number="${num - 1}"]
      `);

    if ((num + 1) % size)
      selectors.push(`
        #board > div[number="${num + 1}"]
      `);

    if (num >= size)
      selectors.push(`
        #board > div[number="${num - size}"]
      `);

    if (VOL > num + size)
      selectors.push(`
        #board > div[number="${num + size}"]
      `);

    Array.from($$(
      selectors.toString()
    )).forEach(target => {
      target.className = reverse(target.className);
    });

    if (isGameStart) {
      const isWin = !(
        $$('#board > div.black').length
        *
        $$('#board > div.white').length
      );
      game.lifePoint = Math.floor(Math.max(
        0,
        game.lifePoint
          - 1 * (1 - isWin)
          + isWin * VOL * 2.5
      ));
      if (!game.lifePoint) {
        board.style.display = 'block';
        board.innerHTML = '<p id="game-over"><br><b>GAME<br>OVER</b></p>';
        loseCallback();
      }
      if (isWin) winCallback();
    }

    $('#life').innerHTML = game.lifePoint;
  }

  winCallback = winCallback || function () {};
  loseCallback = loseCallback || function () {};

  board.setAttribute('size', size);
  board.innerHTML = '';
  board.style.gridTemplateColumns = ('1fr ').repeat(size);

  const divs = [];
  for (let i = 0; i < VOL; i++) {
    const div = divs[i] = document.createElement('div');
    board.appendChild(div);
    div.className = 'black';
    div.setAttribute('number', i);
    div.addEventListener('click', blockClickHandler);
  }

  divs.forEach(div => {
    if (Math.round(Math.random()))
      blockClickHandler.call(div);
  })

  isGameStart = true;
}
