import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import type { User } from '../entities';

describe('UserList', () => {
  it('should render no users when the users array is empty', () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    const users: User[] = [
      { id: 1, name: 'john' },
      { id: 2, name: 'steve' },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });
});
