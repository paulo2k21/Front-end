import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-cadastro-suino',
  templateUrl: './cadastro-suino.component.html',
  styleUrls: ['./cadastro-suino.component.css']
})
export class CadastroSuinoComponent implements OnInit {
  suinoForm!: FormGroup;
  loading: boolean = false;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.suinoForm = this.formBuilder.group({
      brincoAnimal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: ['', Validators.required],
      status: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.suinoForm.valid) {
      // Adicionar o novo suíno ao Firebase Database
      this.db.list('suinos').push(this.suinoForm.value)
        .then(() => {
          // Limpar o formulário após o envio
          this.suinoForm.reset();
          this.toastr.success('Suíno cadastrado com sucesso!', 'Sucesso');
        })
        .catch(error => {
          console.error('Erro ao salvar suíno:', error);
          this.toastr.error('Erro ao cadastrar suíno. Por favor, tente novamente.', 'Erro');
        });
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro');
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
