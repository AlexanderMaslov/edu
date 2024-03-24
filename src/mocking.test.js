import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency } from './mocking';
import { getExchangeRate } from './libs/currency';

vi.mock('./libs/currency');

describe('test suite', () => {
  it('test case', () => {
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    const result = sendText('message');

    expect(sendText).toHaveBeenCalled();
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    getExchangeRate.mockReturnValue(1.5);

    expect(getPriceInCurrency(10, 'AUD')).toBe(15);
  });
});
