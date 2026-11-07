
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: {
    getWallet: jest.Mock;
    getBalance: jest.Mock;
    getTransactions: jest.Mock;
    exchange: jest.Mock;
    transfer: jest.Mock;
  };

  beforeEach(async () => {
    appService = {
      getWallet: jest.fn().mockReturnValue({ id: 'wallet_test_001' }),
      getBalance: jest.fn().mockReturnValue({ USD: 250000, EUR: 100000 }),
      getTransactions: jest.fn().mockReturnValue([]),
      exchange: jest.fn().mockReturnValue({ success: true }),
      transfer: jest.fn().mockReturnValue({ success: true }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET endpoints', () => {
    it('should return wallet information', () => {
      expect(appController.getWallet()).toEqual({
        id: 'wallet_test_001',
      });

      expect(appService.getWallet).toHaveBeenCalled();
    });

    it('should return wallet balance', () => {
      expect(appController.getBalance()).toEqual({
        USD: 250000,
        EUR: 100000,
      });

      expect(appService.getBalance).toHaveBeenCalled();
    });

    it('should return transactions', () => {
      expect(appController.getTransactions()).toEqual([]);

      expect(appService.getTransactions).toHaveBeenCalled();
    });
  });

  describe('POST endpoints', () => {
    it('should exchange currencies', () => {
      const body = {
        fromCurrency: 'USD' as const,
        toCurrency: 'EUR' as const,
        amountMinor: 10000,
      };

      expect(appController.exchange(body)).toEqual({
        success: true,
      });

      expect(appService.exchange).toHaveBeenCalledWith(
        'USD',
        'EUR',
        10000,
      );
    });

    it('should transfer money', () => {
      const body = {
        recipient: 'Test User',
        currency: 'USD' as const,
        amountMinor: 5000,
      };

      expect(appController.transfer(body)).toEqual({
        success: true,
      });

      expect(appService.transfer).toHaveBeenCalledWith(
        'Test User',
        'USD',
        5000,
      );
    });
  });
});
