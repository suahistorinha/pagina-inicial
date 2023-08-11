let historias = {};
let total_de_views = 0;

class historia {
    constructor(enumerador, titulo, views) {
      this.container = document.createElement('div');
      this.container.classList.add('container');

      this.enumerador = document.createElement('span');
      this.enumerador.textContent = enumerador + '.';
      this.enumerador.classList.add('enumerador');

      this.titulo = document.createElement('span');
      this.titulo.textContent = titulo;
      this.titulo.classList.add('titulo');

      this.views = document.createElement('span');
      this.views.textContent = views;
      this.views.classList.add('views');

      this.container.appendChild(this.enumerador);
      this.container.appendChild(this.titulo);
      this.container.appendChild(this.views);
        
      return this.container;
      
    }
}

function getHistorias() {
    fetch('https://suahistorinha-db-default-rtdb.firebaseio.com/stories.json')
      .then(response => response.json())
      .then(data => {
        historias = data; 
        fetchDataFromAPI();
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }


  function fetchDataFromAPI() {
    fetch('https://suahistorinha-db-default-rtdb.firebaseio.com/ranking.json')
      .then(response => response.json())
      .then(data => {
        let contador = 1;
        let historiasArray = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const nestedObjects = data[key];
            const numberOfObjects = Object.keys(nestedObjects).length;

            historiasArray.push({ key, numberOfObjects });
          }
        }

        historiasArray.sort((a, b) => b.numberOfObjects - a.numberOfObjects);

        historiasArray.forEach((historiaData, index) => {
          const line = new historia(
            contador,
            historias[historiaData.key].nome,
            historiaData.numberOfObjects
          );
          document.querySelector('main').appendChild(line);
          contador = contador + 1;
          total_de_views = total_de_views + historiaData.numberOfObjects;
        });

        document.getElementById('total').textContent = total_de_views;
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
}

getHistorias()
