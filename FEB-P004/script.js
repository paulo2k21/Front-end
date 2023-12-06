// Função para capturar informações e abrir em outra janela
function capturarInformacoes(event) {
    const roteiro = event.target.closest('.roteiros-viagens');
  
    // Capturando informações específicas
    const destino = roteiro.querySelector('.roteiro-destino').textContent;
    const inclusos = Array.from(roteiro.querySelectorAll('.roteiro-incluso li')).map(item => item.textContent);
    const preco = roteiro.querySelector('.roteiro-preco').textContent;
    const observacoes = roteiro.querySelector('.roteiro-obs').textContent;
    const parcelamento = roteiro.querySelector('.roteiro-parcelamento').textContent;
  
    // Criando o objeto JSON com as informações capturadas
    const objetoJSON = {
      Destino: destino,
      Inclusos: inclusos,
      Preco: preco,
      Observacoes: observacoes,
      Parcelamento: parcelamento
    };
  
    // Abre uma nova janela com os detalhes do pacote turístico
    const novaJanela = window.open('', '_blank');
    
    // Escreve os detalhes do pacote na nova janela
    novaJanela.document.write(`<pre>${JSON.stringify(objetoJSON, null, 2)}</pre>`);
  }
  
  // Associando evento click a todos os botões de compra
  const botoesComprar = document.querySelectorAll('.roteiro-comprar');
  botoesComprar.forEach(botao => {
    botao.addEventListener('click', capturarInformacoes);
  });
  