export class SDKError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly response?: unknown,
  ) {
    super(message);

    this.name = 'SDKError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}