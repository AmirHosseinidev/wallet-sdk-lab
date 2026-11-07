import type { Wallet, Balance } from '../types/wallet';
import type { HttpClient } from '../http-client';

export class WalletService {
  constructor(private readonly http: HttpClient) {}

  getWallet(): Promise<Wallet> {
    return this.http.get<Wallet>('wallet');
  }

  getBalance(): Promise<Balance> {
    return this.http.get<Balance>('wallet/balance');
  }
}