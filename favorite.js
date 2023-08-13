let stories = {};


// Define o endpoint da API REST do Firebase
const firebaseEndpointStories = 'https://suahistorinha-db-default-rtdb.firebaseio.com/stories.json';

// Solicitação das duas coleções de dados simultaneamente
Promise.all([
  fetch(firebaseEndpointStories).then(response => response.json())
])
  .then(([storiesData, rankingData]) => {
    stories = storiesData;
    listaStories(stories)
  })
  .catch(error => console.error(error));
  
// Listagem no HTML
function listaStories(book) {
  const storiesContainer = document.getElementById("stories-list");

  // Limpa os containers antes de adicionar novos elementos
  storiesContainer.innerHTML = "";

  // Obter a lista de favoritos do Local Storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Filtrar as histórias que estão na lista de favoritos
  const storiesInFavorites = Object.entries(book).filter(([storyId]) => favorites.includes(storyId));

  // Lista todas as histórias na lista de favoritos
  for (const [storyId, story] of storiesInFavorites) {
    // criar um elemento div para a história
    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story-box");

    // criar um elemento de imagem para a história
    const imgElement = document.createElement("img");
    imgElement.src = story.url;
    imgElement.alt = story.nome;
    storyDiv.appendChild(imgElement);

    // criar um elemento de parágrafo para o nome da história
    const nomeElement = document.createElement("p");
    nomeElement.textContent = story.nome;
    storyDiv.appendChild(nomeElement);

    // adicionar um manipulador de eventos de clique à história
    storyDiv.addEventListener("click", function () {
      // navegar para a página de detalhes da história
      const url = `story_detail.html?id=${storyId}`;
      window.location.href = url;
    });

    // adicionar a história ao container de histórias
    storiesContainer.appendChild(storyDiv);
  }
}




