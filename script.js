// ============ CONFIGURAÇÃO ============
// ATENÇÃO: esta chave fica visível para quem abrir o site. Use uma chave nova/restrita.
const apiKey = "qa_sk_527648f1bd014bfdebf52431b2e6d507ad75d3ef";
const quizId = "cmu4n5soc00a4u3utwre0lpmk";

const TEMPO_PERGUNTA = 20;        // segundos por pergunta
const TEMPO_REVELAR = 1800;       // ms mostrando certo/errado
const OCIOSO_QUIZ = 60_000;       // volta ao início se ninguém mexer por 60s
const SEGUNDOS_FIM = 30;          // tela final volta sozinha ao início
const USAR_EXTRAS = true;         // false = só as perguntas da QuizAPI

// Fotos por posição da pergunta. As demais recebem uma ilustração.
const imagensPorIndice = {
  0: { src: "img/simon-baker.jpg", alt: "Simon Baker" },
  2: { src: "img/red-john.jpeg", alt: "Red John" },
  3: { src: "img/red-john.jpeg", alt: "Red John" }
};
const iconesPorIndice = { 1: "distintivo" };

// Ilustrações próprias (SVG, traço)
const ICONES = {
  distintivo: '<path d="M32 6 54 14V32C54 46 44 55 32 59 20 55 10 46 10 32V14Z"/><path d="M32 20 35.5 28 44 28.8 37.5 34.5 39.5 43 32 38.5 24.5 43 26.5 34.5 20 28.8 28.5 28Z"/>',
  lupa: '<circle cx="26" cy="26" r="16"/><path d="M38 38 56 56"/><path d="M19 22a9 9 0 0 1 8-6"/>',
  xicara: '<path d="M12 24H44V38C44 47 38 52 28 52 18 52 12 47 12 38Z"/><path d="M44 28H49A6 6 0 0 1 49 40H43"/><path d="M8 58H48"/><path d="M22 8C18 13 26 15 22 20M32 8C28 13 36 15 32 20"/>',
  tv: '<rect x="8" y="16" width="48" height="32" rx="5"/><path d="M24 6 32 16 40 6M24 56H40M32 48V56"/>',
  mapa: '<path d="M32 58C32 58 14 40 14 26A18 18 0 0 1 50 26C50 40 32 58 32 58Z"/><circle cx="32" cy="26" r="6"/>',
  claquete: '<rect x="8" y="26" width="48" height="28" rx="3"/><path d="M8 26 14 12H56L50 26M22 12 16 26M34 12 28 26M46 12 40 26"/>',
  lapis: '<path d="M12 52 16 40 44 12 52 20 24 48Z"/><path d="M38 18 46 26M12 52 24 48"/>',
  pessoas: '<circle cx="22" cy="22" r="8"/><path d="M6 52C6 40 14 34 22 34 30 34 38 40 38 52"/><circle cx="44" cy="24" r="6"/><path d="M42 36C50 36 58 42 58 52"/>',
  ator: '<circle cx="32" cy="22" r="10"/><path d="M12 56C12 42 21 36 32 36 43 36 52 42 52 56"/><path d="M28 36 32 44 36 36"/>',
  filmes: '<rect x="8" y="10" width="48" height="44" rx="4"/><path d="M8 22H56M8 42H56M20 10V54M44 10V54"/>'
};

// Perguntas extras, usadas depois das da QuizAPI (da mais fácil para a mais difícil).
const perguntasExtras = [
  {
    icone: "pessoas",
    text: "Qual é o primeiro nome da agente Lisbon, chefe da equipe da CBI?",
    answers: [{ text: "Grace" }, { text: "Teresa", isCorrect: true }, { text: "Angela" }, { text: "Charlotte" }]
  },
  {
    icone: "pessoas",
    text: "Qual é o primeiro nome do agente Cho?",
    answers: [{ text: "Wayne" }, { text: "Patrick" }, { text: "Kimball", isCorrect: true }, { text: "Dennis" }]
  },
  {
    icone: "distintivo",
    text: "O que significa a sigla CBI na série?",
    answers: [
      { text: "Central Bureau of Intelligence" },
      { text: "California Bureau of Investigation", isCorrect: true },
      { text: "Criminal Bureau of Interrogation" },
      { text: "Capital Bureau of Inspection" }
    ]
  },
  {
    icone: "lupa",
    text: "Qual era o nome da esposa e da filha de Patrick Jane, assassinadas por Red John?",
    answers: [
      { text: "Teresa e Lucy" }, { text: "Grace e Sophie" }, { text: "Madeleine e Emily" },
      { text: "Angela e Charlotte", isCorrect: true }
    ]
  },
  {
    icone: "ator",
    text: "Qual atriz interpreta a agente Teresa Lisbon?",
    answers: [
      { text: "Robin Tunney", isCorrect: true }, { text: "Amanda Righetti" },
      { text: "Jennifer Garner" }, { text: "Mariska Hargitay" }
    ]
  },
  {
    icone: "tv",
    text: "Como Patrick Jane ficou famoso antes de trabalhar com a CBI?",
    answers: [
      { text: "Como ilusionista de cassino" }, { text: "Como detetive particular" },
      { text: "Como falso médium na televisão", isCorrect: true },
      { text: "Como apresentador de programa de auditório" }
    ]
  },
  {
    icone: "mapa",
    text: "Em qual cidade da Califórnia fica a base da CBI na série?",
    answers: [{ text: "Los Angeles" }, { text: "San Diego" }, { text: "San Francisco" }, { text: "Sacramento", isCorrect: true }]
  },
  {
    icone: "ator",
    text: "Qual ator interpreta o agente Wayne Rigsby?",
    answers: [{ text: "Tim Kang" }, { text: "Owain Yeoman", isCorrect: true }, { text: "Rockmond Dunbar" }, { text: "Joe Spano" }]
  },
  {
    icone: "lapis",
    text: "Quem criou a série O Mentalista?",
    answers: [{ text: "Vince Gilligan" }, { text: "Dick Wolf" }, { text: "Bruno Heller", isCorrect: true }, { text: "Shonda Rhimes" }]
  },
  {
    icone: "filmes",
    text: "Quantos episódios a série tem no total, ao longo de suas 7 temporadas?",
    answers: [{ text: "98" }, { text: "124" }, { text: "151", isCorrect: true }, { text: "178" }]
  }
];

const curiosidades = [
  "O Mentalista foi exibido de 2008 a 2015 e teve 7 temporadas.",
  "Patrick Jane é interpretado por Simon Baker.",
  "A série acompanha um consultor da CBI que antes fingia ser vidente.",
  "O símbolo do Red John, o rosto sorridente, virou marca da série.",
  "Jane resolve casos observando detalhes e lendo as pessoas.",
  "A série foi criada por Bruno Heller e exibida pela rede CBS."
];

// ============ ESTADO ============
let perguntas = [];
let indice = 0;
let acertos = 0;
let sequencia = 0;
let respostas = [];
let tempoTotalMs = 0;
let inicioPergunta = 0;
let bloqueado = false;
let telaAtual = "inicio";
let timerId = null;
let ociosoId = null;
let fimId = null;
let curiosidadeId = null;
let curiosidadeIdx = 0;
let nomeSalvo = false;

const $ = (id) => document.getElementById(id);
const esc = (t) => { const d = document.createElement("div"); d.textContent = t ?? ""; return d.innerHTML; };

// armazenamento seguro (pode falhar em modo privado)
const LS = {
  ler(k, padrao) { try { const v = localStorage.getItem(k); return v === null ? padrao : v; } catch { return padrao; } },
  gravar(k, v) { try { localStorage.setItem(k, v); } catch { /* ignora */ } }
};

// ============ SOM ============
let audioCtx = null;
let somLigado = LS.ler("mentalista_som", "1") === "1";

function tom(freq, dur, tipo = "sine", atraso = 0, vol = 0.16) {
  if (!somLigado) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t0 = audioCtx.currentTime + atraso;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = tipo;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch { /* sem áudio */ }
}
const somAcerto = () => { tom(660, 0.14, "sine", 0); tom(990, 0.22, "sine", 0.1); };
const somErro   = () => { tom(200, 0.28, "sawtooth", 0, 0.1); tom(150, 0.3, "sawtooth", 0.12, 0.1); };
const somFim    = () => [523, 659, 784, 1047].forEach((f, i) => tom(f, 0.25, "triangle", i * 0.13));
const somTique  = () => tom(880, 0.05, "square", 0, 0.05);

function atualizarBotaoSom() {
  $("btn-som").classList.toggle("mudo", !somLigado);
  $("btn-som").setAttribute("aria-pressed", String(somLigado));
}

// ============ TELAS ============
function irPara(nome) {
  telaAtual = nome;
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  $("tela-" + nome).classList.add("ativa");
  window.scrollTo(0, 0);

  clearInterval(fimId);
  clearTimeout(ociosoId);
  if (nome === "inicio") { iniciarCuriosidades(); renderRankingInicio(); } else pararCuriosidades();
  if (nome === "quiz") reiniciarOcioso();
}

// ============ CURIOSIDADES ============
function mostrarCuriosidade() {
  const caixa = $("curiosidade");
  caixa.classList.add("some");
  setTimeout(() => {
    $("curiosidade-texto").textContent = curiosidades[curiosidadeIdx % curiosidades.length];
    curiosidadeIdx++;
    caixa.classList.remove("some");
  }, 450);
}
function iniciarCuriosidades() {
  pararCuriosidades();
  curiosidadeIdx = Math.floor(Math.random() * curiosidades.length);
  mostrarCuriosidade();
  curiosidadeId = setInterval(mostrarCuriosidade, 6000);
}
function pararCuriosidades() { clearInterval(curiosidadeId); }

// ============ RANKING (salvo neste navegador) ============
function lerRanking() {
  try { const l = JSON.parse(LS.ler("mentalista_ranking", "[]")); return Array.isArray(l) ? l : []; }
  catch { return []; }
}
function ordenarRanking(lista) {
  return lista.sort((a, b) => (b.acertos / b.total - a.acertos / a.total) || (a.ms - b.ms));
}
function renderRanking(ul, lista, qtd, destaqueId) {
  ul.innerHTML = ordenarRanking([...lista]).slice(0, qtd).map((r, i) => `
    <li class="${r.id === destaqueId ? "destaque" : ""}">
      <span class="pos">${i + 1}</span>
      <span class="nome">${esc(r.nome)}</span>
      <span class="pts">${r.acertos}/${r.total}</span>
      <span class="tempo">${Math.round(r.ms / 1000)}s</span>
    </li>`).join("");
}
function renderRankingInicio() {
  const lista = lerRanking();
  $("ranking-inicio").classList.toggle("d-none", lista.length === 0);
  if (lista.length) renderRanking($("ranking-inicio-lista"), lista, 3);
}

// ============ API ============
async function buscarPerguntas() {
  const btn = $("btn-comecar");
  btn.disabled = true;
  btn.classList.remove("pronto");
  $("spin-inicio").classList.remove("d-none");
  $("txt-comecar").textContent = "Carregando perguntas...";
  $("erro-inicio").classList.add("d-none");

  try {
    const resposta = await axios.get("https://quizapi.io/api/v1/questions", {
      params: { quiz_id: quizId, include_answers: "true" },
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    perguntas = resposta.data.data;
    if (!Array.isArray(perguntas) || perguntas.length === 0) throw new Error("Quiz sem perguntas");
    if (USAR_EXTRAS) perguntas = [...perguntas, ...perguntasExtras];

    $("spin-inicio").classList.add("d-none");
    $("txt-comecar").textContent = "Começar o quiz";
    btn.disabled = false;
    btn.classList.add("pronto");
    $("info-qtd").textContent = perguntas.length;
    $("info-tempo").textContent = TEMPO_PERGUNTA;
    $("info-quiz").classList.remove("d-none");
  } catch (erro) {
    console.error("Erro ao buscar perguntas:", erro);
    $("spin-inicio").classList.add("d-none");
    $("txt-comecar").textContent = "Tentar novamente";
    btn.disabled = false;
    btn.dataset.retry = "1";
    $("erro-inicio").textContent = "Não foi possível carregar o quiz. Verifique a internet e a chave da API.";
    $("erro-inicio").classList.remove("d-none");
  }
}

// ============ JOGO ============
function comecarQuiz() {
  indice = 0;
  acertos = 0;
  sequencia = 0;
  tempoTotalMs = 0;
  respostas = [];
  $("placar-num").textContent = "0";
  $("sequencia").classList.add("d-none");
  somTique();
  irPara("quiz");
  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[indice];
  bloqueado = false;

  $("badge-pergunta").textContent = `PERGUNTA ${indice + 1} DE ${perguntas.length}`;
  $("barra-geral").style.width = `${(indice / perguntas.length) * 100}%`;

  const foto = imagensPorIndice[indice];
  if (foto) {
    $("area-imagem").innerHTML = `<img src="${foto.src}" alt="${esc(foto.alt)}" class="imagem-pergunta" />`;
  } else {
    const icone = ICONES[pergunta.icone || iconesPorIndice[indice]] || ICONES.lupa;
    $("area-imagem").innerHTML = `<div class="ilustracao" aria-hidden="true"><svg viewBox="0 0 64 64">${icone}</svg></div>`;
  }

  $("texto-pergunta").textContent = pergunta.text;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";

  const letras = "ABCDEFGH";
  $("opcoes").innerHTML = pergunta.answers.map((a, i) => `
    <button class="opcao" data-index="${i}">
      <span class="letra">${letras[i] ?? i + 1}</span>
      <span>${esc(a.text)}</span>
    </button>`).join("");

  const card = $("card-pergunta");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "entrar .35s ease both";

  iniciarTimer();
}

function iniciarTimer() {
  clearInterval(timerId);
  const inicio = performance.now();
  inicioPergunta = inicio;
  atualizarTimer(TEMPO_PERGUNTA);

  timerId = setInterval(() => {
    const restante = TEMPO_PERGUNTA - (performance.now() - inicio) / 1000;
    if (restante <= 0) {
      clearInterval(timerId);
      atualizarTimer(0);
      responder(-1);
    } else {
      atualizarTimer(restante);
    }
  }, 100);
}

function atualizarTimer(restante) {
  const urgente = restante <= 5;
  $("barra-timer").style.width = Math.max(0, (restante / TEMPO_PERGUNTA) * 100) + "%";
  $("barra-timer").classList.toggle("urgente", urgente);
  $("timer-num").textContent = Math.ceil(restante);
  $("timer-num").classList.toggle("urgente", urgente);
}

function responder(indiceEscolhido) {
  if (bloqueado) return;
  bloqueado = true;
  clearInterval(timerId);
  reiniciarOcioso();

  const pergunta = perguntas[indice];
  const acertou = indiceEscolhido >= 0 && !!pergunta.answers[indiceEscolhido].isCorrect;
  respostas.push(acertou);
  tempoTotalMs += indiceEscolhido === -1
    ? TEMPO_PERGUNTA * 1000
    : Math.min(performance.now() - inicioPergunta, TEMPO_PERGUNTA * 1000);

  if (acertou) {
    acertos++;
    sequencia++;
    $("placar-num").textContent = acertos;
    const pill = $("placar");
    pill.classList.add("pulo");
    setTimeout(() => pill.classList.remove("pulo"), 300);
    somAcerto();
    if (sequencia >= 2) {
      const s = $("sequencia");
      s.textContent = `Sequência x${sequencia}`;
      s.classList.remove("d-none");
      s.style.animation = "none"; void s.offsetWidth; s.style.animation = "";
    }
  } else {
    sequencia = 0;
    $("sequencia").classList.add("d-none");
    somErro();
  }

  document.querySelectorAll(".opcao").forEach((botao, i) => {
    botao.disabled = true;
    if (pergunta.answers[i].isCorrect) botao.classList.add("correta");
    else if (i === indiceEscolhido) botao.classList.add("errada");
    else botao.classList.add("apagada");
  });

  const fb = $("feedback");
  if (acertou) { fb.textContent = "Muito bem! Patrick Jane aprovaria."; fb.className = "feedback ok"; }
  else if (indiceEscolhido === -1) { fb.textContent = "O tempo acabou!"; fb.className = "feedback erro"; }
  else { fb.textContent = "Não foi dessa vez."; fb.className = "feedback erro"; }

  setTimeout(() => {
    indice++;
    if (indice < perguntas.length) mostrarPergunta();
    else mostrarResultado();
  }, TEMPO_REVELAR);
}

// ============ RESULTADO ============
function mostrarResultado() {
  $("barra-geral").style.width = "100%";
  const total = perguntas.length;
  const pct = Math.round((acertos / total) * 100);

  let rank, frase;
  if (pct === 100)    { rank = "Consultor Genial";    frase = "Perfeito! Nem o Red John te enganaria."; }
  else if (pct >= 75) { rank = "Agente da CBI";       frase = "Ótimo trabalho, você conhece bem a série."; }
  else if (pct >= 50) { rank = "Investigador Júnior"; frase = "Bom começo. Ainda tem pistas para descobrir."; }
  else                { rank = "Suspeito Inocente";   frase = "Hora de maratonar O Mentalista de novo!"; }

  $("fim-rank").textContent = rank;
  $("fim-frase").textContent = frase;
  $("fim-pct").textContent = pct + "%";
  $("fim-detalhe").textContent = `${acertos} de ${total} acertos`;
  $("fim-extra").textContent = `Tempo total: ${Math.round(tempoTotalMs / 1000)}s`;
  $("fim-pontos").innerHTML = respostas
    .map((ok, i) => `<span class="ponto ${ok ? "ok" : "erro"}" title="Pergunta ${i + 1}">${ok ? "&#10003;" : "&#10007;"}</span>`)
    .join("");

  // ranking
  nomeSalvo = false;
  $("input-nome").value = "";
  $("form-nome").classList.remove("d-none");
  const lista = lerRanking();
  $("ranking-fim").classList.toggle("d-none", lista.length === 0);
  if (lista.length) renderRanking($("ranking-fim-lista"), lista, 5);

  const cor = pct >= 75 ? "var(--ok)" : pct >= 50 ? "var(--dourado)" : "var(--erro)";
  const anel = $("anel-valor");
  anel.style.stroke = cor;
  anel.style.transition = "none";
  anel.style.strokeDashoffset = 326.7;

  irPara("fim");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    anel.style.transition = "";
    anel.style.strokeDashoffset = 326.7 * (1 - pct / 100);
  }));

  somFim();
  if (pct >= 75) confete();
  iniciarContagemFim(SEGUNDOS_FIM);
}

function iniciarContagemFim(segundos) {
  clearInterval(fimId);
  let restam = segundos;
  const aviso = $("fim-auto");
  aviso.textContent = `Voltando ao início em ${restam}s`;
  fimId = setInterval(() => {
    restam--;
    if (restam <= 0) { voltarInicio(); return; }
    aviso.textContent = `Voltando ao início em ${restam}s`;
  }, 1000);
}

function salvarNoRanking(e) {
  e.preventDefault();
  if (nomeSalvo) return;
  nomeSalvo = true;
  const nome = $("input-nome").value.trim() || "Anônimo";
  const entrada = { id: Date.now(), nome, acertos, total: perguntas.length, ms: Math.round(tempoTotalMs) };
  const lista = lerRanking();
  lista.push(entrada);
  LS.gravar("mentalista_ranking", JSON.stringify(ordenarRanking(lista).slice(0, 50)));

  $("form-nome").classList.add("d-none");
  $("ranking-fim").classList.remove("d-none");
  renderRanking($("ranking-fim-lista"), lista, 5, entrada.id);
  somAcerto();
  iniciarContagemFim(20);
}

function voltarInicio() {
  clearInterval(timerId);
  clearInterval(fimId);
  bloqueado = true;
  irPara("inicio");
}

// ============ CONFETE ============
function confete() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = $("confete");
  const ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const cores = ["#ff4d6a", "#c8102e", "#e8c27a", "#2fd39a", "#eceef4"];
  const ps = Array.from({ length: 140 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    r: 4 + Math.random() * 5, vy: 2 + Math.random() * 3.5, vx: -1.5 + Math.random() * 3,
    rot: Math.random() * 6, vr: -0.2 + Math.random() * 0.4,
    cor: cores[(Math.random() * cores.length) | 0]
  }));
  const fim = performance.now() + 4000;
  (function quadro(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.cor; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    if (t < fim) requestAnimationFrame(quadro); else ctx.clearRect(0, 0, c.width, c.height);
  })(performance.now());
}

// ============ OCIOSO (bancada) ============
function reiniciarOcioso() {
  clearTimeout(ociosoId);
  if (telaAtual !== "quiz") return;
  ociosoId = setTimeout(voltarInicio, OCIOSO_QUIZ);
}

// ============ EVENTOS ============
$("btn-comecar").addEventListener("click", (e) => {
  if (e.currentTarget.dataset.retry) { delete e.currentTarget.dataset.retry; buscarPerguntas(); }
  else comecarQuiz();
});
$("btn-reiniciar").addEventListener("click", comecarQuiz);
$("btn-inicio").addEventListener("click", voltarInicio);
$("form-nome").addEventListener("submit", salvarNoRanking);

// pausa o retorno automático enquanto a pessoa digita o nome
$("input-nome").addEventListener("focus", () => { clearInterval(fimId); $("fim-auto").textContent = ""; });
$("input-nome").addEventListener("blur", () => { if (!nomeSalvo && telaAtual === "fim") iniciarContagemFim(20); });

$("btn-som").addEventListener("click", () => {
  somLigado = !somLigado;
  LS.gravar("mentalista_som", somLigado ? "1" : "0");
  atualizarBotaoSom();
  somTique();
});
if (document.fullscreenEnabled) {
  $("btn-tela-cheia").addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  });
} else {
  $("btn-tela-cheia").classList.add("d-none");
}

$("opcoes").addEventListener("click", (e) => {
  const botao = e.target.closest(".opcao");
  if (botao) responder(Number(botao.dataset.index));
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.tagName === "INPUT") return; // digitando o nome
  const btn = $("btn-comecar");

  if (telaAtual === "inicio" && (e.key === "Enter" || e.key === " ") && !btn.disabled && !btn.dataset.retry) {
    e.preventDefault();
    comecarQuiz();
    return;
  }
  if (telaAtual === "quiz" && !bloqueado) {
    let i = -1;
    if (/^[1-9]$/.test(e.key)) i = Number(e.key) - 1;
    else if (/^[a-hA-H]$/.test(e.key)) i = e.key.toLowerCase().charCodeAt(0) - 97;
    if (i >= 0 && i < perguntas[indice].answers.length) { e.preventDefault(); responder(i); }
    return;
  }
  if (telaAtual === "fim" && e.key === "Enter") { e.preventDefault(); comecarQuiz(); }
});

["pointerdown", "keydown", "touchstart"].forEach(ev =>
  document.addEventListener(ev, reiniciarOcioso, { passive: true })
);

// ============ INÍCIO ============
atualizarBotaoSom();
iniciarCuriosidades();
renderRankingInicio();
buscarPerguntas();