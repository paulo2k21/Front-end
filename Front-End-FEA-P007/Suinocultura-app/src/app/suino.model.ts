// suino.model.ts
export interface Suino {
  id: string;
  brincoAnimal: number;
  brincoPai: number;
  brincoMae: number;
  dataNascimento: Date;
  dataSaida: Date;
  status: string;
  sexo: string;
  pesos: Peso[]; // Lista de pesos associada ao suíno
}

export interface Peso {
  dataPesagem: Date;
  pesoKg: number;
}
