import { render, screen } from '@testing-library/react';
import Products from '../Products';

describe('Products Page', () => {
  test('renders products heading', () => {
    render(<Products />);
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
});
