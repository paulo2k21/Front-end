import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-aves',
  templateUrl: './lista-aves.component.html',
  styleUrls: ['./lista-aves.component.css']
})
export class ListaAvesComponent implements OnInit {
  aves: any[] = [];
  aveSelecionada: any = null;
  filtroAnilhaPai: string = '';
  userData: any;
  pesoForm!: FormGroup; // Formulário para cadastro de peso
  isEditFormVisible: boolean = false;
  userEmail: string = '';

  constructor(
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Inicializando o FormGroup para o formulário de cadastro de peso
    this.pesoForm = this.formBuilder.group({
      anilhaAnimal: ['', Validators.required],
      dataPesagem: ['', Validators.required],
      pesoKg: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      atividade: [''],
      vacinacaoRaiva: [''],
      vacinacaoRiniteAtrofica: [''],
      observacao: ['']
    });

    // Obtendo informações do usuário logado
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.userData = user;
        this.userEmail = user?.email ?? '';// Atribui o email do usuário logado
      } else {
        this.router.navigate(['/login']);
      }
    });

    // Carregando as aves do banco de dados
    const avesRef = this.db.list('aves');
    avesRef.snapshotChanges().subscribe((aves: any[]) => {
      this.aves = aves.map((ave: any) => {
        return { id: ave.payload.key, ...ave.payload.val() };
      });
    });
  }

  // Função para salvar o peso do animal e adicionar à ave
  salvarPeso() {
    if (this.pesoForm.valid) {
      const { anilhaAnimal, dataPesagem, pesoKg, atividade, vacinacaoRaiva, vacinacaoRiniteAtrofica, observacao } = this.pesoForm.value;

      // Encontrar a ave correspondente pela anilhaAnimal
      const ave = this.aves.find((a: any) => a.anilhaAnimal === anilhaAnimal);

      if (ave) {
        // Se a ave existir, atualizar os dados de peso
        if (!ave.pesos) {
          ave.pesos = [];
        }
        // Adicionar os dados de peso à ave
        ave.pesos.push({ dataPesagem, pesoKg, atividade, vacinacaoRaiva, vacinacaoRiniteAtrofica, observacao });

        // Atualizar a ave no Firebase Database
        const aveRef = this.db.object(`aves/${ave.id}`);
        aveRef.update(ave)
          .then(() => {
            this.pesoForm.reset();
            this.toastr.success('Peso cadastrado com sucesso!', 'Sucesso');
          })
          .catch(error => {
            console.error('Erro ao salvar peso:', error);
            this.toastr.error('Erro ao cadastrar peso. Por favor, tente novamente.', 'Erro');
          });
      } else {
        this.toastr.error('Ave não encontrada.', 'Erro');
      }
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro');
    }
  }

  // Função para editar ave
  editarAve(ave: any) {
    this.aveSelecionada = { ...ave };
    this.isEditFormVisible = true; // Mostrar o formulário de edição
  }

  // Função para salvar edição da ave
  salvarEdicao() {
    const aveRef = this.db.object(`aves/${this.aveSelecionada.id}`);
    aveRef.update(this.aveSelecionada)
      .then(() => {
        this.toastr.success('Ave editada com sucesso!', 'Sucesso');
        this.aveSelecionada = null;
      })
      .catch(error => {
        console.error(error);
        this.toastr.error('Ocorreu um erro ao editar a ave.', 'Erro');
      });
  }

  // Função para voltar à lista de aves
  voltarListaAves() {
    this.aveSelecionada = null; // Supondo que isso controle a visibilidade do formulário de edição
  }

  // Função para deletar ave
  deletarAve(ave: any) {
    if (confirm('Tem certeza de que deseja excluir esta ave?')) {
      const aveRef = this.db.object(`aves/${ave.id}`);
      aveRef.remove()
        .then(() => {
          this.toastr.success('Ave excluída com sucesso!', 'Sucesso');
        })
        .catch(error => {
          console.error(error);
          this.toastr.error('Ocorreu um erro ao excluir a ave.', 'Erro');
        });
    }
  }

  // Função para fazer logout
  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
