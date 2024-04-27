import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import { server } from '~/mocks/server';
import { delay, http, HttpResponse } from 'msw';
import BrowseProductsPage from './BrowseProductsPage';
import userEvent from '@testing-library/user-event';
import { db } from '~/mocks/db';
import type { Category, Product } from '../entities';

describe('BrowseProductsPage', () => {
  const categories: Category[] = [];
  const products: Product[] = [];

  beforeAll(async () => {
    [1, 2].forEach((item) => {
      categories.push(db.category.create({ name: 'category ' + item }));
      products.push(db.product.create());
    });
  });

  afterAll(async () => {
    const categoryIds = categories.map((c) => c.id);
    db.category.deleteMany({ where: { id: { in: categoryIds } } });

    const productIds = products.map((c) => c.id);
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  it('should show a loading skeleton when fetching categories', () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      }),
    );

    render(<BrowseProductsPage />);

    expect(
      screen.getByRole('progressbar', { name: /categories/i }),
    ).toBeInTheDocument();
  });

  it('should hide the loading skeleton after categories are fetched', async () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      }),
    );

    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('progressbar', { name: /categories/i }),
    );
  });

  it('should show a loading skeleton when fetching products', () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      }),
    );

    render(<BrowseProductsPage />);

    expect(
      screen.getByRole('progressbar', { name: /products/i }),
    ).toBeInTheDocument();
  });

  it('should hide the loading skeleton after products are fetched', async () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      }),
    );

    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('progressbar', { name: /products/i }),
    );
  });

  it('should not render an error if categories cannot be fetched', async () => {
    server.use(http.get('/categories', () => HttpResponse.error()));
    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /categories/i }),
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('combobox', { name: /category/i }),
    ).not.toBeInTheDocument();
  });

  it('should render an error if product cannot be fetched', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    render(<BrowseProductsPage />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render categories', async () => {
    const user = await userEvent.setup();
    render(<BrowseProductsPage />);

    const combobox = await screen.findByRole('combobox');
    expect(combobox).toBeInTheDocument();

    await user.click(combobox);

    expect(screen.getByRole('option', { name: /all/i })).toBeInTheDocument();
    categories.map((category) => {
      expect(
        screen.getByRole('option', { name: category.name }),
      ).toBeInTheDocument();
    });
  });

  it('should render products', async () => {
    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /products/i }),
    );

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
