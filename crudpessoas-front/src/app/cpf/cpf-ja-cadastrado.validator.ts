import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { PessoaService } from './../pessoa/pessoa.service';

@Injectable({
  providedIn: 'root'
})
export class CPFJaCadastradoValidator {

  constructor(private pessoaService: PessoaService) { }

  verificaCPFJaCadastrado(id: number) {
    return (control: AbstractControl) => {
      return control
          .valueChanges
          .pipe(debounceTime(500))
          .pipe(switchMap(cpf => this.pessoaService.cpfJaCadastrado(id, cpf)))
          .pipe(map(existe => existe ? { existe: true } : null))
          .pipe(first());
    };
  }
}
