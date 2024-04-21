import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import { server } from '~/mocks/server';
import { delay, http, HttpResponse } from 'msw';
import BrowseProductsPage from './BrowseProductsPage';

describe('BrowseProductsPage', () => {
  it('should show a loading skeleton when fetching categories', () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<BrowseProductsPage />);

    expect(
      screen.getByRole('progressbar', { name: /categories/i })
    ).toBeInTheDocument();
  });

  it('should hide the loading skeleton after categories are fetched', async () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('progressbar', { name: /categories/i })
    );
  });

  it('should show a loading skeleton when fetching products', () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<BrowseProductsPage />);

    expect(
      screen.getByRole('progressbar', { name: /products/i })
    ).toBeInTheDocument();
  });

  it('should hide the loading skeleton after products are fetched', async () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('progressbar', { name: /products/i })
    );
  });

  it('should not render an error if categories cannot be fetched', async () => {
    server.use(http.get('/categories', () => HttpResponse.error()));
    render(<BrowseProductsPage />);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /categories/i })
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('combobox', { name: /category/i })
    ).not.toBeInTheDocument();
  });

  it('should render an error if product cannot be fetched', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    render(<BrowseProductsPage />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
