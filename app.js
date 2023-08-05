let stories = {};
let ranking = {};
let acervo = {};


// Define o endpoint da API REST do Firebase
const firebaseEndpointStories = 'https://suahistorinha-db-default-rtdb.firebaseio.com/stories.json';

// Define o endpoint da API REST do Firebase
const firebaseEndpointRanking = 'https://suahistorinha-db-default-rtdb.firebaseio.com/ranking.json';

// Solicitação das duas coleções de dados simultaneamente
Promise.all([
  fetch(firebaseEndpointStories).then(response => response.json()),
  fetch(firebaseEndpointRanking).then(response => response.json())
])
  .then(([storiesData, rankingData]) => {
    stories = storiesData;
    ranking = rankingData;
    acervo = classificarObjetos(ranking, stories);
    const todas = document.getElementById("todas")
    todas.click(); 
  })
  .catch(error => console.error(error));


function classificarObjetos(objeto1, objeto2) {
  // Classificar o objeto1 com base no número de chaves em cada valor
  const sortedItems = Object.keys(objeto1).sort((a, b) => {
    const aKeys = Object.keys(objeto1[a]);
    const bKeys = Object.keys(objeto1[b]);
    return bKeys.length - aKeys.length;
  });

  // Classificar o objeto2 de acordo com a lista classificada
  const sortedObj2 = {};
  const existingItems = [];
  for (const item of sortedItems) {
    for (const [key, value] of Object.entries(objeto2)) {
      if (key === item) {
        sortedObj2[key] = value;
        existingItems.push(item);
      }
    }
  }
  for (const [key, value] of Object.entries(objeto2)) {
    if (!existingItems.includes(key)) {
      sortedObj2[key] = value;
    }
  }
  return sortedObj2;
}
  
// filtro
let activeButton = null;
document.getElementById('todas').addEventListener('click', function(){
  // Remove a classe "active" do botão ativo anterior
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  // Define o botão atual como ativo e atualiza a variável "activeButton"
  activeButton = document.getElementById('todas');
  activeButton.classList.add('active');

  // Chama a função para filtrar e classificar as histórias
  const filteredStories = filterStories(acervo, activeButton.textContent);
  // Atualiza a lista de histórias na página
  listaStories(filteredStories);
});

document.getElementById('filter-1').addEventListener('click', function(){
  // Remove a classe "active" do botão ativo anterior
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  // Define o botão atual como ativo e atualiza a variável "activeButton"
  activeButton = document.getElementById('filter-1');
  activeButton.classList.add('active');

  // Chama a função para filtrar e classificar as histórias
  const filteredStories = filterStories(acervo, activeButton.textContent);
  // Atualiza a lista de histórias na página
  listaStories(filteredStories);
});

document.getElementById('filter-2').addEventListener('click', function(){
  // Remove a classe "active" do botão ativo anterior
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  // Define o botão atual como ativo e atualiza a variável "activeButton"
  activeButton = document.getElementById('filter-2');
  activeButton.classList.add('active');

  // Chama a função para filtrar e classificar as histórias
  const filteredStories = filterStories(acervo, activeButton.textContent);
  // Atualiza a lista de histórias na página
  listaStories(filteredStories);
});

document.getElementById('filter-3').addEventListener('click', function(){
  // Remove a classe "active" do botão ativo anterior
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  // Define o botão atual como ativo e atualiza a variável "activeButton"
  activeButton = document.getElementById('filter-3');
  activeButton.classList.add('active');

  // Chama a função para filtrar e classificar as histórias
  const filteredStories = filterStories(acervo, activeButton.textContent);
  // Atualiza a lista de histórias na página
  listaStories(filteredStories);
});

document.getElementById('filter-4').addEventListener('click', function(){
  // Remove a classe "active" do botão ativo anterior
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  // Define o botão atual como ativo e atualiza a variável "activeButton"
  activeButton = document.getElementById('filter-4');
  activeButton.classList.add('active');

  // Chama a função para filtrar e classificar as histórias
  const filteredStories = filterStories(acervo, activeButton.textContent);
  // Atualiza a lista de histórias na página
  listaStories(filteredStories);
});



// Função para filtrar e classificar as histórias
function filterStories(stories, filterText) {
  const populares = document.getElementById("populares")
  const categorias = document.getElementById("categorias")
  let filteredStories = {};

  if (filterText == 'Todas') {
    populares.innerHTML = "MAIS ACESSADAS";
    categorias.innerHTML = "TODAS AS HISTÓRIAS";
    return stories;
  } else {
    Object.keys(stories).forEach((key) => {
      if (stories[key]['filtro_1'] == filterText || stories[key]['filtro_2'] == filterText || stories[key]['filtro_3'] == filterText) {
        filteredStories[key] = stories[key];
      }
    });
    }
    populares.innerHTML = "MAIS ACESSADAS DE " + filterText.toUpperCase();
    categorias.innerHTML = filterText.toUpperCase();
    return filteredStories;
  };





