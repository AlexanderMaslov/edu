import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import ProductForm from './ProductForm';
import { Category, Product } from '../entities';
import { db } from '~/mocks/db';

describe('ProductForm', () => {
  let category: Category;

  beforeAll(async () => {
    category = db.category.create();
  });

  afterAll(async () => {
    db.category.delete({ where: { id: { equals: category.id } } });
  });

  it('should render form fields', async () => {
    render(<ProductForm onSubmit={vi.fn()} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /category/i }),
    ).toBeInTheDocument();
  });

  it('should populate form fields when editing a product', async () => {
    const product: Product = {
      id: 1,
      name: 'Bread',
      price: 10,
      categoryId: category.id,
    };

    render(<ProductForm product={product} onSubmit={vi.fn()} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByPlaceholderText(/name/i)).toHaveValue(product.name);
    expect(screen.getByPlaceholderText(/price/i)).toHaveValue(
      product.price.toString(),
    );
    expect(
      screen.getByRole('combobox', { name: /category/i }),
    ).toHaveTextContent(category.name);
  });
});
