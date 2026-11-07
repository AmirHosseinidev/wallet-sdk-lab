import { IsIn, IsInt, Max, Min } from 'class-validator';

export class ExchangeDto {
  @IsIn(['USD', 'EUR'])
  fromCurrency!: string;

  @IsIn(['USD', 'EUR'])
  toCurrency!: string;

  @IsInt()
  @Min(1)
  @Max(1_000_000_000)
  amountMinor!: number;
}
