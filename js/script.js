const lens = document.getElementById('lens');
const btn = document.getElementById('filtro-btn');
const hint = document.getElementById('filtro-hint');
const cores = ['#0000ff', '#00ff00', '#ff0000'];
let atual = 0;

function mudarFiltro(n) {
  atual = n;
  lens.hidden = false;

  if (n < 0) {
    lens.classList.add('neutro');
    lens.style.backgroundColor = '#000000';
    // No neutro, a borda continua visível a preto
    if (btn) btn.style.borderColor = '#000000';
  } else {
    lens.classList.remove('neutro');
    lens.style.backgroundColor = cores[n];
    // Borda acompanha a cor do filtro ativo
    if (btn) btn.style.borderColor = cores[n];
  }

  document.body.classList.toggle('com-lente', n >= 0);

  // "click me" só aparece enquanto estiver no filtro azul (n === 0)
  if (hint) {
    hint.classList.toggle('visivel', n === 0);
  }
}

// ---------- a lente segue o rato com um smoothing leve ----------
let alvoX = innerWidth / 2, alvoY = innerHeight / 2;
let x = alvoX, y = alvoY;
let antes = 0;

addEventListener('pointermove', e => {
  alvoX = e.clientX;
  alvoY = e.clientY;
});

function animar(agora) {
  const k = 1 - Math.exp(-(agora - antes) / 60);
  antes = agora;
  x += (alvoX - x) * k;
  y += (alvoY - y) * k;
  lens.style.left = x + 'px';
  lens.style.top = y + 'px';
  requestAnimationFrame(animar);
}
requestAnimationFrame(animar);

// ---------- função para avançar o ciclo de cores ----------
function avancarFiltro() {
  mudarFiltro(atual >= 2 ? -1 : atual + 1);
}

// Mobile: clica no botão redondo
btn.addEventListener('click', e => {
  e.stopPropagation();
  avancarFiltro();
});

// Desktop: clica em qualquer ponto da página
window.addEventListener('click', () => {
  if (window.innerWidth <= 1099) return;
  avancarFiltro();
});

// ---------- ajuste de tipo do título ----------
const titulo = document.querySelector('h1');
function ajustarTitulo() {
  titulo.style.fontSize = '100px';
  titulo.style.fontSize = (100 * titulo.parentElement.clientWidth / titulo.offsetWidth) + 'px';
}
document.fonts.ready.then(ajustarTitulo);
addEventListener('resize', ajustarTitulo);

// Começa com a lente azul e aplica a borda azul logo de início
mudarFiltro(0);