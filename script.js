// ============ CONFIGURAÇÃO ============
// ATENÇÃO: esta chave fica visível para quem abrir o site. Use uma chave nova/restrita.
const apiKey = "qa_sk_527648f1bd014bfdebf52431b2e6d507ad75d3ef";
const quizId = "cmu4n5soc00a4u3utwre0lpmk";

const TEMPO_PERGUNTA = 20;        // segundos por pergunta
const TEMPO_REVELAR = 1800;       // ms mostrando certo/errado
const OCIOSO_QUIZ = 60_000;       // volta ao início se ninguém mexer por 60s
const SEGUNDOS_FIM = 30;          // tela final volta sozinha ao início

const imagensPorIndice = {
  0: { src: "img/simon-baker.jpg", alt: "Simon Baker" },
  2: { src: "img/red-john.jpeg", alt: "Red John" },
  3: { src: "img/red-john.jpeg", alt: "Red John" }
};

// Perguntas extras, usadas depois das que vêm da QuizAPI (da mais fácil para a mais difícil).
// Para usar só as perguntas da API, troque para false.
const USAR_EXTRAS = true;

const perguntasExtras = [
  {
    text: "Qual é o primeiro nome da agente Lisbon, chefe da equipe da CBI?",
    answers: [
      { text: "Grace" },
      { text: "Teresa", isCorrect: true },
      { text: "Angela" },
      { text: "Charlotte" }
    ]
  },
  {
    text: "Qual é o primeiro nome do agente Cho?",
    answers: [
      { text: "Wayne" },
      { text: "Patrick" },
      { text: "Kimball", isCorrect: true },
      { text: "Dennis" }
    ]
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
      { text: "Teresa e Lucy" },
      { text: "Grace e Sophie" },
      { text: "Madeleine e Emily" },
      { text: "Angela e Charlotte", isCorrect: true }
    ]
  },
  {
    text: "Qual atriz interpreta a agente Teresa Lisbon?",
    answers: [
      { text: "Robin Tunney", isCorrect: true },
      { text: "Amanda Righetti" },
      { text: "Jennifer Garner" },
      { text: "Mariska Hargitay" }
    ]
  },
  {
    text: "Como Patrick Jane ficou famoso antes de trabalhar com a CBI?",
    answers: [
      { text: "Como ilusionista de cassino" },
      { text: "Como detetive particular" },
      { text: "Como falso médium na televisão", isCorrect: true },
      { text: "Como apresentador de programa de auditório" }
    ]
  },
  {
    text: "Em qual cidade da Califórnia fica a base da CBI na série?",
    answers: [
      { text: "Los Angeles" },
      { text: "San Diego" },
      { text: "San Francisco" },
      { text: "Sacramento", isCorrect: true }
    ]
  },
  {
    text: "Qual ator interpreta o agente Wayne Rigsby?",
    answers: [
      { text: "Tim Kang" },
      { text: "Owain Yeoman", isCorrect: true },
      { text: "Rockmond Dunbar" },
      { text: "Joe Spano" }
    ]
  },
  {
    text: "Quem criou a série O Mentalista?",
    answers: [
      { text: "Vince Gilligan" },
      { text: "Dick Wolf" },
      { text: "Bruno Heller", isCorrect: true },
      { text: "Shonda Rhimes" }
    ]
  },
  {
    text: "Quantos episódios a série tem no total, ao longo de suas 7 temporadas?",
    answers: [
      { text: "98" },
      { text: "124" },
      { text: "151", isCorrect: true },
      { text: "178" }
    ]
  }
];

const curiosidades = [
  "O Mentalista foi exibido de 2008 a 2015 e teve 7 temporadas.",
  "Patrick Jane é interpretado por Simon Baker.",
  "A série acompanha um consultor da CBI que finge ser vidente.",
  "O símbolo do Red John, o rosto sorridente, virou marca da série.",
  "Jane resolve casos observando detalhes e lendo as pessoas.",
  "A série foi criada por Bruno Heller e exibida pela rede CBS."
];

// ============ ESTADO ============
let perguntas = [];
let indice = 0;
let acertos = 0;
let respostas = [];       // true / false por pergunta
let bloqueado = false;
let telaAtual = "inicio";
let timerId = null;
let tempoRestante = TEMPO_PERGUNTA;
let ociosoId = null;
let fimId = null;
let curiosidadeId = null;
let curiosidadeIdx = 0;

const $ = (id) => document.getElementById(id);

function esc(texto) {
  const d = document.createElement("div");
  d.textContent = texto ?? "";
  return d.innerHTML;
}

// ============ TELAS ============
function irPara(nome) {
  telaAtual = nome;
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  $("tela-" + nome).classList.add("ativa");
  window.scrollTo(0, 0);

  clearTimeout(fimId);
  clearInterval(fimId);
  if (nome === "inicio") iniciarCuriosidades(); else pararCuriosidades();
  if (nome === "quiz") reiniciarOcioso(); else clearTimeout(ociosoId);
}

// ============ CURIOSIDADES (tela inicial) ============
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

// ============ API ============
async function buscarPerguntas() {
  $("btn-comecar").disabled = true;
  $("btn-comecar").classList.remove("pronto");
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
    $("btn-comecar").disabled = false;
    $("btn-comecar").classList.add("pronto");
    $("info-qtd").textContent = perguntas.length;
    $("info-tempo").textContent = TEMPO_PERGUNTA;
    $("info-quiz").classList.remove("d-none");
  } catch (erro) {
    console.error("Erro ao buscar perguntas:", erro);
    $("spin-inicio").classList.add("d-none");
    $("txt-comecar").textContent = "Tentar novamente";
    $("btn-comecar").disabled = false;
    $("btn-comecar").dataset.retry = "1";
    $("erro-inicio").textContent = "Não foi possível carregar o quiz. Verifique a internet e a chave da API.";
    $("erro-inicio").classList.remove("d-none");
  }
}

// ============ JOGO ============
function comecarQuiz() {
  indice = 0;
  acertos = 0;
  respostas = [];
  $("placar-num").textContent = "0";
  irPara("quiz");
  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[indice];
  bloqueado = false;

  $("badge-pergunta").textContent = `PERGUNTA ${indice + 1} DE ${perguntas.length}`;
  $("barra-geral").style.width = `${(indice / perguntas.length) * 100}%`;

  const imagem = imagensPorIndice[indice];
  $("area-imagem").innerHTML = imagem
    ? `<img src="${imagem.src}" alt="${esc(imagem.alt)}" class="imagem-pergunta" />`
    : "";

  $("texto-pergunta").textContent = pergunta.text;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";

  const letras = "ABCDEFGH";
  $("opcoes").innerHTML = pergunta.answers.map((a, i) => `
    <button class="opcao" data-index="${i}">
      <span class="letra">${letras[i] ?? i + 1}</span>
      <span>${esc(a.text)}</span>
    </button>`).join("");

  // reinicia animação de entrada do card
  const card = $("card-pergunta");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "entrar .35s ease both";

  iniciarTimer();
}

function iniciarTimer() {
  clearInterval(timerId);
  tempoRestante = TEMPO_PERGUNTA;
  const inicio = performance.now();
  atualizarTimer(TEMPO_PERGUNTA);

  timerId = setInterval(() => {
    const restante = TEMPO_PERGUNTA - (performance.now() - inicio) / 1000;
    if (restante <= 0) {
      clearInterval(timerId);
      atualizarTimer(0);
      responder(-1); // tempo esgotado
    } else {
      atualizarTimer(restante);
    }
  }, 100);
}

function atualizarTimer(restante) {
  const pct = Math.max(0, (restante / TEMPO_PERGUNTA) * 100);
  const urgente = restante <= 5;
  $("barra-timer").style.width = pct + "%";
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

  if (acertou) {
    acertos++;
    $("placar-num").textContent = acertos;
    const pill = $("placar");
    pill.classList.add("pulo");
    setTimeout(() => pill.classList.remove("pulo"), 300);
  }

  document.querySelectorAll(".opcao").forEach((botao, i) => {
    botao.disabled = true;
    if (pergunta.answers[i].isCorrect) botao.classList.add("correta");
    else if (i === indiceEscolhido) botao.classList.add("errada");
    else botao.classList.add("apagada");
  });

  const fb = $("feedback");
  if (acertou) {
    fb.textContent = "Muito bem! Patrick Jane aprovaria.";
    fb.className = "feedback ok";
  } else if (indiceEscolhido === -1) {
    fb.textContent = "O tempo acabou!";
    fb.className = "feedback erro";
  } else {
    fb.textContent = "Não foi dessa vez.";
    fb.className = "feedback erro";
  }

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
  if (pct === 100)      { rank = "Consultor Genial";   frase = "Perfeito! Nem o Red John te enganaria."; }
  else if (pct >= 75)   { rank = "Agente da CBI";      frase = "Ótimo trabalho, você conhece bem a série."; }
  else if (pct >= 50)   { rank = "Investigador Júnior"; frase = "Bom começo. Ainda tem pistas para descobrir."; }
  else                  { rank = "Suspeito Inocente";  frase = "Hora de maratonar O Mentalista de novo!"; }

  $("fim-rank").textContent = rank;
  $("fim-frase").textContent = frase;
  $("fim-pct").textContent = pct + "%";
  $("fim-detalhe").textContent = `${acertos} de ${total} acertos`;
  $("fim-pontos").innerHTML = respostas
    .map((ok, i) => `<span class="ponto ${ok ? "ok" : "erro"}" title="Pergunta ${i + 1}">${ok ? "&#10003;" : "&#10007;"}</span>`)
    .join("");

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

  // volta sozinho ao início para o próximo visitante
  let restam = SEGUNDOS_FIM;
  const aviso = $("fim-auto");
  aviso.textContent = `Voltando ao início em ${restam}s`;
  fimId = setInterval(() => {
    restam--;
    if (restam <= 0) { voltarInicio(); return; }
    aviso.textContent = `Voltando ao início em ${restam}s`;
  }, 1000);
}

function voltarInicio() {
  clearInterval(timerId);
  clearInterval(fimId);
  bloqueado = true;
  irPara("inicio");
}

// ============ OCIOSO (bancada) ============
function reiniciarOcioso() {
  clearTimeout(ociosoId);
  if (telaAtual !== "quiz") return;
  ociosoId = setTimeout(voltarInicio, OCIOSO_QUIZ);
}

// ============ EVENTOS ============
$("btn-comecar").addEventListener("click", (e) => {
  if (e.currentTarget.dataset.retry) {
    delete e.currentTarget.dataset.retry;
    buscarPerguntas();
  } else {
    comecarQuiz();
  }
});
$("btn-reiniciar").addEventListener("click", comecarQuiz);
$("btn-inicio").addEventListener("click", voltarInicio);

$("opcoes").addEventListener("click", (e) => {
  const botao = e.target.closest(".opcao");
  if (botao) responder(Number(botao.dataset.index));
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
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
    if (i >= 0 && i < perguntas[indice].answers.length) {
      e.preventDefault();
      responder(i);
    }
    return;
  }
  if (telaAtual === "fim" && e.key === "Enter") {
    e.preventDefault();
    comecarQuiz();
  }
});

["pointerdown", "keydown", "touchstart"].forEach(ev =>
  document.addEventListener(ev, reiniciarOcioso, { passive: true })
);

// ============ INÍCIO ============
iniciarCuriosidades();
buscarPerguntas();