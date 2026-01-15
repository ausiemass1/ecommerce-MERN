import { render, screen } from '@testing-library/react';
import Products from '../Products';

describe('Products Page', () => {
  test('renders products heading', () => {
    render(<Products />);
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
//   test('shows empty state when no products exist', () => {
//     render(<Products />);
//     expect(screen.getByText(/no products/i)).toBeInTheDocument();
//   });
  
});
