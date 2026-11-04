const lens = document.getElementById('lens');
const barra = document.getElementById('eyes');
const olhos = document.querySelectorAll('#eyes img');
const movel = matchMedia('(max-width: 1099px)');
const cores = ['#0000ff', '#00ff00', '#ff0000'];   // azul, verde, vermelho
let atual = 0;

// muda o filtro (-1 = sem filtro, branco)
function mudarFiltro(n) {
  atual = n;
  lens.style.background = cores[n] || '#fff';
  olhos.forEach((o, i) => o.classList.toggle('on', i === n));
  barra.classList.toggle('tem-filtro', n >= 0);
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

// ---------- olhos ----------
olhos.forEach((o, i) => o.addEventListener('click', () => {
  if (!movel.matches) return mudarFiltro(i);                  // computador
  if (!barra.classList.contains('aberto')) return barra.classList.add('aberto');   // telemóvel: 1º toque separa
  mudarFiltro(atual === i ? -1 : i);                          // 2º toque escolhe (ou tira) o filtro
  barra.classList.remove('aberto');
}));

// tocar fora dos olhos volta a juntá-los
addEventListener('click', e => {
  if (!barra.contains(e.target)) barra.classList.remove('aberto');
});

// sobre os olhos a lente encolhe e faz de rato
barra.addEventListener('pointerenter', () => lens.classList.add('mini'));
barra.addEventListener('pointerleave', () => lens.classList.remove('mini'));

// ---------- título: ocupa sempre a largura toda do header ----------
const titulo = document.querySelector('h1');
function ajustarTitulo() {
  titulo.style.fontSize = '100px';
  titulo.style.fontSize = (100 * titulo.parentElement.clientWidth / titulo.offsetWidth) + 'px';
}
document.fonts.ready.then(ajustarTitulo);
addEventListener('resize', ajustarTitulo);

// ---------- início: computador em azul, telemóvel em branco ----------
function iniciar() {
  barra.classList.remove('aberto');
  mudarFiltro(movel.matches ? -1 : 0);
}
movel.addEventListener('change', iniciar);
iniciar();