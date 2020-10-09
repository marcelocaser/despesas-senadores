import { Despesas } from '../despesas/despesas';

export interface Senadores {
  id: number;
  nomeSenador: string;
  despesas?: Despesas[];
}
