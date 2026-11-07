import { HttpClient } from './http-client';

import { WalletService } from './services/wallet.service';
import { TransactionService } from './services/transaction.service';
import { ExchangeService } from './services/exchange.service';
import { TransferService } from './services/transfer.service';

import type { Wallet, Balance } from './types/wallet';
import type { TransactionList } from './types/transaction';

import type {
  ExchangeRequest,
  ExchangeResponse,
  TransferRequest,
  TransferResponse,
} from './types/transaction';

export interface WalletSDKOptions {
  baseURL: string;
}

export class WalletSDK {
  private readonly walletService: WalletService;
  private readonly transactionService: TransactionService;
  private readonly exchangeService: ExchangeService;
  private readonly transferService: TransferService;

  constructor(options: WalletSDKOptions) {
    const http = new HttpClient({
      baseURL: options.baseURL,
    });

    this.walletService = new WalletService(http);
    this.transactionService = new TransactionService(http);
    this.exchangeService = new ExchangeService(http);
    this.transferService = new TransferService(http);
  }

  getWallet(): Promise<Wallet> {
    return this.walletService.getWallet();
  }

  getBalance(): Promise<Balance> {
    return this.walletService.getBalance();
  }

  getTransactions(): Promise<TransactionList> {
    return this.transactionService.getTransactions();
  }

  exchange(data: ExchangeRequest): Promise<ExchangeResponse> {
    return this.exchangeService.exchange(data);
  }

  transfer(data: TransferRequest): Promise<TransferResponse> {
    return this.transferService.transfer(data);
  }
}