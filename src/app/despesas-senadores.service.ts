import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Senadores } from './senadores/senadores';

const urlBase = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DespesasSenadoresService {
  constructor(private httpClient: HttpClient) {}

  listSenadores() {
    return this.httpClient.get<Senadores[]>(`${urlBase}/senadores?_sort=nomeSenador`);
  }

  retrieveDespesas(id: number) {
    return this.httpClient.get<Senadores>(`${urlBase}/despesasSenadores/${id}`);
  }
}
