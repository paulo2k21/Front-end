import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-suinos',
  templateUrl: './lista-suinos.component.html',
  styleUrls: ['./lista-suinos.component.css']
})
export class ListaSuinosComponent implements OnInit {
  suinos: any[] = [];
  suinoSelecionado: any = null;
  filtroBrincoPai: string = '';
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
      brincoAnimal: ['', Validators.required],
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

    // Carregando os suínos do banco de dados
    const suinosRef = this.db.list('suinos');
    suinosRef.snapshotChanges().subscribe((suinos: any[]) => {
      this.suinos = suinos.map((suino: any) => {
        return { id: suino.payload.key, ...suino.payload.val() };
      });
    });
  }

  // Função para salvar o peso do animal e adicionar ao suíno
  salvarPeso() {
    if (this.pesoForm.valid) {
      const { brincoAnimal, dataPesagem, pesoKg, atividade, vacinacaoRaiva, vacinacaoRiniteAtrofica, observacao } = this.pesoForm.value;

      // Encontrar o suíno correspondente pelo brincoAnimal
      const suino = this.suinos.find((s: any) => s.brincoAnimal === brincoAnimal);

      if (suino) {
        // Se o suíno existir, atualizar os dados de peso
        if (!suino.pesos) {
          suino.pesos = [];
        }
        // Adicionar os dados de peso ao suíno
        suino.pesos.push({ dataPesagem, pesoKg, atividade, vacinacaoRaiva, vacinacaoRiniteAtrofica, observacao });

        // Atualizar o suíno no Firebase Database
        const suinoRef = this.db.object(`suinos/${suino.id}`);
        suinoRef.update(suino)
          .then(() => {
            this.pesoForm.reset();
            this.toastr.success('Peso cadastrado com sucesso!', 'Sucesso');
          })
          .catch(error => {
            console.error('Erro ao salvar peso:', error);
            this.toastr.error('Erro ao cadastrar peso. Por favor, tente novamente.', 'Erro');
          });
      } else {
        this.toastr.error('Suíno não encontrado.', 'Erro');
      }
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro');
    }
  }

  // Função para editar suíno
  editarSuino(suino: any) {
    this.suinoSelecionado = { ...suino };
    this.isEditFormVisible = true; // Mostrar o formulário de edição
  }

  // Função para salvar edição do suíno
  salvarEdicao() {
    const suinoRef = this.db.object(`suinos/${this.suinoSelecionado.id}`);
    suinoRef.update(this.suinoSelecionado)
      .then(() => {
        this.toastr.success('Suíno editado com sucesso!', 'Sucesso');
        this.suinoSelecionado = null;
      })
      .catch(error => {
        console.error(error);
        this.toastr.error('Ocorreu um erro ao editar o suíno.', 'Erro');
      });
  }

  // Função para voltar à lista de suínos
  voltarListaSuinos() {
    this.suinoSelecionado = null; // Supondo que isso controle a visibilidade do formulário de edição
  }

  // Função para deletar suíno
  deletarSuino(suino: any) {
    if (confirm('Tem certeza de que deseja excluir este suíno?')) {
      const suinoRef = this.db.object(`suinos/${suino.id}`);
      suinoRef.remove()
        .then(() => {
          this.toastr.success('Suíno excluído com sucesso!', 'Sucesso');
        })
        .catch(error => {
          console.error(error);
          this.toastr.error('Ocorreu um erro ao excluir o suíno.', 'Erro');
        });
    }
  }

  // Função para fazer logout
  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
