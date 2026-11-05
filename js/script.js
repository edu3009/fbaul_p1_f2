const lens = document.getElementById('lens');
const cores = ['#0000ff', '#00ff00', '#ff0000'];
let atual = -1;

// n = -1 (sem filtro), 0 (azul), 1 (verde) ou 2 (vermelho)
function mudarFiltro(n) {
  atual = n;
  lens.hidden = false;

  if (n < 0) {
    lens.classList.add('neutro');
    lens.style.backgroundColor = '#000000';
  } else {
    lens.classList.remove('neutro');
    lens.style.backgroundColor = cores[n];
  }

  document.body.classList.toggle('com-lente', n >= 0);
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
  const k = 1 - Math.exp(-(agora - antes) / 60);   // 60 = suavidade (mais alto = mais lento)
  antes = agora;
  x += (alvoX - x) * k;
  y += (alvoY - y) * k;
  lens.style.left = x + 'px';
  lens.style.top = y + 'px';
  requestAnimationFrame(animar);
}
requestAnimationFrame(animar);

// ---------- clicar em qualquer sítio muda o filtro ----------
// sem filtro -> azul -> verde -> vermelho -> sem filtro
addEventListener('click', () => mudarFiltro(atual >= 2 ? -1 : atual + 1));

const titulo = document.querySelector('h1');
function ajustarTitulo() {
  titulo.style.fontSize = '100px';
  titulo.style.fontSize = (100 * titulo.parentElement.clientWidth / titulo.offsetWidth) + 'px';
}
document.fonts.ready.then(ajustarTitulo);
addEventListener('resize', ajustarTitulo);

mudarFiltro(-1);