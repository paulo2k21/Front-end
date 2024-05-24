import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvesService {
  private baseUrl = 'api/'; // Altere para a sua URL de backend

  constructor(private http: HttpClient) { }

  cadastrarPeso(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro-peso`, data);
  }

  editarPeso(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edicao-peso/${data.id}`, data);
  }

  // Implemente outros métodos conforme necessário (listagem, exclusão, etc.)
}
