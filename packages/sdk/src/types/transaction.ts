import type { Currency } from './common';

export type TransactionType = 'exchange' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amountMinor: number;
  currency: Currency;
  description: string;
  status: 'completed';
  createdAt: string;
}

export interface TransactionList {
  count: number;
  transactions: Transaction[];
}

export interface ExchangeRequest {
  fromCurrency: Currency;
  toCurrency: Currency;
  amountMinor: number;
}

export interface TransferRequest {
  recipient: string;
  currency: Currency;
  amountMinor: number;
}

export interface ExchangeResponse {
  transaction: Transaction;
  received: {
    amountMinor: number;
    currency: Currency;
  };
  balances: Record<Currency, number>;
}

export interface TransferResponse {
  message: string;
  transaction: Transaction;
  balances: Record<Currency, number>;
}