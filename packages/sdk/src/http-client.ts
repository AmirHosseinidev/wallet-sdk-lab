import { SDKError } from './errors/sdk-error';

interface HttpClientOptions {
  baseURL: string;
}

export class HttpClient {
  private readonly baseURL: string;

  constructor(options: HttpClientOptions) {
    this.baseURL = options.baseURL.replace(/\/+$/, '');
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}/${endpoint.replace(/^\/+/, '')}`;

    let response: Response;

    try {
      response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
    } catch {
      throw new SDKError(
        'Unable to connect to the Wallet API.',
        0,
      );
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const errorData = data as {
        message?: string | string[];
      } | null;

      const message = errorData?.message;

      throw new SDKError(
        Array.isArray(message)
          ? message.join(', ')
          : message ?? 'An unexpected API error occurred.',
        response.status,
        data,
      );
    }

    return data as T;
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}