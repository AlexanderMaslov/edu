import { vi, it, expect, describe } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
} from './mocking';
import { getExchangeRate } from './libs/currency';
import { getShippingQuote } from './libs/shipping';
import { trackPageView } from './libs/analytics';
import { charge } from './libs/payment';

vi.mock('./libs/currency');
vi.mock('./libs/shipping');
vi.mock('./libs/analytics');
vi.mock('./libs/payment');

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

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();
    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: '1234' };

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: true });
  });

  it('should return success when payment is failed', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);
    expect(result).toMatchObject({ success: false });
  });
});
