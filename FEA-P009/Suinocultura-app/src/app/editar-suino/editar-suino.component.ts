import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suino } from '../suino.model'; // Importe o modelo do suíno

@Component({
  selector: 'app-editar-suino',
  templateUrl: './editar-suino.component.html',
  styleUrls: ['./editar-suino.component.css']
})
export class EditarSuinoComponent implements OnInit {
  suinoForm!: FormGroup;
  suinoSelecionado: Suino | null = null; // Declare a variável para o suíno selecionado

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.suinoForm = this.formBuilder.group({
      brincoAnimal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: ['', Validators.required],
      status: ['', Validators.required],
      sexo: ['', Validators.required]
    });

    // Carregar os dados do suíno selecionado no formulário de edição
    if (this.suinoSelecionado) {
      this.suinoForm.patchValue({
        brincoAnimal: this.suinoSelecionado.brincoAnimal,
        brincoPai: this.suinoSelecionado.brincoPai,
        brincoMae: this.suinoSelecionado.brincoMae,
        dataNascimento: this.suinoSelecionado.dataNascimento,
        dataSaida: this.suinoSelecionado.dataSaida,
        status: this.suinoSelecionado.status,
        sexo: this.suinoSelecionado.sexo
      });
    }
  }

  salvarEdicao() {
    // Implemente a lógica para salvar as alterações do suíno
  }

  cancelarEdicao() {
    // Implemente a lógica para cancelar a edição
  }
}
