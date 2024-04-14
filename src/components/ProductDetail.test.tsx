import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import ProductDetail from './ProductDetail';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { db } from '../../mocks/db';

describe('ProductDetail', () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });

  it('should render product details', async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });

    render(<ProductDetail productId={productId} />);

    expect(
      await screen.findByText(new RegExp(product!.name)),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString())),
    ).toBeInTheDocument();
  });

  it('should render massage if product not found', async () => {
    server.use(http.get('/products/1', () => HttpResponse.json(null)));
    render(<ProductDetail productId={1} />);
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('should render an error for invalid productId', async () => {
    render(<ProductDetail productId={0} />);
    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });

  it('should render an error if data fetching fails', async () => {
    server.use(http.get('/products/1', () => HttpResponse.error()));
    render(<ProductDetail productId={1} />);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should remove the loading indicator after data is fetching', async () => {
    render(<ProductDetail productId={productId} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it('should remove the loading indicator if data fetching fails', async () => {
    server.use(
      http.get('/products/1', () => {
        return HttpResponse.error();
      }),
    );
    render(<ProductDetail productId={1} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  afterAll(async () => {
    db.product.delete({ where: { id: { equals: productId } } });
  });
});
