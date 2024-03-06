import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

const Com = () => {
  return <h1>hello world</h1>;
};

test('컴포넌트2', () => {
  render(<Com />);
  expect(screen.getByRole('heading', { name: /hello world/, level: 1 })).toBeInTheDocument();
});
