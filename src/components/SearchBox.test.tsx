import { queryByPlaceholderText, render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
  it('should render an input field for searching', () => {
    render(<SearchBox onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toBeInTheDocument();
  });

  it('should call onChange when Enter is pressed', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={onChange} />);

    const searchTerm = 'searchTerm';
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, searchTerm + '{enter}');

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should not call onChange if input field is empty', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={onChange} />);

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, '{enter}');

    expect(onChange).not.toHaveBeenCalled();
  });
});
