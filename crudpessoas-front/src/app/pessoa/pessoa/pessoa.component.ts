import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { Pessoa, Sexo } from '../pessoa';
import { CPFJaCadastradoValidator } from './../../cpf/cpf-ja-cadastrado.validator';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html'
})
export class PessoaComponent implements OnInit {

  formPessoa: FormGroup;

  pt = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private cpfExisteValidator: CPFJaCadastradoValidator) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.formPessoa = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      sexo: Sexo.MASCULINO.toString(),
      dataNascimento: ['', Validators.required],
      email: ['', Validators.email],
      cpf: ['', Validators.required, this.cpfExisteValidator.verificaCPFJaCadastrado(id ? id : 0)],
      naturalidade: '',
      nacionalidade: ''
    });

    if (id) {
      this.carregar(id);
    }
  }

  carregar(idPessoa: number) {
    this.pessoaService.findById(idPessoa).subscribe( (res) => this.formPessoa.patchValue(res) );
  }

  cancelar() {
    this.router.navigate(['/pessoas']);
  }

  salvar() {
    const pessoa = this.formPessoa.getRawValue() as Pessoa;
    this.pessoaService.save(pessoa.id, pessoa).subscribe(
      () => {
        this.messageService.add({severity: 'success', summary: 'Softplan',
          detail: 'Pessoa salva com sucesso!', life: 2000});
        this.router.navigate(['/pessoas']);
    });
  }

  getValueMasculino(): string {
    return Sexo.MASCULINO.toString();
  }

  getValueFeminino(): string {
    return Sexo.FEMININO.toString();
  }

  getValueOutro(): string {
    return Sexo.OUTRO.toString();
  }
}
