const apiKey = "qa_sk_527648f1bd014bfdebf52431b2e6d507ad75d3ef";
const quizId = "cmu4n5soc00a4u3utwre0lpmk";

let perguntas = [];
let indice = 0;
let acertos = 0;

const imagensPorIndice = {
  0: { src: "img/simon-baker.jpg", alt: "Simon Baker" },
  2: { src: "img/red-john.jpeg", alt: "Red John" },
  3: { src: "img/red-john.jpeg", alt: "Red John" }
};

async function buscarPerguntas() {
  try {
    const resposta = await axios.get("https://quizapi.io/api/v1/questions", {
      params: { quiz_id: quizId, include_answers: "true" },
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    perguntas = resposta.data.data;

    document.getElementById("status").classList.add("d-none");
    document.getElementById("progresso-wrap").classList.remove("d-none");
    document.getElementById("placar").classList.remove("d-none");
    atualizarPlacar();
    mostrarPergunta();
  } catch (erro) {
    console.error("Erro ao buscar perguntas:", erro);
    document.getElementById("status").innerHTML =
      `<div class="alert alert-danger mb-0">Erro ao carregar o quiz. Veja o console (F12).</div>`;
  }
}

function atualizarPlacar() {
  document.getElementById("placar").textContent = `Acertos: ${acertos} / ${perguntas.length}`;
  document.getElementById("barra").style.width = `${(indice / perguntas.length) * 100}%`;
}

function mostrarPergunta() {
  const pergunta = perguntas[indice];
  const imagem = imagensPorIndice[indice];
  const imagemHtml = imagem
    ? `<img src="${imagem.src}" alt="${imagem.alt}" class="pergunta-imagem rounded mb-3" />`
    : "";

  document.getElementById("quiz").innerHTML = `
    <div class="card card-quiz shadow">
      <div class="card-body p-4">
        <div class="text-center mb-3">
          <span class="badge rounded-pill text-roxo fw-bold" style="background:#241f45;">
            PERGUNTA ${indice + 1} DE ${perguntas.length}
          </span>
        </div>
        ${imagemHtml}
        <h2 class="h5 fw-bold text-center mb-4">${pergunta.text}</h2>
        <div class="d-grid gap-2">
          ${pergunta.answers
            .map((a, i) => `<button class="opcao btn btn-outline-secondary py-2 px-3" data-index="${i}">${a.text}</button>`)
            .join("")}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".opcao").forEach(botao => {
    botao.addEventListener("click", () => responder(botao, pergunta));
  });
}

function responder(botaoClicado, pergunta) {
  const botoes = document.querySelectorAll(".opcao");
  const indiceEscolhido = Number(botaoClicado.dataset.index);

  if (pergunta.answers[indiceEscolhido].isCorrect) acertos++;

  botoes.forEach((botao, i) => {
    botao.disabled = true;
    botao.classList.remove("btn-outline-secondary");
    if (pergunta.answers[i].isCorrect) {
      botao.classList.add("btn-success", "fw-bold");
    } else if (i === indiceEscolhido) {
      botao.classList.add("btn-danger");
    } else {
      botao.classList.add("btn-outline-secondary");
    }
  });

  setTimeout(() => {
    indice++;
    atualizarPlacar();
    if (indice < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1000);
}

function mostrarResultado() {
  const porcentagem = Math.round((acertos / perguntas.length) * 100);
  const cor = porcentagem >= 70 ? "success" : porcentagem >= 40 ? "warning" : "danger";

  document.getElementById("quiz").innerHTML = `
    <div class="card card-quiz shadow text-center">
      <div class="card-body p-4">
        <h2 class="h4 mb-3">Fim do quiz!</h2>
        <p class="display-4 fw-bold text-${cor} mb-1">${porcentagem}%</p>
        <p class="text-secondary mb-4">Você acertou ${acertos} de ${perguntas.length} perguntas.</p>
        <button id="reiniciar" class="btn btn-primary px-4">Jogar novamente</button>
      </div>
    </div>
  `;

  document.getElementById("reiniciar").addEventListener("click", () => {
    indice = 0;
    acertos = 0;
    atualizarPlacar();
    mostrarPergunta();
  });
}

buscarPerguntas();