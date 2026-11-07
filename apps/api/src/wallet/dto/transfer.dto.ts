import { IsIn, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class TransferDto {
  @IsString()
  @Length(3, 50)
  recipient!: string;

  @IsIn(['USD', 'EUR'])
  currency!: string;

  @IsInt()
  @Min(1)
  @Max(1_000_000_000)
  amountMinor!: number;
}
