# Wallet SDK Usage Guide

## 1. Overview

The Wallet SDK is a reusable TypeScript client for interacting with the Wallet API.

It provides a typed interface for wallet operations and abstracts the underlying HTTP requests.

**Package name:**

```text
@wallet-sdk-lab/sdk
```

## 2. Installation

Inside the monorepo, install the SDK in the Demo workspace:

```bash
npm install @wallet-sdk-lab/sdk --workspace=wallet-demo
```

For external projects, the package must first be published or made available through a Git-based or local package installation method. It is currently a private workspace package.

## 3. Importing the SDK

```typescript
import { WalletSDK } from '@wallet-sdk-lab/sdk';
```

To access the custom error class:

```typescript
import { SDKError } from '@wallet-sdk-lab/sdk';
```

## 4. Initialize the Client

Create an SDK instance using the API base URL:

```typescript
const sdk = new WalletSDK({
  baseURL: 'http://localhost:3000/api/v1',
});
```

The SDK client should be initialized once and reused by the application.

## 5. Available Methods

| Method | Description |
|---|---|
| `getWallet()` | Retrieve wallet information |
| `getBalance()` | Retrieve wallet balances |
| `getTransactions()` | Retrieve transaction history |
| `exchange(data)` | Exchange currencies |
| `transfer(data)` | Perform a demonstration transfer |

All methods return Promises.

## 6. Retrieve Wallet Information

```typescript
const wallet = await sdk.getWallet();

console.log(wallet.id);
console.log(wallet.owner);
console.log(wallet.status);
```

Return type:

```typescript
Promise<Wallet>
```

## 7. Retrieve Wallet Balance

```typescript
const balance = await sdk.getBalance();

console.log(balance.walletId);
console.log(balance.balances.USD);
console.log(balance.balances.EUR);
```

Return type:

```typescript
Promise<Balance>
```

Balances are returned in minor units.

## 8. Retrieve Transactions

```typescript
const result = await sdk.getTransactions();

console.log(result.count);
console.log(result.transactions);
```

Return type:

```typescript
Promise<TransactionList>
```

## 9. Exchange Currency

Example: Exchange $100.00 into EUR.

```typescript
const result = await sdk.exchange({
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  amountMinor: 10000,
});

console.log(result.transaction);
console.log(result.received);
console.log(result.balances);
```

Request type:

```typescript
interface ExchangeRequest {
  fromCurrency: Currency;
  toCurrency: Currency;
  amountMinor: number;
}
```

Response type:

```typescript
interface ExchangeResponse {
  transaction: Transaction;
  received: {
    amountMinor: number;
    currency: Currency;
  };
  balances: Record<Currency, number>;
}
```

## 10. Transfer Funds

Example: Transfer $50.00 to a recipient.

```typescript
const result = await sdk.transfer({
  recipient: 'user123',
  currency: 'USD',
  amountMinor: 5000,
});

console.log(result.message);
console.log(result.transaction);
console.log(result.balances);
```

Request type:

```typescript
interface TransferRequest {
  recipient: string;
  currency: Currency;
  amountMinor: number;
}
```

Response type:

```typescript
interface TransferResponse {
  message: string;
  transaction: Transaction;
  balances: Record<Currency, number>;
}
```

## 11. Error Handling

The SDK exposes a custom `SDKError` class.

Example:

```typescript
import { WalletSDK, SDKError } from '@wallet-sdk-lab/sdk';

const sdk = new WalletSDK({
  baseURL: 'http://localhost:3000/api/v1',
});

try {
  await sdk.transfer({
    recipient: 'user123',
    currency: 'USD',
    amountMinor: 999999999,
  });
} catch (error) {
  if (error instanceof SDKError) {
    console.error('SDK Error:', error.message);
    console.error('Status Code:', error.statusCode);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

The SDK converts HTTP and network failures into `SDKError` instances.

Network failures use status code `0`.

## 12. Monetary Amount Conversion

The API expects integer minor units.

Convert user-entered amounts before calling SDK methods:

```typescript
const amount = 100.50;

const amountMinor = Math.round(amount * 100);

console.log(amountMinor); // 10050
```

Convert minor units back for display:

```typescript
const amountMinor = 10050;

const amount = amountMinor / 100;

console.log(amount); // 100.5
```

For displaying currencies, use `Intl.NumberFormat`:

```typescript
const formatted = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amountMinor / 100);
```

## 13. Important Considerations

- Initialize the API before using the SDK.
- Use the correct API base URL.
- Handle asynchronous operations with `async/await`.
- Validate user input before sending requests.
- Convert monetary amounts to minor units.
- Handle `SDKError` exceptions.
- Do not use the current demonstration SDK for real financial transactions.