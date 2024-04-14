import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
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

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });
});
