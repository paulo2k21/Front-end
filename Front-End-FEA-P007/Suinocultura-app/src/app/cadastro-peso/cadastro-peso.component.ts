import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-peso',
  templateUrl: './cadastro-peso.component.html',
  styleUrls: ['./cadastro-peso.component.css']
})
export class CadastroPesoComponent implements OnInit {
  pesoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.pesoForm = this.formBuilder.group({
      brincoAnimal: ['', Validators.required],
      dataPesagem: ['', Validators.required],
      pesoKg: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]]
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.pesoForm.valid) {
      // Lógica para enviar os dados do peso para o backend
      console.log(this.pesoForm.value);
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }
}
