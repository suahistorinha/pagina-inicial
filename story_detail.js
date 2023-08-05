const params = new URLSearchParams(window.location.search);
const contoId = params.get("id");

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
document.getElementById('voltar').addEventListener('click', function() {
  // Redireciona para a página index.html
  window.location.href = 'index.html';})




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
  