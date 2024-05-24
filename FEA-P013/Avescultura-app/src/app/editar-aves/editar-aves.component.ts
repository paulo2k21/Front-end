import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aves } from '../aves.model'; // Importe o modelo de aves

@Component({
  selector: 'app-editar-aves',
  templateUrl: './editar-aves.component.html',
  styleUrls: ['./editar-aves.component.css']
})
export class EditarAvesComponent implements OnInit {
  aveForm!: FormGroup;
  aveSelecionada: Aves | null = null; // Declare a variável para a ave selecionada

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.aveForm = this.formBuilder.group({
      anilhaAnimal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      anilhaPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      anilhaMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: ['', Validators.required],
      status: ['', Validators.required],
      sexo: ['', Validators.required]
    });

    // Carregar os dados da ave selecionada no formulário de edição
    if (this.aveSelecionada) {
      this.aveForm.patchValue({
        anilhaAnimal: this.aveSelecionada.anilhaAnimal,
        anilhaPai: this.aveSelecionada.anilhaPai,
        anilhaMae: this.aveSelecionada.anilhaMae,
        dataNascimento: this.aveSelecionada.dataNascimento,
        dataSaida: this.aveSelecionada.dataSaida,
        status: this.aveSelecionada.status,
        sexo: this.aveSelecionada.sexo
      });
    }
  }

  salvarEdicao() {
    // Implemente a lógica para salvar as alterações da ave
  }

  cancelarEdicao() {
    // Implemente a lógica para cancelar a edição
  }
}
