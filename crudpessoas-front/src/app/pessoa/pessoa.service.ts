import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pessoa } from './pessoa';
import { Page } from './page';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

const api = environment.api_pessoas;

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  save(id: number, pessoa: Pessoa): Observable<Pessoa> {
    if (id) {
      return this.update(id, pessoa);
    } else {
      return this.insert(pessoa);
    }
  }

  private insert(pessoa: Pessoa): Observable<Pessoa> {
    pessoa.dataNascimento = moment(pessoa.dataNascimento).toDate();
    return this.http.post<Pessoa>(api, pessoa);
  }

  private update(id: number, pessoa: Pessoa): Observable<Pessoa> {
    pessoa.dataNascimento = moment(pessoa.dataNascimento).toDate();
    const url = `${api}/${id}`;
    return this.http.put<Pessoa>(url, pessoa);
  }

  findAll(page: number, size: number): Observable<Page<Pessoa>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<Page<Pessoa>>(api, {params}).pipe(
      map((res: Page<Pessoa>) => {
        res.content.map(pessoa => pessoa.dataNascimento = moment(pessoa.dataNascimento).toDate());
        return res;
      })
    );
  }

  findById(id: number): Observable<Pessoa> {
    const url = `${api}/${id}`;
    return this.http.get<Pessoa>(url).pipe(
      map(pessoa => {
        pessoa.dataNascimento = moment(pessoa.dataNascimento).toDate();
        return pessoa;
      })
    );
  }

  delete(id: number) {
    const url = `${api}/${id}`;
    return this.http.delete(url);
  }

  cpfJaCadastrado(id: number, cpf: string): Observable<boolean> {
    const url = `${api}/cpfJaCadastrado?`;
    let params = new HttpParams();
    params = params.set('id', id.toString());
    params = params.set('cpf', cpf);
    return this.http.get<boolean>(url, { params });
  }
}
