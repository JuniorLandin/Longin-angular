import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000';
  
  constructor(private http: HttpClient, private router: Router) { }

  public sign(payLoaad: {email: string, password: string}): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/sign`, payLoaad).pipe(
      map((item) => {
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', JSON.stringify(item.token))
        return this.router.navigate(['admin'])
      }),
      catchError((err) => {
        if(err.error.message) return throwError(()=> err.error.message);
        return throwError(()=> "No momento não estamos conseguindo validar nosso dados, tente novamente mais tarde")
      })
    )
  }

  public logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate([''])
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token')

    if(!token) return false
    
    const jwtHelper = new JwtHelperService;
    return !jwtHelper.isTokenExpired(token)
  }
}
