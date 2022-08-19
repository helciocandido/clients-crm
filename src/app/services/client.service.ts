import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl = 'http://localhost:3001/clients';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Retorna a lista de clientes READ
  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiUrl);
  }

  // Salva cliente no banco CREATE
  private clientRow: Array<[]> = [];

  postClient(client: Client[]): Observable<Client[]> {
    return this.httpClient.post<Client[]>(
      this.apiUrl,
      client,
      this.httpOptions
    );
  }

  //Editar cliente UPDATE
  updateClient(id: string, client: Client): Observable<Client> {
    return this.httpClient.post<Client>(
      `${this.apiUrl}/info/${id}`,
      client,
      this.httpOptions
    );
  }

  //Lista cliente único
  getClient(id: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiUrl}/info/${id}`);
  }

  // Exclui o cliente do banco DELETE
  deleteClient(id: number, client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${this.apiUrl}/delete/${id}`, client);
  }
}
