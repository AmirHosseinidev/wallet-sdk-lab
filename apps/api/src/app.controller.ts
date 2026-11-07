import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ExchangeDto } from './wallet/dto/exchange.dto';
import { TransferDto } from './wallet/dto/transfer.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('wallet')
  getWallet() {
    return this.appService.getWallet();
  }

  @Get('wallet/balance')
  getBalance() {
    return this.appService.getBalance();
  }

  @Get('transactions')
  getTransactions() {
    return this.appService.getTransactions();
  }

  @Post('exchange')
  exchange(@Body() body: ExchangeDto) {
    return this.appService.exchange(
      body.fromCurrency as 'USD' | 'EUR',
      body.toCurrency as 'USD' | 'EUR',
      body.amountMinor,
    );
  }

  @Post('transfers')
  transfer(@Body() body: TransferDto) {
    return this.appService.transfer(
      body.recipient,
      body.currency as 'USD' | 'EUR',
      body.amountMinor,
    );
  }
}
