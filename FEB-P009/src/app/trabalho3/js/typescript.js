const apiKeyNasa = 'xgSXyt6ccE69QbYmhuep5X9sPTXTEX5R1od3xaVG';
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKeyNasa}&count=1`;

async function obterDadosNasa() {
  try {
    const resposta = await fetch(nasaApiUrl);

    if (!resposta.ok) {
      throw new Error('Erro ao obter dados da API da NASA');
    }

    const dados = await resposta.json();
    exibirDestaqueNasa(dados);
  } catch (erro) {
    console.error('Erro ao obter dados da NASA:', erro);
  }
}

function exibirDestaqueNasa(dados) {
  const quadroDestaqueNasa = document.getElementById('destaque-nasa');

  if (!quadroDestaqueNasa) {
    console.error('Elemento quadro-destaque-nasa não encontrado');
    return;
  }

  if (dados.length > 0) {
    const destaqueNasa = dados[0];
    quadroDestaqueNasa.innerHTML = `<strong>${destaqueNasa.title}:</strong> ${destaqueNasa.explanation}`;
  } else {
    quadroDestaqueNasa.textContent = 'Nenhum destaque disponível';
  }
}

const apiKeyNewsAPI = '2fbedda097ca4a4aa504c567745995bd';
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKeyNewsAPI}`;

async function obterNoticias() {
  try {
    const resposta = await fetch(newsApiUrl);

    if (!resposta.ok) {
      throw new Error('Erro ao obter dados da API de notícias');
    }

    const dados = await resposta.json();
    exibirNoticias(dados.articles);
  } catch (erro) {
    console.error('Erro ao obter dados de notícias:', erro);
  }
}

function exibirNoticias(dados) {
  const quadroNoticias = document.getElementById('lista-noticias');

  if (!quadroNoticias) {
    console.error('Elemento lista-noticias não encontrado');
    return;
  }

  dados.forEach((noticia) => {
    const noticiaElemento = document.createElement('li');
    noticiaElemento.textContent = noticia.title;
    quadroNoticias.appendChild(noticiaElemento);
  });
}

const weatherApiKey = 'd41ad972b05c45e79f114704231112';
const ilheusWeatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=Ilheus&aqi=no`;

async function obterPrevisaoTempoIlheus() {
  try {
    const resposta = await fetch(ilheusWeatherApiUrl);

    if (!resposta.ok) {
      throw new Error('Erro ao obter dados da API de previsão do tempo');
    }

    const dados = await resposta.json();
    exibirPrevisaoTempoIlheus(dados);
  } catch (erro) {
    console.error('Erro ao obter dados de previsão do tempo:', erro);
  }
}
function exibirPrevisaoTempoIlheus(dados) {
  const quadroServicos = document.getElementById('quadro-servicos');

  if (!quadroServicos) {
    console.error('Elemento quadro-servicos não encontrado');
    return;
  }

  const temperatura = dados.current.temp_c;
  const descricao = dados.current.condition.text;

  // Tradução das condições meteorológicas
  const traducoes = {
    'Partly cloudy': 'Parcialmente nublado',
    // Adicione mais traduções conforme necessário
  };

  const descricaoTraduzida = traducoes[descricao] || descricao;

  // Inclua o título h2 junto com os dados
  quadroServicos.innerHTML = `<h2>Serviços</h2><div class="barra-titulo-interno"></div><p><strong>Previsão do Tempo na Cidade de Ilhéus:</strong> ${descricaoTraduzida}, Temperatura: ${temperatura}°C</p>`;
}

// Chame as funções necessárias
$(document).ready(() => {
  obterPrevisaoTempoIlheus();
});

// Chame as funções necessárias
$(document).ready(() => {
  obterDadosNasa();
  obterNoticias();
});
