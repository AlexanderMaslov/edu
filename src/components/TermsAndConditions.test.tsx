import { render, screen } from '@testing-library/react';
import TermsAndConditions from './TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('TermsAndConditions', () => {
  it('should render with correct text and initial state', () => {
    render(<TermsAndConditions />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Terms & Conditions');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();
  });

  it('should enable the button when the checkbox is checked', async () => {
    const user = userEvent.setup();
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(screen.getByRole('button')).toBeEnabled();
  });
});
