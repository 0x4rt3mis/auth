import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private url: string = 'https://api.escuelajs.co/api/v1/auth/login/';


  public sign(payload: { email: string; password: string }): Observable<any>{
    return this.http.post<{access_token: string}>(`${this.url}`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.access_token);
        return this.router.navigate(['admin'])
      }),
      catchError((e) => {
        if(e.error.message) return throwError(() => e.error.message);

        return throwError(() => "No nomento não estamos conseguindo validar os dados, tente novamente mais tarde");
      })
    );
  }

  public logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate([''])
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem("access_token");

    if(!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
