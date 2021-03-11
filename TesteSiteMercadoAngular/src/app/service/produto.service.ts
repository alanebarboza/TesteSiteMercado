
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Produto } from '../resources/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<Array<Produto>>{
    const url = "http://localhost:56221/produto";
    return this.httpClient.get<Array<Produto>>(url);
  }

  public save(produto: Produto, arquivo: any): Observable<Produto>{
    const url = "http://localhost:56221/produto/";
    
    const formData: FormData = new FormData();
    if(arquivo && arquivo.name)
      formData.append("imagem", arquivo, produto.nome);

    var prod = {
      Id : produto.id,
      Nome: produto.nome,
      ValorVenda: produto.valorVenda
    };

    formData.append("produto", JSON.stringify(prod));
    return this.httpClient.post<Produto>(url, formData);
  }

  public delete(produto: Produto): Observable<Produto>{
    const url = "http://localhost:56221/produto/"+produto.id;
    return this.httpClient.delete<Produto>(url);
  }
  
}
