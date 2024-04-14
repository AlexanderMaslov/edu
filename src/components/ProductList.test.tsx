import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import ProductList from './ProductList';
import { server } from '../../mocks/server';
import { http, HttpResponse, delay } from 'msw';
import { db } from '../../mocks/db';

describe('ProductList', () => {
  const productIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    });
  });

  it('should render a list of products', async () => {
    render(<ProductList />);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should rende no products available if no products is found', async () => {
    server.use(
      http.get('/products', () => {
        return HttpResponse.json([]);
      }),
    );
    render(<ProductList />);

    const messagge = await screen.findByText(/no products/i);
    expect(messagge).toBeInTheDocument();
  });

  it('should render an error message when there is an error', async () => {
    server.use(
      http.get('/products', () => {
        return HttpResponse.error();
      }),
    );

    render(<ProductList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render a loading indicator when fetching datata', async () => {
    server.use(
      http.get('/products', async () => {
        await delay(1000);
        return HttpResponse.json([]);
      }),
    );
    render(<ProductList />);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('should remove the loading indicator after data is fetching', async () => {
    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it('should remove the loading indicator if data fetching fails', async () => {
    server.use(
      http.get('/products', () => {
        return HttpResponse.error();
      }),
    );
    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });
});
