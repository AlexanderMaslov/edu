import { render, screen } from '@testing-library/react';
import OrderStatusSelector from './OrderStatusSelector';
import { Theme } from '@radix-ui/themes';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector', () => {
  it('should render New as default value', () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    expect(screen.getByRole('combobox')).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    const user = userEvent.setup();
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole('combobox');
    await user.click(button);

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });

  it.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])(
    'should call onChange with $value when the $label option is selected',
    async ({ label, value }) => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Theme>
          <OrderStatusSelector onChange={onChange} />
        </Theme>
      );

      const button = screen.getByRole('combobox');
      await user.click(button);

      const option = await screen.findByRole('option', { name: label });
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("'should call onChange with 'new' when the New option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    const button = screen.getByRole('combobox');
    await user.click(button);
    await user.click(await screen.findByRole('option', { name: /processed/i }));
    await user.click(button);
    await user.click(await screen.findByRole('option', { name: /new/i }));

    expect(onChange).toHaveBeenCalledWith('new');
  });
});
