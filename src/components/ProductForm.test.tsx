import { render, screen, waitForElementToBeRemoved } from '@/tests/utils';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
  it('should render form fields', async () => {
    render(<ProductForm onSubmit={vi.fn()} />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /category/i }),
    ).toBeInTheDocument();
  });
});
