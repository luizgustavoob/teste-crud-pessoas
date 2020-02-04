import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from './../pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  @ViewChild('tablePessoas', {static: false}) table: Table;

  pessoas: Pessoa[] = [];

  totalRecords = 0;
  private currentPage = 0;
  private maxRecords = 5;

  constructor(private router: Router,
              private pessoaService: PessoaService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.carregar(this.currentPage, this.maxRecords);
  }

  private carregar(page: number, size: number) {
    this.pessoaService.findAll(page, size).subscribe(
      (resp) => {
        this.totalRecords = resp.totalElements;
        this.pessoas = resp.content;
      }
    );
  }

  onLazyLoad(event) {
    this.currentPage = event.first / event.rows;
    this.maxRecords = event.rows;
    setTimeout(() => this.carregar(this.currentPage, this.maxRecords), 200);
  }

  editar(id: number) {
    this.router.navigate(['/pessoas', id]);
  }

  remover(id: number) {
    this.confirmationService.confirm({
      header: 'Softplan',
      message: 'Deseja realmente excluir a pessoa?',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.pessoaService.delete(id).subscribe(
          () => {
            this.table.reset();
            this.messageService.add({severity: 'success', summary: 'Softplan',
              detail: 'Pessoa removida com sucesso!', life: 2000});
          }
        );
      }
    });
  }

}
