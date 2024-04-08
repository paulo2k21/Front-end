import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controle-peso',
  templateUrl: './controle-peso.component.html',
  styleUrls: ['./controle-peso.component.css']
})
export class ControlePesoComponent implements OnInit {
  suinosData: any[] = [];
  chartData: any;
  maxWeight: number = 0; // Inicializando com um valor padrão
  userName: string = '';

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verifica se o usuário está autenticado
    this.afAuth.currentUser.then(user => {
      if (!user || !user.emailVerified) {
        // Redireciona para a página de login se o usuário não estiver autenticado ou o e-mail não estiver verificado
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Erro ao verificar autenticação do usuário:', error);
      // Manipular erros de autenticação, se necessário
    });

    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userName = user.displayName || user.email || 'Usuário';
      }
    });
    // Recupere os dados dos suínos do Firebase
    this.db.list('/suinos').valueChanges().subscribe((suinos: any[]) => {
      this.suinosData = suinos;
      this.prepareChartData();
      this.calculateMaxWeight();
    });
  }

  prepareChartData(): void {
    // Prepare os dados do gráfico aqui
    // Defina a estrutura correta para o gráfico com os dados disponíveis em suinosData
    // Exemplo:
    const labels: string[] = [];
    const data: number[] = [];

    this.suinosData.forEach(suino => {
      labels.push(suino.dataPesagem);
      data.push(suino.pesoKg);
    });

    // Configure os dados do gráfico
    this.chartData = {
      labels: labels,
      datasets: [{
        label: 'Peso (kg)',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }

  calculateMaxWeight(): void {
    if (this.suinosData.length > 0) {
      this.maxWeight = Math.max(...this.suinosData.map(suino => suino.pesoKg));
    }
  }

  getUltimaDataPesagem(suino: any): Date {
    if (suino.pesos && suino.pesos.length > 0) {
      return suino.pesos[suino.pesos.length - 1].dataPesagem;
    }
    // @ts-ignore
    return null;
  }

  getUltimoPeso(suino: any): number {
    if (suino.pesos && suino.pesos.length > 0) {
      return suino.pesos[suino.pesos.length - 1].pesoKg;
    }
    // @ts-ignore
    return null;
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
