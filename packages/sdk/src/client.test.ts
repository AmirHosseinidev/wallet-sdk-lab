
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WalletSDK } from './client';
import { SDKError } from './errors/sdk-error';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('WalletSDK', () => {
  const baseURL = 'http://localhost:3000/api/v1';

  it('should get wallet information', async () => {
    const mockWallet = {
      id: 'wallet_test_001',
      owner: 'Test User',
      status: 'active',
      createdAt: '2026-11-07T00:00:00.000Z',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockWallet), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const sdk = new WalletSDK({ baseURL });
    const result = await sdk.getWallet();

    expect(result).toEqual(mockWallet);
    expect(fetch).toHaveBeenCalledWith(
      `${baseURL}/wallet`,
      expect.any(Object),
    );
  });

  it('should get wallet balance', async () => {
    const mockBalance = {
      walletId: 'wallet_test_001',
      balances: {
        USD: 250000,
        EUR: 100000,
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockBalance), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const sdk = new WalletSDK({ baseURL });
    const result = await sdk.getBalance();

    expect(result).toEqual(mockBalance);
  });

  it('should get transactions', async () => {
    const mockTransactions = {
      count: 0,
      transactions: [],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockTransactions), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    const sdk = new WalletSDK({ baseURL });
    const result = await sdk.getTransactions();

    expect(result).toEqual(mockTransactions);
  });

  it('should handle API errors correctly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            message: 'Insufficient balance.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      ),
    );

    const sdk = new WalletSDK({ baseURL });

    let caughtError: unknown;

    try {
      await sdk.transfer({
        recipient: 'test_user_002',
        currency: 'USD',
        amountMinor: 999999999,
      });
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeInstanceOf(SDKError);

    expect(caughtError).toMatchObject({
      statusCode: 400,
      message: 'Insufficient balance.',
    });
  });
});
