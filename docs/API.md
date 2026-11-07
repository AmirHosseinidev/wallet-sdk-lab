# Wallet API Documentation

## 1. Overview

The Wallet API is a RESTful backend built with NestJS.

It provides endpoints for wallet information, balances, transaction history, currency exchange, and demonstration transfers.

## 2. Base URL

Local development:

```text
http://localhost:3000/api/v1
```

All endpoints use the `/api/v1` prefix.

## 3. Supported Currencies

Currently supported:

- `USD`
- `EUR`

All monetary values are represented as integer minor units.

Examples:

```text
10000 = $100.00
5000  = $50.00
```

## 4. Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/wallet` | Retrieve wallet information |
| GET | `/wallet/balance` | Retrieve wallet balances |
| GET | `/transactions` | Retrieve transaction history |
| POST | `/exchange` | Exchange currencies |
| POST | `/transfers` | Perform a demonstration transfer |

---

## 5. Get Wallet

Retrieve the current wallet information.

**Request**

```http
GET /api/v1/wallet
```

**Example Response**

```json
{
  "id": "wallet_test_001",
  "owner": "Test User",
  "status": "active",
  "createdAt": "2026-11-07T00:00:00.000Z"
}
```

**Response Fields**

| Field | Type | Description |
|---|---|---|
| id | string | Wallet identifier |
| owner | string | Wallet owner |
| status | string | Wallet status |
| createdAt | string | Wallet creation timestamp |

---

## 6. Get Wallet Balance

Retrieve the current wallet balances.

**Request**

```http
GET /api/v1/wallet/balance
```

**Example Response**

```json
{
  "walletId": "wallet_test_001",
  "balances": {
    "USD": 250000,
    "EUR": 100000
  }
}
```

**Response Fields**

| Field | Type | Description |
|---|---|---|
| walletId | string | Associated wallet identifier |
| balances | object | Currency balances in minor units |

---

## 7. Get Transactions

Retrieve the transaction history.

**Request**

```http
GET /api/v1/transactions
```

**Example Response**

```json
{
  "count": 0,
  "transactions": []
}
```

Each transaction contains the following fields:

| Field | Type | Description |
|---|---|---|
| id | string | Transaction identifier |
| type | string | `exchange` or `transfer` |
| amountMinor | number | Transaction amount in minor units |
| currency | string | Transaction currency |
| description | string | Transaction description |
| status | string | Transaction status |
| createdAt | string | Transaction timestamp |

The current transaction status type is `completed`.

---

## 8. Exchange Currency

Exchange an amount between USD and EUR.

**Request**

```http
POST /api/v1/exchange
Content-Type: application/json
```

**Request Body**

```json
{
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "amountMinor": 10000
}
```

**Request Fields**

| Field | Type | Validation |
|---|---|---|
| fromCurrency | Currency | USD or EUR |
| toCurrency | Currency | USD or EUR |
| amountMinor | number | Integer greater than or equal to 1 |

**Example Response Structure**

```json
{
  "transaction": {
    "id": "txn_...",
    "type": "exchange",
    "amountMinor": 10000,
    "currency": "USD",
    "description": "...",
    "status": "completed",
    "createdAt": "..."
  },
  "received": {
    "amountMinor": 9200,
    "currency": "EUR"
  },
  "balances": {
    "USD": 240000,
    "EUR": 109200
  }
}
```

### Exchange Rate

The current demonstration exchange rate is:

```text
1 USD = 0.92 EUR
```

The reverse conversion uses the inverse rate.

The received amount is calculated using integer rounding.

**Important:** These rates are fixed demonstration values, not live market exchange rates.

---

## 9. Transfer Funds

Perform a demonstration transfer from the current wallet.

**Request**

```http
POST /api/v1/transfers
Content-Type: application/json
```

**Request Body**

```json
{
  "recipient": "user123",
  "currency": "USD",
  "amountMinor": 5000
}
```

**Request Fields**

| Field | Type | Validation |
|---|---|---|
| recipient | string | Between 3 and 50 characters |
| currency | Currency | USD or EUR |
| amountMinor | number | Integer greater than or equal to 1 |

**Example Response Structure**

```json
{
  "message": "...",
  "transaction": {
    "id": "txn_...",
    "type": "transfer",
    "amountMinor": 5000,
    "currency": "USD",
    "description": "...",
    "status": "completed",
    "createdAt": "..."
  },
  "balances": {
    "USD": 235000,
    "EUR": 109200
  }
}
```

---

## 10. Validation and Error Handling

The API uses NestJS `ValidationPipe` with:

- `whitelist: true`
- `forbidNonWhitelisted: true`
- `transform: true`

Invalid request payloads are rejected.

### Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request completed successfully |
| 201 | Resource/action created successfully, depending on the endpoint |
| 400 | Invalid request or insufficient balance |
| 404 | Requested resource or route not found |
| 500 | Internal server error |

### Insufficient Balance

When a transfer or exchange cannot be completed because of insufficient funds, the API returns:

```http
400 Bad Request
```

Example error message:

```json
{
  "message": "Insufficient balance."
}
```

Validation errors may return a message or an array of messages.

---

## 11. Initial Wallet State

The current demonstration wallet starts with:

| Property | Value |
|---|---|
| Wallet ID | `wallet_test_001` |
| Owner | `Test User` |
| Status | `active` |
| USD Balance | 250000 minor units |
| EUR Balance | 100000 minor units |

Wallet state is stored in memory and resets when the API restarts.

## 12. Important Notes

- This API is for demonstration purposes only.
- No real money is transferred.
- No external payment provider is connected.
- Exchange rates are fixed demonstration values.
- Wallet state is not persisted.
- Authentication and authorization are not implemented.