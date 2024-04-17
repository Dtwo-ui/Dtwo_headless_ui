import { Switch } from './switch';

import { act, render, screen } from '@testing-library/react';

// TODO: act를 userEvent로 변경

describe('Switch', () => {
  it('renders the Switch component', () => {
    render(<Switch.Root aria-label="dtwo switch" />);

    expect(screen.getByLabelText('dtwo switch'));
  });

  it('check and uncheck', () => {
    render(<Switch.Root />);
    const SwitchRoot = screen.getByRole('switch');

    act(() => SwitchRoot.click());
    expect(SwitchRoot).toBeChecked();

    act(() => SwitchRoot.click());
    expect(SwitchRoot).not.toBeChecked();
  });

  it('is disabled', () => {
    render(<Switch.Root disabled />);
    const SwitchRoot = screen.getByRole('switch');

    expect(SwitchRoot).toBeDisabled();
  });

  it('disabled는 클릭이벤트가 발생하지 않는다.', () => {
    const mockClickHandler = vi.fn();

    render(<Switch.Root disabled onClick={mockClickHandler} />);
    const SwitchRoot = screen.getByRole('switch');

    act(() => SwitchRoot.click());
    expect(SwitchRoot).not.toBeChecked();

    expect(mockClickHandler).not.toHaveBeenCalled();
  });
});
