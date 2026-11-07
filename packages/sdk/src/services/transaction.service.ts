import type { HttpClient } from '../http-client';
import type { TransactionList } from '../types/transaction';

export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  getTransactions(): Promise<TransactionList> {
    return this.http.get<TransactionList>('transactions');
  }
}