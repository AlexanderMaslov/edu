import { queryAllByRole, render, screen } from '@testing-library/react';
import TagList from './TagList';

describe('TagList', () => {
  it('should renders tags', async () => {
    render(<TagList />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
