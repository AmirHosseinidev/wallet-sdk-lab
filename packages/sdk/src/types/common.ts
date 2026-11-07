export type Currency = 'USD' | 'EUR';

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}