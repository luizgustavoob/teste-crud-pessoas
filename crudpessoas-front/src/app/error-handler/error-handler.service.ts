import { Injectable, Injector, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(errorResponse: any): void {
    const messageService = this.injector.get(MessageService);
    const zone = this.injector.get(NgZone);

    if (typeof errorResponse === 'string') {
      zone.run(() => {
        messageService.add({severity: 'error', summary: 'Softplan',
          detail: errorResponse, life: 2000});
      });
    } else if (errorResponse instanceof HttpErrorResponse) {
      let msgError: string;
      try {
        msgError = errorResponse.error[0].mensagemUsuario;
      } catch (e) {
        msgError = errorResponse.error.message;
      }

      zone.run(() => {
        messageService.add({severity: 'error', summary: 'Softplan',
          detail: msgError, life: 2000});
      });
    }
  }
}
