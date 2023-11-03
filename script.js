'use strict';

//Selecting Elements
const btnEnter = document.querySelector('.btn--enter');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const show = document.querySelectorAll('.btn--rules');

//Variables
let currentscore,
  score,
  player,
  run,
  change,
  p0,
  p1,
  win = false,
  winner;

//Start condition
const Startgame = function () {
  currentscore = [0, 0];
  score = [0, 0];
  player = 0;
  run = true;
  change = false;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winnerner');
  player1.classList.remove('player--winner');
};

//Play starting
Startgame();

//Open Rules
const open = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const close = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < show.length; i++) {
  show[i].addEventListener('click', open);
}
document.querySelector('.close-modal').addEventListener('click', close);
overlay.addEventListener('click', close);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    close();
  }
});

//Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = currentscore[
    player
  ] = 0;
  player = player === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Botton enter
btnEnter.addEventListener('click', function () {
  p0 = document.querySelector('.p0').value;
  p1 = document.querySelector('.p1').value;
  if (p0) document.getElementById('name--0').textContent = p0;
  else {
    p0 = 'Player 1';
    document.getElementById('name--0').textContent = p0;
  }
  if (p1) document.getElementById('name--1').textContent = p1;
  else {
    p1 = 'Player 2';
    document.getElementById('name--1').textContent = p1;
  }
  document.querySelector('.start').classList.add('hidden');
  document.querySelector('.game').classList.remove('hidden');
});
document.querySelector('.out').addEventListener('click', function () {
  document.querySelector('.start').classList.remove('hidden');
  document.querySelector('.game').classList.add('hidden');
});

//Botton roll
btnRoll.addEventListener('click', function () {
  if (run) {
    change = true;
    //Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Displayd dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice/dice-${dice}.png`;

    //Check if dice is 1
    if (dice !== 1) {
      currentscore[player] += dice;
      document.getElementById(`current--${player}`).textContent =
        currentscore[player];
    }
    //Switch to next player
    else switchPlayer();
  }
});

//Botton hold
btnHold.addEventListener('click', function () {
  if (change && run) {
    //Calulate Score
    score[player] += currentscore[player];
    document.getElementById(`score--${player}`).textContent = score[player];

    //Check if he wins or not
    if (score[player] >= 100) {
      win = true;
      winner = player;
      document.querySelector(`#name--${player}`).textContent = 'Winner';
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
      run = false;
      diceEl.classList.add('hidden');
    }
    //Switch Player
    else switchPlayer();
    change = false;
  }
});

//Botton New
btnNew.addEventListener('click', function () {
  if (win) {
    winner
      ? (document.querySelector(`#name--${winner}`).textContent = p1)
      : (document.querySelector(`#name--${winner}`).textContent = p0);
  }
  Startgame();
});
