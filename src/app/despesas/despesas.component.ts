import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { DespesasSenadoresService } from '../despesas-senadores.service';
import { Senadores } from '../senadores/senadores';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css'],
})
export class DespesasComponent implements OnInit {
  id: number;
  despesasSenadores: Senadores = {
    id: 0,
    nomeSenador: '',
    despesas: [],
  };
  expenses: {};
  constructor(
    private despesasSenadoresService: DespesasSenadoresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = parseInt(paramMap.get('id'));
      this.despesasSenadoresService
        .retrieveDespesas(this.id)
        .subscribe((despesasSenadores) => {
          this.despesasSenadores = despesasSenadores;
          this.expenses = this.expensesSummary();
        });
    });
  }

  /*
    a. Tabela com o resumo das despesas, contendo o valor total gasto com cada 
    tipo de despesa, além do valor total de todas as despesas. Estas 
    informações não são fornecidas diretamente pelo Back End, elas precisam 
    ser calculadas com base no array despesas
  */
  expensesSummary() {
    let expenses = []
    this.despesasSenadores.despesas.forEach((expense) => {
      let hasExpense = expenses.find((hasExpense) => {
        return hasExpense.id === expense.tipo;
      });
      if (hasExpense) {
        hasExpense.total = hasExpense.total + expense.valor;
      } else {
        let spending = {};
        switch (expense.tipo) {
          case 1:
            spending = {
              id: 1,
              descricao: 'Aluguel de imóveis e despesas concernentes a eles',
              total: expense.valor,
            };
            break;
          case 2:
            spending = {
              id: 2,
              descricao: 'Divulgação da atividade parlamentar',
              total: expense.valor,
            };
            break;
          case 3:
            spending = {
              id: 3,
              descricao:
                'Aquisição de material de consumo para uso no escritório',
              total: expense.valor,
            };
            break;
          case 4:
            spending = {
              id: 4,
              descricao: 'Passagens aéreas, aquáticas e terrestres nacionais.',
              total: expense.valor,
            };
            break;
          case 5:
            spending = {
              id: 5,
              descricao:
                'Contratação de consultorias, assessorias, pesquisas, trabalhos técnicos e outros serviços.',
              total: expense.valor,
            };
            break;
          case 6:
            spending = {
              id: 6,
              descricao: 'Locomoção, hospedagem, alimentação e combustíveis.',
              total: expense.valor,
            };
            break;
          case 7:
            spending = {
              id: 7,
              descricao: 'Serviços de Segurança Privada',
              total: expense.valor,
            };
            break;
          default:
            break;
        }
        expenses.push(spending);
      }
    });
    return expenses;
  }
}
