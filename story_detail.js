const params = new URLSearchParams(window.location.search);
const contoId = params.get("id");
let marcador = 0;

// Define o endpoint da API REST do Firebase
const firebaseEndpoint = `https://suahistorinha-db-default-rtdb.firebaseio.com/stories/${contoId}/.json`;
let nac = 0
// Solicitação
fetch(firebaseEndpoint)
  .then(response => response.json())
  .then(data => {
    const nome = data.nome; // acessando o valor da chave "nome"
    const url = data.url; // acessando o valor da chave "url"
    const texto = data.texto; // acessando o valor da chave "texto"
    const autor = data.autor; // acessando o valor da chave "autor"
    
    
    document.title = nome; // Define o título da página

    const nomeElement = document.getElementById("nome");
    nomeElement.textContent = nome;

    const autorElement = document.getElementById("autor");
    autorElement.textContent = autor;

    const imgElement = document.getElementById("imagem");
    imgElement.src = url;
    imgElement.alt = nome;

    const textoElement = document.getElementById("texto");
    textoElement.innerHTML = texto;
  })
  .catch(error => {
    console.error(error);
    // Tratar o erro de forma adequada
  });


// Incremento nos acessos do item
function incrementAccessCount(contoId, nac) {
    const accessCountRef = `https://suahistorinha-db-default-rtdb.firebaseio.com/ranking/${contoId}/.json`;
    const agora = new Date();
    fetch(accessCountRef, {
      method: 'POST',
      body: JSON.stringify(
        {
            'acesso': String(agora)
        }
      )
    })
    .then(response => response.json())
  }


//Controla o processamento do incremento apenas 1 vez
let hasAccessCountIncremented = false;

function onScroll() {
  if (hasAccessCountIncremented) {
    // A contagem de acesso já foi incrementada
    return;
  }

  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  
  if (scrollTop + clientHeight >= scrollHeight * 0.6) {
    // O usuário rolou 60% da página
    incrementAccessCount(contoId, nac);
    hasAccessCountIncremented = true;
  }
}

window.addEventListener('scroll', onScroll);



// Adiciona o ouvinte de evento click ao botão
document.getElementById('zoom-mais').addEventListener('click', function() {
  // Define o tamanho inicial do texto
  let tamanhoTexto = parseInt(window.getComputedStyle(document.getElementById('texto')).fontSize); // Tamanho em pixels, pode ser ajustado conforme necessário

  // Incrementa o tamanho do texto
  tamanhoTexto += 2; // Você pode ajustar o valor de incremento conforme necessário
  document.getElementById('texto').style.fontSize = tamanhoTexto + 'px';
});  

// Adiciona o ouvinte de evento click ao botão
document.getElementById('zoom-menos').addEventListener('click', function() {
  // Define o tamanho inicial do texto
  let tamanhoTexto = parseInt(window.getComputedStyle(document.getElementById('texto')).fontSize); // Tamanho em pixels, pode ser ajustado conforme necessário

  // Incrementa o tamanho do texto
  tamanhoTexto += -2; // Você pode ajustar o valor de incremento conforme necessário
  document.getElementById('texto').style.fontSize = tamanhoTexto + 'px';
});  

function compartilharWhatsApp() {
  const titulo = document.getElementById('nome').textContent;
  // Mensagem padrão que será compartilhada no WhatsApp
  const mensagemPadrao = `Confira a história _${titulo}_ em `

  // URL da página que você deseja compartilhar
  const urlPagina = window.location.href;

  // Cria a mensagem final concatenando a mensagem padrão e o URL da página
  const mensagemFinal = mensagemPadrao + `*${urlPagina}*`;

  // Codifica a mensagem final para garantir que ela seja passada corretamente no link
  const mensagemCodificada = encodeURIComponent(mensagemFinal);

  // Abre uma nova janela do WhatsApp Web ou do aplicativo móvel com a mensagem pré-definida
  window.open(`https://api.whatsapp.com/send?text=${mensagemCodificada}`, '_blank');
}

document.getElementById('share').addEventListener('click', function(){compartilharWhatsApp();})
  




// Função para salvar o progresso no Local Storage
function salvarProgresso() {
  // Obtém a posição da barra de rolagem vertical da página
  const posicaoBarraRolagem = window.scrollY;
  
  // Obtém o ID da história a partir do parâmetro da URL (por exemplo, '?id=1')
  const urlParams = new URLSearchParams(window.location.search);
  const historiaId = urlParams.get('id');

  // Cria um objeto com a posição da barra de rolagem e o ID da história
  const progresso = { id: historiaId, posicao: posicaoBarraRolagem };

  // Converte o objeto para uma string JSON
  const progressoJSON = JSON.stringify(progresso);

  // Armazena o progresso no Local Storage com a chave "progresso_historia_1", onde "1" é o ID da história
  localStorage.setItem(`progresso_historia_${historiaId}`, progressoJSON);

  marcador = 1;
  document.getElementById('marcador').style.opacity = 1;
  document.getElementById('marcador').src = "Assets/marked.png";
  alert('Marcador de progresso adicionado! Você pode retornar a este ponto mais tarde.');
}

// Função para carregar o progresso salvo no Local Storage
function carregarProgresso() {
  // Obtém o ID da história a partir do parâmetro da URL (por exemplo, '?id=1')
  const urlParams = new URLSearchParams(window.location.search);
  const historiaId = urlParams.get('id');

  // Obtém o progresso salvo do Local Storage com a chave "progresso_historia_1", onde "1" é o ID da história
  const progressoJSON = localStorage.getItem(`progresso_historia_${historiaId}`);

  if (progressoJSON) {
    // Se houver um progresso salvo, converte a string JSON de volta para um objeto
    const progresso = JSON.parse(progressoJSON);

    // Define a posição da barra de rolagem da página para a posição salva
    window.scrollTo(0, progresso.posicao);

    marcador = 1;
    document.getElementById('marcador').style.opacity = 1;
    document.getElementById('marcador').src = "Assets/marked.png";
  }
}

function apagarProgresso() {
  // Obtém o ID da história a partir do parâmetro da URL (por exemplo, '?id=1')
  const urlParams = new URLSearchParams(window.location.search);
  const historiaId = urlParams.get('id');

  // Remove o registro de progresso do Local Storage com a chave "progresso_historia_1", onde "1" é o ID da história
  localStorage.removeItem(`progresso_historia_${historiaId}`);
  
  marcador = 0;
  document.getElementById('marcador').style.opacity = 0.3;
  document.getElementById('marcador').src = "Assets/no_marked.png";
  alert('Marcador de progresso removido!');
}

// Chama a função para carregar o progresso quando a página for carregada
carregarProgresso();

document.getElementById('marcador').addEventListener('click', function(){
  if(marcador == 0){
    salvarProgresso();
  } else if (marcador == 1){
    apagarProgresso();
  };
});
  
