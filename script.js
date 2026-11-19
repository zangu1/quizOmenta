// ============ CONFIGURAÇÃO ============
// ATENÇÃO: esta chave fica visível para quem abrir o site. Use uma chave nova/restrita.
const apiKey = "qa_sk_527648f1bd014bfdebf52431b2e6d507ad75d3ef";
const quizId = "cmu4n5soc00a4u3utwre0lpmk";

const TEMPO_PERGUNTA = 20;        // segundos por pergunta
const TEMPO_REVELAR = 1800;       // ms mostrando certo/errado
const OCIOSO_QUIZ = 60_000;       // volta ao início se ninguém mexer por 60s
const SEGUNDOS_FIM = 30;          // tela final volta sozinha ao início
const USAR_EXTRAS = true;         // false = só as perguntas da QuizAPI
const QTD_POR_PARTIDA = 10;       // quantas perguntas por partida (sorteadas). 0 = todas

// Perguntas extras, usadas depois das da QuizAPI (da mais fácil para a mais difícil).
const perguntasExtras = [
  {
    text: "Qual é o primeiro nome da agente Lisbon, chefe da equipe da CBI?",
    answers: [{ text: "Grace" }, { text: "Teresa", isCorrect: true }, { text: "Angela" }, { text: "Charlotte" }]
  },
  {
    text: "Qual é o primeiro nome do agente Cho?",
    answers: [{ text: "Wayne" }, { text: "Patrick" }, { text: "Kimball", isCorrect: true }, { text: "Dennis" }]
  },
  {
    text: "O que significa a sigla CBI na série?",
    answers: [
      { text: "Central Bureau of Intelligence" },
      { text: "California Bureau of Investigation", isCorrect: true },
      { text: "Criminal Bureau of Interrogation" },
      { text: "Capital Bureau of Inspection" }
    ]
  },
  {
    text: "Qual era o nome da esposa e da filha de Patrick Jane, assassinadas por Red John?",
    answers: [
      { text: "Teresa e Lucy" }, { text: "Grace e Sophie" }, { text: "Madeleine e Emily" },
      { text: "Angela e Charlotte", isCorrect: true }
    ]
  },
  {
    text: "Qual atriz interpreta a agente Teresa Lisbon?",
    answers: [
      { text: "Robin Tunney", isCorrect: true }, { text: "Amanda Righetti" },
      { text: "Jennifer Garner" }, { text: "Mariska Hargitay" }
    ]
  },
  {
    text: "Como Patrick Jane ficou famoso antes de trabalhar com a CBI?",
    answers: [
      { text: "Como ilusionista de cassino" }, { text: "Como detetive particular" },
      { text: "Como falso médium na televisão", isCorrect: true },
      { text: "Como apresentador de programa de auditório" }
    ]
  },
  {
    text: "Em qual cidade da Califórnia fica a base da CBI na série?",
    answers: [{ text: "Los Angeles" }, { text: "San Diego" }, { text: "San Francisco" }, { text: "Sacramento", isCorrect: true }]
  },
  {
    text: "Qual ator interpreta o agente Wayne Rigsby?",
    answers: [{ text: "Tim Kang" }, { text: "Owain Yeoman", isCorrect: true }, { text: "Rockmond Dunbar" }, { text: "Joe Spano" }]
  },
  {
    text: "Quem criou a série O Mentalista?",
    answers: [{ text: "Vince Gilligan" }, { text: "Dick Wolf" }, { text: "Bruno Heller", isCorrect: true }, { text: "Shonda Rhimes" }]
  },
  {
    text: "Quantos episódios a série tem no total, ao longo de suas 7 temporadas?",
    answers: [{ text: "98" }, { text: "124" }, { text: "151", isCorrect: true }, { text: "178" }]
  },
  {
    text: "Qual emissora americana exibiu a série O Mentalista?",
    answers: [{ text: "NBC" }, { text: "CBS", isCorrect: true }, { text: "ABC" }, { text: "Fox" }]
  },
  {
    text: "Em que data a série estreou nos Estados Unidos?",
    answers: [
      { text: "15 de outubro de 2007" }, { text: "7 de janeiro de 2009" },
      { text: "23 de setembro de 2008", isCorrect: true }, { text: "2 de março de 2010" }
    ]
  },
  {
    text: "Qual ator da série foi indicado ao Emmy de 2009 como melhor ator em série dramática?",
    answers: [{ text: "Tim Kang" }, { text: "Owain Yeoman" }, { text: "Rockmond Dunbar" }, { text: "Simon Baker", isCorrect: true }]
  },
  {
    text: "Em qual temporada, mais ou menos no meio dela, o caso Red John é solucionado?",
    answers: [{ text: "3ª temporada" }, { text: "4ª temporada" }, { text: "6ª temporada", isCorrect: true }, { text: "7ª temporada" }]
  },
  {
    text: "Qual ator interpreta Dennis Abbott, personagem do elenco principal na 6ª temporada?",
    answers: [{ text: "Rockmond Dunbar", isCorrect: true }, { text: "Tim Kang" }, { text: "Owain Yeoman" }, { text: "Joe Spano" }]
  },
  {
    text: "Em 2009, a série ganhou um prêmio da TCA (Television Critics Association). Em qual categoria?",
    answers: [
      { text: "Melhor ator em série dramática" }, { text: "Melhor roteiro" },
      { text: "Melhor novo programa", isCorrect: true }, { text: "Melhor série cômica" }
    ]
  },
  {
    text: "Bruno Heller, criador de O Mentalista, também desenvolveu qual série da HBO?",
    answers: [{ text: "Deadwood" }, { text: "The Wire" }, { text: "Oz" }, { text: "Rome", isCorrect: true }]
  },
  {
    text: "Em que data terminou a série, com o fim da 7ª temporada?",
    answers: [
      { text: "12 de maio de 2014" }, { text: "18 de fevereiro de 2015", isCorrect: true },
      { text: "29 de abril de 2015" }, { text: "25 de março de 2013" }
    ]
  },
  {
    text: "Quantos milhões de espectadores assistiram à estreia da série, em sua primeira exibição?",
    answers: [{ text: "5,2 milhões" }, { text: "9,8 milhões" }, { text: "15,6 milhões", isCorrect: true }, { text: "22,4 milhões" }]
  },
  {
    text: "Qual era o nome completo da filha de Patrick Jane?",
    answers: [
      { text: "Charlotte Rose Jane" }, { text: "Emily Anne Jane" },
      { text: "Angela Charlotte Jane" }, { text: "Charlotte Anne Jane", isCorrect: true }
    ]
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
let banco = [];       // todas as perguntas disponíveis
let perguntas = [];   // perguntas da partida atual
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
// Mudar o número abaixo (v3, v4...) zera o ranking de todo mundo.
const CHAVE_RANKING = "mentalista_ranking_v2";
function lerRanking() {
  try {
    const l = JSON.parse(LS.ler(CHAVE_RANKING, "[]"));
    // só vale partida com a mesma quantidade de perguntas da atual
    return Array.isArray(l) ? l.filter(r => r.total === totalPorPartida()) : [];
  } catch { return []; }
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

    banco = resposta.data.data;
    if (!Array.isArray(banco) || banco.length === 0) throw new Error("Quiz sem perguntas");
    if (USAR_EXTRAS) banco = [...banco, ...perguntasExtras];

    $("spin-inicio").classList.add("d-none");
    $("txt-comecar").textContent = "Começar o quiz";
    btn.disabled = false;
    btn.classList.add("pronto");
    $("info-qtd").textContent = totalPorPartida();
    renderRankingInicio();
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
// perguntas já usadas nas últimas partidas (para não repetir enquanto houver novas)
const vistas = new Set();

function embaralhar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function totalPorPartida() {
  return QTD_POR_PARTIDA ? Math.min(QTD_POR_PARTIDA, banco.length) : banco.length;
}

// sorteia as perguntas, a ordem delas e a ordem das alternativas
function sortearPerguntas() {
  const n = totalPorPartida();
  const todas = banco.map((_, i) => i);
  const novas = todas.filter(i => !vistas.has(i));

  let escolhidas;
  if (novas.length >= n) {
    escolhidas = embaralhar(novas).slice(0, n);
  } else {
    // acabaram as novas: usa as que sobraram e completa com outras, recomeçando o ciclo
    const completar = embaralhar(todas.filter(i => vistas.has(i))).slice(0, n - novas.length);
    escolhidas = [...novas, ...completar];
    vistas.clear();
  }
  escolhidas.forEach(i => vistas.add(i));

  return embaralhar(escolhidas).map(i => ({ ...banco[i], answers: embaralhar(banco[i].answers) }));
}

function comecarQuiz() {
  perguntas = sortearPerguntas();
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
  LS.gravar(CHAVE_RANKING, JSON.stringify(ordenarRanking(lista).slice(0, 50)));

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

  if (telaAtual === "inicio" && e.shiftKey && e.key === "Delete") {
    e.preventDefault();
    if (confirm("Zerar o ranking?")) { LS.gravar(CHAVE_RANKING, "[]"); renderRankingInicio(); }
    return;
  }
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