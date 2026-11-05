const lens = document.getElementById('lens');
const cores = ['#0000ff', '#00ff00', '#ff0000'];
let atual = 0;

//mudar filtro
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

// lente segue o rato
let alvoX = innerWidth / 2, alvoY = innerHeight / 2;
let x = alvoX, y = alvoY;
let antes = 0;

addEventListener('pointermove', e => {
  alvoX = e.clientX;
  alvoY = e.clientY;
});

function animar(agora) {
  const k = 1 - Math.exp(-(agora - antes) / 60);   // 60 = suavidade 
  antes = agora;
  x += (alvoX - x) * k;
  y += (alvoY - y) * k;
  lens.style.left = x + 'px';
  lens.style.top = y + 'px';
  requestAnimationFrame(animar);
}
requestAnimationFrame(animar);

let tocouMobile = false;

function avancarFiltro() {
  mudarFiltro(atual >= 2 ? -1 : atual + 1);
}

// Mobile
window.addEventListener('pointerup', e => {
  if (e.pointerType === 'touch') {
    tocouMobile = true;
    avancarFiltro();
    setTimeout(() => { tocouMobile = false; }, 350);
  }
});

// Desktop
window.addEventListener('click', () => {
  if (tocouMobile) return;
  avancarFiltro();
});

// Titulo na tela toda
const titulo = document.querySelector('h1');
function ajustarTitulo() {
  titulo.style.fontSize = '100px';
  titulo.style.fontSize = (100 * titulo.parentElement.clientWidth / titulo.offsetWidth) + 'px';
}
document.fonts.ready.then(ajustarTitulo);
addEventListener('resize', ajustarTitulo);

mudarFiltro(0);