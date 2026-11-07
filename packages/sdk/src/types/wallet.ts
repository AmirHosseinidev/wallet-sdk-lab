import type { Currency } from './common';

export interface Wallet {
  id: string;
  owner: string;
  status: string;
  createdAt: string;
}

export interface Balance {
  walletId: string;
  balances: Record<Currency, number>;
}