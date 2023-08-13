function addToFavorites() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const icon = document.getElementById('favorite');
  
    if (!idParam) {
        alert('Parâmetro "id" não encontrado na URL.');
      return;
    }
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (!favorites.includes(idParam)) {
      favorites.push(idParam);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      icon.src = 'Assets/favorited.png';  
      icon.style.opacity = '1';
      alert(`O item foi adicionado aos favoritos.`);
    } else {
        alert(`O item já está nos favoritos.`);
    }
}

function removeFromFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const icon = document.getElementById('favorite');
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
  
    const index = favorites.indexOf(idParam);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      icon.src = 'Assets/no_favorited.png';
      icon.style.opacity = '0.6';
      alert(`O item foi removido dos favoritos.`);
    } else {
      alert(`O item não foi encontrado nos favoritos.`);
    }
}

function checkFavorite () {
    const icon = document.getElementById('favorite');
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (favorites.includes(idParam)) {
      icon.src = 'Assets/favorited.png';
      icon.style.opacity = '1';
    };
}

function actionFavorite () {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (!favorites.includes(idParam)) {
        addToFavorites();
      } else {
        removeFromFavorites();
      }
}

document.getElementById('favorite').addEventListener('click', function (){actionFavorite()});
checkFavorite()
