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

  it.each([
    { scenario: 'missing', errorMessage: /required/i },
    {
      scenario: 'longer than 255 characters',
      name: 'a'.repeat(256),
      errorMessage: /255/,
    },
  ])(
    'should display an error if name is $scenario',
    async ({ name, errorMessage }) => {
      const user = await userEvent.setup();
      render(<ProductForm onSubmit={vi.fn()} />);
      await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

      const nameInput = screen.getByPlaceholderText(/name/i);
      if (name !== undefined) {
        await user.type(nameInput, name);
      }

      const priceInput = screen.getByPlaceholderText(/price/i);
      await user.type(priceInput, '10');

      const categoryInput = screen.getByRole('combobox', { name: /category/i });
      await user.tab();
      await user.click(categoryInput);
      const options = screen.getAllByRole('option');
      await user.click(options[0]);

      const submitButton = screen.getByRole('button');
      await user.click(submitButton);

      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    },
  );

  it.each([
    { scenario: 'missing', errorMessage: /required/i },
    {
      scenario: '0',
      price: 0,
      errorMessage: /1/,
    },
    {
      scenario: 'negative',
      price: -1,
      errorMessage: /1/,
    },
    {
      scenario: 'greater than 1000',
      price: 1001,
      errorMessage: /1000/,
    },
  ])(
    'should display an error if price is $scenario',
    async ({ price, errorMessage }) => {
      const user = await userEvent.setup();
      render(<ProductForm onSubmit={vi.fn()} />);
      await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

      const nameInput = screen.getByPlaceholderText(/name/i);
      await user.type(nameInput, 'a');

      if (price !== undefined) {
        const priceInput = screen.getByPlaceholderText(/price/i);
        await user.type(priceInput, price.toString());
      }

      const categoryInput = screen.getByRole('combobox', { name: /category/i });
      await user.tab();
      await user.click(categoryInput);
      const options = screen.getAllByRole('option');
      await user.click(options[0]);

      const submitButton = screen.getByRole('button');
      await user.click(submitButton);

      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    },
  );

  it('should call onSubmit with the correct data', async () => {
    const user = await userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    await user.type(nameInput, 'name');

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.tab();
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenNthCalledWith(1, {
      name: 'name',
      price: 10,
      categoryId: category.id,
    });
  });

  it('should display a toast if submission fails', async () => {
    const user = await userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    await user.type(nameInput, 'name');

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.tab();
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    onSubmit.mockRejectedValue({});
    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    const toast = await screen.findByRole('status');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent(/error/i);
  });

  it('should disable the submit button upon submisson', async () => {
    const user = await userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    await user.type(nameInput, 'name');

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.tab();
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    onSubmit.mockReturnValue(new Promise(() => {}));
    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it('should re-eanble the submit button after submisson', async () => {
    const user = await userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    await user.type(nameInput, 'name');

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.tab();
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    onSubmit.mockResolvedValue({});
    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(submitButton).not.toBeDisabled();
  });

  it('should re-eanble the submit button after submisson', async () => {
    const user = await userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    await user.type(nameInput, 'name');

    const priceInput = screen.getByPlaceholderText(/price/i);
    await user.type(priceInput, '10');

    const categoryInput = screen.getByRole('combobox', { name: /category/i });
    await user.tab();
    await user.click(categoryInput);
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    onSubmit.mockRejectedValue('error');
    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(submitButton).not.toBeDisabled();
  });
});
