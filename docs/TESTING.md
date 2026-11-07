# Testing and Build Guide

## 1. Overview

This document describes how to install, test, and build the Wallet SDK Lab workspaces.

The project contains three main workspaces:

- `wallet-api`
- `wallet-demo`
- `@wallet-sdk-lab/sdk`

## 2. Prerequisites

Required tools:

| Tool | Requirement |
|---|---|
| Node.js | 22 or newer |
| npm | 10 or newer |
| Git | Installed |

Verify the installed versions:

```bash
node -v
npm -v
git -v
```

## 3. Install Dependencies

From the repository root:

```bash
npm install
```

## 4. Run the API

Start the NestJS development server:

```bash
npm run start:dev --workspace=wallet-api
```

Expected local address:

```text
http://localhost:3000
```

API base URL:

```text
http://localhost:3000/api/v1
```

## 5. Run the Demo

Open another terminal and run:

```bash
npm run dev --workspace=wallet-demo
```

Open:

```text
http://localhost:5173
```

The API must be running for the Demo to retrieve wallet data and perform operations.

## 6. SDK Unit Tests

The SDK uses Vitest.

Run the SDK tests:

```bash
npm test --workspace=@wallet-sdk-lab/sdk
```

Run tests in watch mode:

```bash
npm run test:watch --workspace=@wallet-sdk-lab/sdk
```

### Covered SDK Test Cases

The current SDK test suite includes:

| Test | Description |
|---|---|
| Get Wallet | Verifies wallet retrieval |
| Get Balance | Verifies balance retrieval |
| Get Transactions | Verifies transaction retrieval |
| API Error Handling | Verifies handling of API errors |

The verified test run completed with:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
```

## 7. Manual Integration Testing

The SDK was also manually tested against the running Wallet API.

Verified scenarios:

### Wallet Retrieval

- Retrieve wallet information.
- Retrieve USD and EUR balances.
- Retrieve transaction history.

### Exchange

Test request:

```typescript
await sdk.exchange({
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  amountMinor: 10000,
});
```

Expected behavior:

- USD balance decreases by 10000 minor units.
- EUR balance increases by 9200 minor units.
- An exchange transaction is created.

### Transfer

Test request:

```typescript
await sdk.transfer({
  recipient: 'user123',
  currency: 'USD',
  amountMinor: 5000,
});
```

Expected behavior:

- USD balance decreases by 5000 minor units.
- A transfer transaction is created.
- Updated balances are returned.

### Insufficient Balance

Test request:

```typescript
await sdk.transfer({
  recipient: 'user123',
  currency: 'USD',
  amountMinor: 999999999,
});
```

Expected behavior:

- The API rejects the request.
- The SDK throws an `SDKError`.
- The error status code is `400`.

## 8. Build the SDK

```bash
npm run build --workspace=@wallet-sdk-lab/sdk
```

The SDK build uses tsup.

Expected output directory:

```text
packages/sdk/dist/
```

## 9. Build the Demo

```bash
npm run build --workspace=wallet-demo
```

The Demo build uses Vite.

Expected output directory:

```text
apps/demo/dist/
```

Verified production build:

```text
vite build
✓ built successfully
```

## 10. Build the API

```bash
npm run build --workspace=wallet-api
```

## 11. Build All Workspaces

From the repository root:

```bash
npm run build
```

## 12. Run All Available Workspace Tests

```bash
npm test
```

The root test script runs available workspace test scripts.

## 13. Resetting Test Data

The wallet currently uses in-memory storage.

To reset the initial wallet balances and transaction history:

1. Stop the API server.
2. Restart the API server.
3. Reload the Demo.

The initial wallet state will be restored.

## 14. Testing Limitations

The current test coverage is not a complete production test suite.

Additional testing is recommended for:

- API controller and service unit tests.
- API integration tests.
- Validation edge cases.
- Exchange rounding boundaries.
- Concurrent wallet operations.
- Browser compatibility.
- End-to-end workflows.
- Security testing.

Only the test cases and build results explicitly listed as verified above should be considered confirmed results.