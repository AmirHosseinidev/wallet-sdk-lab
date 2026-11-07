import { BadRequestException, Injectable } from '@nestjs/common';

type Currency = 'USD' | 'EUR';

export interface Transaction {
  id: string;
  type: 'exchange' | 'transfer';
  amountMinor: number;
  currency: Currency;
  description: string;
  status: 'completed';
  createdAt: string;
}

@Injectable()
export class AppService {
  private readonly wallet = {
    id: 'wallet_test_001',
    owner: 'Test User',
    status: 'active',
    createdAt: '2026-11-07T00:00:00.000Z',
  };

  private balances: Record<Currency, number> = {
    USD: 250000,
    EUR: 100000,
  };

  private transactions: Transaction[] = [];

  getWallet() {
    return this.wallet;
  }

  getBalance() {
    return {
      walletId: this.wallet.id,
      balances: this.balances,
    };
  }

  getTransactions() {
    return {
      count: this.transactions.length,
      transactions: this.transactions,
    };
  }

  exchange(from: Currency, to: Currency, amountMinor: number) {
    if (from === to) {
      throw new BadRequestException(
        'Source and target currencies must be different.',
      );
    }

    if (this.balances[from] < amountMinor) {
      throw new BadRequestException('Insufficient balance.');
    }

    // Fixed demo exchange rates:
    // 1 USD = 0.92 EUR
    // 1 EUR = 1 / 0.92 USD
    const receivedAmount =
      from === 'USD'
        ? Math.floor((amountMinor * 92) / 100)
        : Math.floor((amountMinor * 100) / 92);

    this.balances[from] -= amountMinor;
    this.balances[to] += receivedAmount;

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      type: 'exchange',
      amountMinor,
      currency: from,
      description: `Exchanged ${from} to ${to}. Received ${receivedAmount} ${to} minor units.`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    this.transactions.unshift(transaction);

    return {
      transaction,
      received: {
        amountMinor: receivedAmount,
        currency: to,
      },
      balances: this.balances,
    };
  }

  transfer(recipient: string, currency: Currency, amountMinor: number) {
    if (this.balances[currency] < amountMinor) {
      throw new BadRequestException('Insufficient balance.');
    }

    this.balances[currency] -= amountMinor;

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      type: 'transfer',
      amountMinor,
      currency,
      description: `Test transfer to ${recipient}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    this.transactions.unshift(transaction);

    return {
      message: 'Test transfer completed successfully.',
      transaction,
      balances: this.balances,
    };
  }
}
