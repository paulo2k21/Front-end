function iniciarAnimacao(botaoId) {
    if (botaoId) {
        console.log(`Botão ${botaoId} clicado!`);
        document.querySelector(`#${botaoId}`).style.transform = 'rotate(360deg)';
        // Adicione outras animações conforme necessário
    } else {
        console.log("Botão Comprar clicado!");
        // Lógica padrão quando nenhum botaoId é fornecido
        // Adicione outras animações conforme necessário
    }
}



function inserirDestino() {
    // Capturar os dados do formulário
    const destino = document.getElementById('destino').value;
    const imagem = document.getElementById('imagem').value;
    const preco = document.getElementById('preco').value;
    const aereo = document.getElementById('aereo').value;
    const diarias = document.getElementById('diarias').value;
    const cafeManha = document.getElementById('cafeManha').value;
    const taxasInclusas = document.getElementById('taxas').checked;
    const formaPagamento = document.getElementById('formaPagamento').value;

    // Criar um novo destino
    const novoDestino = document.createElement('div');
    novoDestino.classList.add('destino');

    // Adicionar a imagem
    const imagemDestino = document.createElement('img');
    imagemDestino.src = imagem;
    imagemDestino.alt = `Destino ${destino}`;
    novoDestino.appendChild(imagemDestino);

    // Adicionar informações do destino
    const infoDestino = document.createElement('div');
    infoDestino.classList.add('destino-info');

    const titulo = document.createElement('h2');
    titulo.textContent = destino;
    infoDestino.appendChild(titulo);

    const detalhes = [
        `✓Áereo ida e volta: ${aereo}`,
        `✓Número de Diárias: ${diarias}`,
        `✓Café da Manhã: ${cafeManha}`,
        `R$${preco}`,
        `Taxas inclusas: ${taxasInclusas ? 'Sim' : 'Não'}`,
        `Em até 10x sem juros`
    ];

    detalhes.forEach((item) => {
        const paragrafo = document.createElement('p');
        paragrafo.innerHTML = item;
        infoDestino.appendChild(paragrafo);
    });

    const botaoComprar = document.createElement('button');
    const botaoId = `comprar-btn-${new Date().getTime()}`;
    botaoComprar.setAttribute('id', botaoId);
    botaoComprar.classList.add('comprar-btn');
    botaoComprar.textContent = 'Comprar';
    botaoComprar.onclick = () => iniciarAnimacao(botaoId);

    infoDestino.appendChild(botaoComprar);
    novoDestino.appendChild(infoDestino);

    // Adicionar novo destino à destinos-container
    document.querySelector('.destinos-container').appendChild(novoDestino);

    // Limpar os campos do formulário
    limparCamposFormulario();
}

function limparCamposFormulario() {
    document.getElementById('destino').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('aereo').value = '';
    document.getElementById('diarias').value = '';
    document.getElementById('cafeManha').value = '';
    document.getElementById('taxas').checked = false;
    document.getElementById('formaPagamento').value = '';
}
