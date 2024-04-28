import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import ProductForm from './ProductForm';
import { Category, Product } from '../entities';
import { db } from '~/mocks/db';
import userEvent from '@testing-library/user-event';

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

  it('should put focus on the name field', async () => {
    render(<ProductForm onSubmit={vi.fn()} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    expect(nameInput).toHaveFocus();
  });

  it('should display an error if name is missing', async () => {
    const user = await userEvent.setup();
    render(<ProductForm onSubmit={vi.fn()} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    const error = screen.getByRole('alert');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/required/i);
  });
});
