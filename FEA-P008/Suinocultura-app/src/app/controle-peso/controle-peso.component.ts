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
    this.afAuth.currentUser.then(user => {
      if (!user || !user.emailVerified) {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Erro ao verificar autenticação do usuário:', error);
    });

    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userName = user.displayName || user.email || 'Usuário';
      }
    });

    this.db.list('/suinos').valueChanges().subscribe((suinos: any[]) => {
      this.suinosData = suinos;
      this.prepareChartData();
      this.calculateMaxWeight();
    });
  }
  prepareChartData(): void {
    const labels: string[] = [];
    const data: number[] = [];
    const vacinacaoRaivaDates: Date[] = [];
    const vacinacaoRiniteAtroficaDates: Date[] = [];
    const banhoDates: Date[] = [];

    this.suinosData.forEach(suino => {
      labels.push(suino.brincoAnimal);
      data.push(this.calculateActivity(suino));

      // Adicionando um dia extra para as datas
      let vacinacaoRaivaDate = new Date(suino.vacinacaoRaiva);
      vacinacaoRaivaDate.setDate(vacinacaoRaivaDate.getDate() + 1);
      vacinacaoRaivaDates.push(vacinacaoRaivaDate);

      let vacinacaoRiniteAtroficaDate = new Date(suino.vacinacaoRiniteAtrofica);
      vacinacaoRiniteAtroficaDate.setDate(vacinacaoRiniteAtroficaDate.getDate() + 1);
      vacinacaoRiniteAtroficaDates.push(vacinacaoRiniteAtroficaDate);

      let banhoDate = new Date(suino.banho);
      banhoDate.setDate(banhoDate.getDate() + 1);
      banhoDates.push(banhoDate);
    });

    this.chartData = {
      labels: labels,
      datasets: [{
        label: 'Atividade',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    this.suinosData.forEach((suino, index) => {
      suino.vacinacaoRaivaDate = vacinacaoRaivaDates[index] || null;
      suino.vacinacaoRiniteAtroficaDate = vacinacaoRiniteAtroficaDates[index] || null;
      suino.banhoDate = banhoDates[index] || null;
    });
  }

  calculateActivity(suino: any): number {
    let activity = 0;
    if (suino.vacinacaoRaivaDate) {
      activity += 1.5;
    }
    if (suino.vacinacaoRiniteAtroficaDate) {
      activity += 3;
    }
    if (suino.banhoDate) {
      activity += 4;
    }
    return activity;
  }

  calculateMaxWeight(): void {
    if (this.suinosData.length > 0) {
      this.maxWeight = Math.max(...this.suinosData.map(suino => suino.pesoKg || 0));
    }
  }

  getUltimaDataPesagem(suino: any): Date | null {
    if (suino.pesos && suino.pesos.length > 0) {
      return suino.pesos[suino.pesos.length - 1].dataPesagem;
    }
    return null;
  }

  getUltimoPeso(suino: any): number {
    if (suino.pesos && suino.pesos.length > 0) {
      return suino.pesos[suino.pesos.length - 1].pesoKg || 0;
    }
    return 0;
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
