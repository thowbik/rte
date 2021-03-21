import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';

import { UserSessionService } from './usersession.service';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

    private baseUrl = environment.apiBaseUrl;
    private authorization_key = environment.authorization;
    private loginAuthorization_key = environment.loginAuthorization;
    private mapApi = environment.mapApi;
  constructor(
    private router: Router,
    private sessionService: UserSessionService,
    private authService: AuthenticationService,
    private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
      const started = Date.now();
    // add authorization header with jwt token if available
    const authToken = this.sessionService.authToken();
        debugger;
        //console.log(token);

        if(authToken !=null){
           if(request.url.includes(this.mapApi))
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                // 'Content-Type': 'application/x-www-form-urlencoded',
              })    
            });
            return next.handle(requests).pipe(
              catchError(this.handleError<any>('role', [])))   
          }
          else {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      //  'Authorization': 'RTE_web@2020_api',         
                      'Token':authToken
              })    
            });
            return next.handle(requests).pipe(
                  catchError(this.handleError<any>('role', []))
            )  
          }
      
        }
        else{
          let requests = request.clone({
            headers:new HttpHeaders({         
              // 'Authorization': 'RTE_web@2020_api',         
              //'Token':authToken     
            })    
        });
         return next.handle(requests).pipe(
           catchError(this.handleError<any>('role', []))
    )
        }
    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        const action = request.urlWithParams.replace(this.baseUrl, '');
        const elapsed = Date.now() - started;
        console.log(`${action} took ${elapsed} milliseconds`);
      }
    }).catch((error, caught) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          // this.authService.logOut();
          // this.router.navigate(['/login']);
        } else {
          // this.broadcastFriendlyErrorMessage(error);
        }
      }
      // return the error to the method that called it
      return Observable.throw(error);
    }) as any;
             
     }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          if(error instanceof HttpErrorResponse){
            console.error("Error: " + error.status);
            if(error.status == 401){
                // localStorage.clear();
                // this.authService.logOut();
                // this.router.navigate(['/login']);
            }
            else if(error.status == 404){
               this.alertService.error(error.message);
            }
            else if(error.status == 503){
              this.alertService.error(error.message);
            }
            else if(error.status == 0){
              this.alertService.error(error.message);;
            }
            else{
              let errorMessage = '';
              let type : number;
              if (error.error instanceof ErrorEvent) {
                 // client-side error
                  errorMessage = `Error: ${error.error.message}`;
                 type = 1;
              } else {
                  // server-side error
                  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                  type = 2;
              }
                return throwError({error_status :type == 2 ? error.status : '',
                                   error_message:error.message,
                                   error_text   :type == 2 ? error.statusText : '',
                                   html_format  :errorMessage,
                                   error_type   :type,
                                  });
            }
          }
        };
      }

    //   return next.handle(request).do((event: any) => {
    //     if (event instanceof HttpResponse) {
    //       const action = request.urlWithParams.replace(this.baseUrl, '');
    //       const elapsed = Date.now() - started;
    //       console.log(`${action} took ${elapsed} milliseconds`);
    //     }
    //   }).catch((error, caught) => {
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.status === 401) {
    //         this.authService.logOut();
    //         this.router.navigate(['/login']);
    //       } else {
    //         this.broadcastFriendlyErrorMessage(error);
    //       }
    //     }
    //     // return the error to the method that called it
    //     return Observable.throw(error);
    //   }) as any;
    // }
  
    // broadcastFriendlyErrorMessage(rejection) {
    //     let msg = '';
    //   if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
    //     this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
    //   } else if (rejection.status === 400) {
    //     if (rejection.error) {// jshint ignore:line
    //       msg = rejection.error; // jshint ignore:line
    //     }
    //     this.alertService.error(msg);
    //   } else if (rejection.status === 404) {
    //     if (rejection.message) {
    //       this.alertService.error(rejection.message);
    //     }
    //   } else if (rejection.status === 500) {
    //     if (rejection.message) {
    //       let ex = rejection.message;
    //       while (ex.innerException) {
    //         ex = ex.innerException;
    //       }
    //       this.alertService.error(ex.exceptionMessage);
    //     }
    //   } else if (rejection.responseStatus === 401) {
    //     this.authService.logOut();
    //     this.router.navigate(['/login']);
    //   } else if (rejection.responseStatus === 0) {
    //     this.alertService.error('Error occured, while uploading file');
    //   } else if (rejection.responseStatus === 400) {
    //     if (rejection.response) { // jshint ignore:line
    //       msg = rejection.response; // jshint ignore:line
    //     }
    //     this.alertService.error(msg);
    //   }
    // }
}
