import type { HttpClient } from '../http-client';
import type {
  TransferRequest,
  TransferResponse,
} from '../types/transaction';

export class TransferService {
  constructor(private readonly http: HttpClient) {}

  transfer(data: TransferRequest): Promise<TransferResponse> {
    return this.http.post<TransferResponse>('transfers', data);
  }
}