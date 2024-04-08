import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-sessao',
  templateUrl: './cadastro-sessao.component.html',
  styleUrls: ['./cadastro-sessao.component.css']
})
export class CadastroSessaoComponent implements OnInit {
  dataSessao: Date | null = null;
  descricao: string = '';
  brincoAnimal: string = '';
  atividadePlanejada: string = '';
  listaAnimais: string[] = [];
  atividadesPlanejadas: string[] = [];
  sessoesCadastradas: any[] = [];
  brincosDisponiveis: string[] = [];
  cadastroSucesso: boolean = false;
  itensPorPagina: number = 4;
  paginaAtual: number = 1;
  userName: string = '';

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarSessoesCadastradas();
    this.carregarBrincosDisponiveis();
    this.getDisplayName();

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
  }

  carregarBrincosDisponiveis(): void {
    this.db.list('/suinos').valueChanges().subscribe((suinos: any[]) => {
      this.brincosDisponiveis = suinos.map(suino => suino.brincoAnimal);
    });
  }

  carregarSessoesCadastradas(): void {
    this.db.list('/sessoes').valueChanges().subscribe((sessoes: any[]) => {
      this.sessoesCadastradas = sessoes;
    });
  }

  cadastrarSessao(): void {
    const novaSessao = {
      dataSessao: this.dataSessao,
      descricao: this.descricao,
      animais: this.listaAnimais,
      atividadesPlanejadas: this.atividadesPlanejadas
    };
    this.db.list('/sessoes').push(novaSessao).then(() => {
      console.log('Sessão cadastrada com sucesso!');
      this.cadastroSucesso = true;
      setTimeout(() => {
        this.cadastroSucesso = false;
      }, 3000);
    }).catch(error => {
      console.error('Erro ao cadastrar a sessão:', error);
    });
  }

  adicionarAnimal(): void {
    if (this.brincoAnimal.trim() !== '') {
      this.listaAnimais.push(this.brincoAnimal);
      this.brincoAnimal = '';
    }
  }

  removerAnimal(index: number): void {
    this.listaAnimais.splice(index, 1);
  }

  adicionarAtividade(): void {
    if (this.atividadePlanejada.trim() !== '') {
      this.atividadesPlanejadas.push(this.atividadePlanejada);
      this.atividadePlanejada = '';
    }
  }

  removerAtividade(index: number): void {
    this.atividadesPlanejadas.splice(index, 1);
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.paginasTotais) {
      this.paginaAtual++;
    }
  }

  get paginasTotais(): number {
    return Math.ceil(this.sessoesCadastradas.length / this.itensPorPagina);
  }

  get sessoesPaginaAtual(): any[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.sessoesCadastradas.slice(inicio, fim);
  }

  getDisplayName(): void {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userName = user.displayName || user.email || 'Usuário';
      }
    });
  }

  logOut(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
