import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaListComponent } from './pessoa/pessoa-list/pessoa-list.component';
import { PessoaComponent } from './pessoa/pessoa/pessoa.component';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { MessageErrorComponent } from './message-error/message-error.component';
import { CPFPipe } from './cpf/cpf.pipe';
import { ErrorHandlerService } from './error-handler/error-handler.service';

import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    PessoaListComponent,
    PessoaComponent,
    MessageErrorComponent,
    CPFPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    AppRoutingModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
