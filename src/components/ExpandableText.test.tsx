import { render, screen } from '@testing-library/react';
import ExpandableText from './ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should render the full text if less than 255 characters', () => {
    const text = 'short text';
    render(<ExpandableText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should truncate text if longer than 255 characters', () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/more/i);
  });

  it('should expand text then show more button is clicked', async () => {
    const user = userEvent.setup();
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text then show less button is clicked', async () => {
    const user = userEvent.setup();
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole('button', { name: /more/i });
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
