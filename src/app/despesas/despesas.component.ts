import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
          this.transformDespesasSenadores();
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
    let expenses = [];
    this.despesasSenadores.despesas.forEach((expense) => {
      let { tipo, valor } = expense;
      let hasExpense = expenses.find((hasExpense) => {
        return hasExpense.id === tipo;
      });
      if (hasExpense) {
        hasExpense.total = hasExpense.total + valor;
      } else {
        let spending = {};
        switch (tipo) {
          case 1:
            spending = {
              id: 1,
              total: valor,
            };
            break;
          case 2:
            spending = {
              id: 2,
              total: valor,
            };
            break;
          case 3:
            spending = {
              id: 3,
              total: valor,
            };
            break;
          case 4:
            spending = {
              id: 4,
              total: valor,
            };
            break;
          case 5:
            spending = {
              id: 5,
              total: valor,
            };
            break;
          case 6:
            spending = {
              id: 6,
              total: valor,
            };
            break;
          case 7:
            spending = {
              id: 7,
              total: valor,
            };
            break;
          default:
            break;
        }
        expenses.push(spending);
      }
    });
    let withGrandTotal = expenses.reduce((total, cur) => {
      return (total += cur.total);
    }, 0);
    withGrandTotal = [...expenses, {id: 99, /*descricao: 'TOTAL',*/ total: withGrandTotal}];
    return withGrandTotal;
  }

  transformDespesasSenadores() {
    let { id, nomeSenador } = this.despesasSenadores;
    let despesas = [];
    this.despesasSenadores.despesas.forEach((expense) => {
      let { tipo, fornec, ano, mes, dia, valor } = expense;
      let newExpense = {
        tipo,
        fornec,
        dataDespesa: new Date(ano, mes, dia),
        valor,
      };
      despesas.push(newExpense);
    });
    this.despesasSenadores = { id, nomeSenador, despesas };
  }
}
