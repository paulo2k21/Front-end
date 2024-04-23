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
  vacinacaoRaiva: Date; // Vacinação Raiva
  vacinacaoRiniteAtrofica: Date; // Vacinação Rinite Atrófica
  banho: Date; // Data do banho
  observacao?: string; // Observação
}

export interface Peso {
  dataPesagem: Date;
  pesoKg: number;
}
