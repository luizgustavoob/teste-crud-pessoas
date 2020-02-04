export class Pessoa {
  id: number;
  nome: string;
  sexo: Sexo;
  email: string;
  dataNascimento: Date;
  naturalidade: string;
  nacionalidade: string;
  cpf: string;
}

export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO'
}
