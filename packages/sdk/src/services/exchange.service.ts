import type { HttpClient } from '../http-client';
import type {
  ExchangeRequest,
  ExchangeResponse,
} from '../types/transaction';

export class ExchangeService {
  constructor(private readonly http: HttpClient) {}

  exchange(data: ExchangeRequest): Promise<ExchangeResponse> {
    return this.http.post<ExchangeResponse>('exchange', data);
  }
}