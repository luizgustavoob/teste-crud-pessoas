import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CPFPipe implements PipeTransform {

  transform(cpf: string): string {
    const cpfValor = cpf.replace(/\D/g, '');

    if (cpfValor.length !== 11) {
        return cpf;
    }

    const cpfLista = cpfValor.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

    if (cpfLista && cpfLista.length === 5) {
        cpf = cpfLista[1] + '.' + cpfLista[2] + '.' + cpfLista[3] + '-' + cpfLista[4];
    }

    return cpf;
  }

}
