function formatar(texto) {
    // Substitui as quebras de linha pelo elemento <br>
    const textoComQuebras = texto.replace(/\n/g, '<br>');
  
    return textoComQuebras;
  }

document.getElementById('texto').addEventListener('input', function(){
    document.getElementById('leitor').innerHTML = formatar(document.getElementById('texto').value);
})

document.getElementById('url').addEventListener('change', function(){
    document.getElementById('miniatura').src = formatar(document.getElementById('url').value);
})

function enviarDados(event) {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário

    const db = 'https://suahistorinha-db-default-rtdb.firebaseio.com/stories.json';
    const urlElement = document.getElementById('url').value;
    const filtro1 = document.getElementById('filtro_1').value;
    const filtro2 = document.getElementById('filtro_2').value;
    const filtro3 = document.getElementById('filtro_3').value;
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const lancamento = document.getElementById('lancamento').value;
    const texto = formatar(document.getElementById('texto').value);

    const dados = {
        'filtro_1': filtro1,
        'filtro_2': filtro2,
        'filtro_3': filtro3,
        'nome': titulo,
        'autor': autor,
        'texto': texto,
        'url': urlElement,
        'lancamento': lancamento
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(dados),
    };

    fetch(db, options)
        .then((response) => response.json())
        .then((data) => {
            alert('Dados enviados com sucesso:');
        })
        .catch((error) => {
            alert('Erro ao enviar a solicitação');
        });
}
  
