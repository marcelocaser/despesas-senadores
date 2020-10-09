import { Component, OnInit } from '@angular/core';
import { DespesasSenadoresService } from '../despesas-senadores.service';
import { Senadores } from './senadores';

@Component({
  selector: 'app-senadores',
  templateUrl: './senadores.component.html',
  styleUrls: ['./senadores.component.css']
})
export class SenadoresComponent implements OnInit {

  senadores: Senadores[] = [];

  constructor(private despesasSenadoresService: DespesasSenadoresService) { }

  ngOnInit(): void {
    this.despesasSenadoresService.listSenadores().subscribe((senadores) => {
      this.senadores = senadores;
    })
  }

}
