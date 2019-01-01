import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from '../../utility/services/notifier.service';
import { } from '../../utility/services/notifier.service'
import { HttpEvent } from '@angular/common/http/src/response';
import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private notifierService: NotifierService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.notifierService.showLoader();
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.notifierService.hideLoader();
            }
        }, (error) => {
            if (error instanceof HttpErrorResponse) {
                this.notifierService.hideLoader();
                this.notifierService.showToaster({ message: error.message, type:'danger' });
            }
        })
    }
}