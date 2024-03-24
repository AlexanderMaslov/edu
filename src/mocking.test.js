import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo } from './mocking';
import { getExchangeRate } from './libs/currency';
import { getShippingQuote } from './libs/shipping';

vi.mock('./libs/currency');
vi.mock('./libs/shipping');

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

describe('getShippingInfo', () => {
  it('should return shipping unavailable if quote cannot be fetched', () => {
    getShippingQuote.mockReturnValue(null);

    expect(getShippingInfo('London')).toMatch(/unavailable/i);
  });

  it('should return shipping info if quote can be fetched', () => {
    getShippingQuote.mockReturnValue({ cost: 10, estimatedDays: 2 });
    const result = getShippingInfo('London');

    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});
