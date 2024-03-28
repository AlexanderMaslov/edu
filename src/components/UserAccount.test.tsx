import { render, screen } from '@testing-library/react';
import { User } from '../entities';
import UserAccount from './UserAccount';

describe('UserAccount', () => {
  it('should render username', () => {
    const user: User = { id: 1, name: 'john' };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should render edit button if user is admin', () => {
    const user: User = { id: 1, name: 'john', isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should not render edit button if user is not admin', () => {
    const user: User = { id: 1, name: 'john' };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
