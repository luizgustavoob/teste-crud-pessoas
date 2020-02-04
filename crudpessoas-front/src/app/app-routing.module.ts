import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListComponent } from './pessoa/pessoa-list/pessoa-list.component';
import { PessoaComponent } from './pessoa/pessoa/pessoa.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'pessoas/cadastro', component: PessoaComponent },
  { path: 'pessoas/:id', component: PessoaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'pessoas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
