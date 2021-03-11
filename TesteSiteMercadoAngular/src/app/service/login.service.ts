
import { Injectable } from '@angular/core';
import { Usuario } from '../resources/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private httpClient: HttpClient) { }

  public doLogin(login: Usuario): Observable<Usuario>{
    const url = "https://dev.sitemercado.com.br/api/login";
    
    const httpOptions = {
    headers: new HttpHeaders({
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
        "Authorization": "Basic "+ btoa(login.username+":"+login.password),
  })};

    return this.httpClient.post<Usuario>(url, JSON.stringify(login), httpOptions)
  }
  
}
