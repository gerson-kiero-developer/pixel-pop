const wheel = document.querySelector('#wheel');
const spinButton = document.querySelector('#spinButton');
const againButton = document.querySelector('#againButton');
const resultText = document.querySelector('#resultText');
const resultIcon = document.querySelector('#resultIcon');
const resultPanel = document.querySelector('#resultPanel');
const labels = document.createElement('div');
labels.className = 'wheel-labels';
labels.innerHTML = '<span>🍿</span><span>🍔</span><span>🍕</span><span>🎮</span><span>🎬</span><span>🍟</span>';
wheel.append(labels);
const options = [
  { text: 'Juega una partida de aventura', icon: '🎮', type: 'game' },
  { text: 'Prueba un juego de acción', icon: '🕹️', type: 'game' },
  { text: 'Noche de película y palomitas', icon: '🍿', type: 'movie' },
  { text: 'Mira una película de acción', icon: '🎬', type: 'movie' },
  { text: 'Pide una hamburguesa', icon: '🍔', type: 'food' },
  { text: 'Hoy toca pizza', icon: '🍕', type: 'food' }
];
let rotation = 0;
let spinning = false;
function spin(filter = null) {
  if (spinning) return;
  spinning = true;
  spinButton.disabled = true;
  resultPanel.classList.remove('is-new');
  const choices = filter ? options.filter(option => option.type === filter) : options;
  const winner = choices[Math.floor(Math.random() * choices.length)];
  // The wheel has six equal slices; rotate to land the selected slice under the pointer.
  const index = options.indexOf(winner);
  const slice = 360 / options.length;
  const target = 360 - (index * slice + slice / 2);
  const current = ((rotation % 360) + 360) % 360;
  rotation += 360 * 5 + ((target - current + 360) % 360);
  wheel.style.transform = `rotate(${rotation}deg)`;
  window.setTimeout(() => {
    resultIcon.textContent = winner.icon;
    resultText.textContent = winner.text;
    resultPanel.classList.add('is-new');
    spinning = false;
    spinButton.disabled = false;
  }, 4400);
}
spinButton.addEventListener('click', () => spin());
againButton.addEventListener('click', () => spin());
document.querySelectorAll('[data-pick]').forEach(link => link.addEventListener('click', () => {
  spin(link.dataset.pick);
}));
