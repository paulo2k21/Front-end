import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { Aves } from '../aves.model'; // Importe o modelo de aves

@Component({
  selector: 'app-cadastro-aves',
  templateUrl: './cadastro-aves.component.html',
  styleUrls: ['./cadastro-aves.component.css']
})
export class CadastroAvesComponent implements OnInit {
  aveForm!: FormGroup;
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

    this.aveForm = this.formBuilder.group({
      anilhaAnimal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      anilhaPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      anilhaMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: ['', Validators.required],
      status: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.aveForm.valid) {
      // Adicionar a nova ave ao Firebase Database
      this.db.list('aves').push(this.aveForm.value)
        .then(() => {
          // Limpar o formulário após o envio
          this.aveForm.reset();
          this.toastr.success('Ave cadastrada com sucesso!', 'Sucesso');
        })
        .catch(error => {
          console.error('Erro ao salvar ave:', error);
          this.toastr.error('Erro ao cadastrar ave. Por favor, tente novamente.', 'Erro');
        });
    } else {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro');
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
