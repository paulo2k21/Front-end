// Capturando o formulário
const formulario = document.getElementById('novoPacote');

// Adicionando um listener para o evento de submit no formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário

    // Capturando os valores do formulário
    const destino = document.getElementById('nomeDestino').value;
    const urlImagem = document.getElementById('urlImagem').value;
    const itensInclusos = document.getElementById('itensInclusos').value;
    const preco = document.getElementById('preco').value;
    const observacoes = document.getElementById('observacoes').value;
    const parcelamento = document.getElementById('parcelamento').value;

    // Criando um novo elemento de roteiro-viagens
    const novoRoteiro = document.createElement('div');
    novoRoteiro.classList.add('roteiros-viagens');
    novoRoteiro.innerHTML = `
        <img src="${urlImagem}" class="postal">
        <div class="roteiro-destino">${destino}</div>
        <ul class="roteiro-incluso">
            <li>${itensInclusos}</li>
        </ul>
        <div class="roteiro-preco">${preco}</div>
        <div class="roteiro-obs">${observacoes}</div>
        <div class="roteiro-parcelamento">${parcelamento}</div>
        <button class="roteiro-comprar">Comprar</button>
    `;

    // Adicionando o novo roteiro na lista de destinos
    const containerDestinos = document.querySelector('.container-destinos');
    containerDestinos.appendChild(novoRoteiro);

    // Selecionando o elemento de saída dos valores preenchidos
    const valoresPreenchidos = document.getElementById('valoresPreenchidos');

    // Criando a estrutura para exibir os valores preenchidos
    valoresPreenchidos.innerHTML = `
        <h3>Valores Preenchidos</h3>
        <ul>
            <li><strong>Destino:</strong> ${destino}</li>
            <li><strong>URL da Imagem:</strong> ${urlImagem}</li>
            <li><strong>Itens Inclusos:</strong> ${itensInclusos}</li>
            <li><strong>Preço:</strong> ${preco}</li>
            <li><strong>Observações:</strong> ${observacoes}</li>
            <li><strong>Parcelamento:</strong> ${parcelamento}</li>
        </ul>
    `;

    // Limpando os campos do formulário após a inserção
    formulario.reset();
});
