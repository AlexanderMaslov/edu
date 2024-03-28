import { render, screen } from '@testing-library/react';
import Greet from './Greet';

describe('Greet', () => {
  it('should render hello with the name when name is provided', () => {
    render(<Greet name="john" />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/john/i);
  });

  it('should render login button when name is not provided', () => {
    render(<Greet />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});