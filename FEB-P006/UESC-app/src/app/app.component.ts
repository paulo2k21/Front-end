import { Component, OnInit } from '@angular/core';

interface Noticia {
  title: string;
  description: string;
}

interface DadosNasa {
  title: string;
  explanation: string;
}

interface DadosNoticias {
  articles: Noticia[];
}

interface DadosPrevisaoTempo {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

interface Traducoes {
  [key: string]: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements OnInit {
  noticias: Noticia[] = [];
  previsaoTempo: string = '';
  destaqueNasa: string = '';

  ngOnInit() {
    this.obterPrevisaoTempoIlheus();
    this.obterDadosNasa();
    this.obterNoticias();
  }

  async obterDadosNasa() {
    try {
      const apiKeyNasa = 'xgSXyt6ccE69QbYmhuep5X9sPTXTEX5R1od3xaVG';
      const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKeyNasa}&count=1`;

      const resposta = await fetch(nasaApiUrl);

      if (!resposta.ok) {
        throw new Error(`Erro ao obter dados da API da NASA. Código de status: ${resposta.status}`);
      }

      const dados: DadosNasa[] = await resposta.json();
      this.exibirDestaqueNasa(dados);
    } catch (erro) {
      console.error('Erro ao obter dados da NASA:', erro);
    }
  }

  exibirDestaqueNasa(dados: DadosNasa[]) {
    if (dados.length > 0) {
      const destaqueNasa = dados[0];
      this.destaqueNasa = `<strong>${destaqueNasa.title}:</strong> ${destaqueNasa.explanation}`;
    } else {
      this.destaqueNasa = 'Nenhum destaque disponível';
    }
  }

  async obterNoticias() {
    try {
      const apiKeyNewsAPI = '2fbedda097ca4a4aa504c567745995bd';
      const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKeyNewsAPI}`;

      const resposta = await fetch(newsApiUrl);

      if (!resposta.ok) {
        throw new Error(`Erro ao obter dados da API de notícias. Código de status: ${resposta.status}`);
      }

      const dados: DadosNoticias = await resposta.json();
      console.log('Dados de notícias recebidos:', dados);
      this.exibirNoticias(dados.articles);
    } catch (erro) {
      console.error('Erro ao obter dados de notícias:', erro);
    }
  }

  exibirNoticias(noticias: Noticia[]) {
    if (noticias && noticias.length > 0) {
      this.noticias = noticias;
    } else {
      console.warn('Nenhuma notícia disponível.');
    }
  }

  async obterPrevisaoTempoIlheus() {
    try {
      const weatherAPIKey = 'd41ad972b05c45e79f114704231112';
      const ilheusWeatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=Ilheus&aqi=no`;

      const resposta = await fetch(ilheusWeatherApiUrl);

      if (!resposta.ok) {
        throw new Error(`Erro ao obter dados da API de previsão do tempo. Código de status: ${resposta.status}`);
      }

      const dados: DadosPrevisaoTempo = await resposta.json();
      console.log('Dados de previsão do tempo recebidos:', dados);
      this.exibirPrevisaoTempoIlheus(dados);
    } catch (erro) {
      console.error('Erro ao obter dados de previsão do tempo:', erro);
    }
  }

  exibirPrevisaoTempoIlheus(dados: DadosPrevisaoTempo) {
    const temperatura = dados.current.temp_c;
    const conditionText: string = dados.current.condition.text;

    const traducoes: Traducoes = {
      'Partly cloudy': 'Parcialmente nublado',
      // Adicione mais traduções conforme necessário
    };

    const descricao: keyof Traducoes = conditionText as keyof Traducoes;

    const descricaoTraduzida = traducoes[descricao] || conditionText;

    this.previsaoTempo = `<strong>Previsão do Tempo em ${dados.location.name}:</strong> ${descricaoTraduzida}, Temperatura: ${temperatura}°C`;
  }
}
