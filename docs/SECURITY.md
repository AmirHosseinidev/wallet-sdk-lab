# Security Documentation

## 1. Security Overview

Wallet SDK Lab is an educational and demonstration project.

It demonstrates wallet-related API operations but does not implement the security controls required for a real financial application.

**This project must not be used to store, transfer, or process real money.**

## 2. Current Security Implementation

The current backend includes basic request validation through NestJS.

Configured validation options:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

These settings provide:

- Rejection of unexpected request properties.
- Validation of incoming DTOs.
- Transformation of incoming payloads.

The SDK also provides centralized HTTP error handling.

## 3. Current Security Limitations

The following security features are not currently implemented.

| Feature | Current Status |
|---|---|
| Authentication | Not implemented |
| Authorization | Not implemented |
| Database security | No database configured |
| Multi-user isolation | Not implemented |
| Rate limiting | Not implemented |
| Request idempotency | Not implemented |
| Audit logging | Not implemented |
| Production TLS configuration | Not configured |
| Production deployment security | Not implemented |

## 4. Wallet Data and Persistence

Wallet data is stored in memory.

Consequences:

- Data is lost when the API restarts.
- There is no persistent transaction history.
- There is no database-level access control.
- The current wallet is a shared demonstration state.

This implementation must not be considered suitable for real customer accounts.

## 5. CORS Configuration

The development API allows requests from:

```text
http://localhost:5173
```

This origin is intended for local development.

For deployment, CORS should be restricted to explicitly trusted frontend origins.

CORS is not an authentication or authorization mechanism.

## 6. Monetary Operations

The API uses integer minor units for monetary values.

This reduces common floating-point precision problems but does not, by itself, provide financial-grade transaction safety.

Additional protections would be required, including:

- Atomic balance updates.
- Database transactions.
- Concurrency control.
- Idempotency keys.
- Transaction integrity checks.
- Proper financial audit records.

## 7. API Error Handling

The API validates incoming requests and rejects invalid payloads.

Insufficient balance is rejected with an HTTP 400 response.

The SDK converts API and network failures into custom SDK errors.

Error handling should not expose internal stack traces, secrets, or sensitive application information in production.

## 8. Environment Variables and Secrets

Never commit the following information to a public repository:

- API secrets.
- Database credentials.
- Access tokens.
- Private keys.
- Production credentials.
- Personal or financial information.

Use environment variables and a secure secrets-management solution when introducing sensitive configuration.

## 9. Recommendations Before Production

Before adapting this project for a real financial application, implement and review:

1. Secure user authentication.
2. Role-based or resource-based authorization.
3. Persistent database storage.
4. Per-user wallet isolation.
5. Atomic financial transactions.
6. Idempotent transaction processing.
7. Rate limiting and abuse prevention.
8. Secure transport using HTTPS.
9. Comprehensive audit logging.
10. Security testing and code review.
11. Monitoring and alerting.
12. Backup and recovery procedures.

These are architectural recommendations, not features currently provided by this project.

## 10. Responsible Use

Wallet SDK Lab is intended for:

- Learning.
- SDK development.
- API integration demonstrations.
- Frontend and backend experimentation.
- Software architecture practice.

It is not intended for:

- Real payments.
- Banking services.
- Cryptocurrency custody.
- Production financial operations.
- Handling real customer financial data.

## 11. Security Reporting

If a security issue is identified, document the affected component, reproduction steps, and potential impact.

Do not include real credentials, private information, or financial data in issue reports.