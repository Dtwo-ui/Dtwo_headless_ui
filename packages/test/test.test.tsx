import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

const Com = () => {
  return <h1>hello world2</h1>;
};

test('컴포넌트 테스트 1', () => {
  render(<Com />);
  expect(screen.getByRole('heading', { name: /hello world/, level: 1 })).toBeInTheDocument();
});
