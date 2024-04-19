import { Switch } from './switch';

import { act, render, screen } from '@testing-library/react';

// TODO: act를 userEvent로 변경

describe('Switch basic capabilities', () => {
  it('renders the Switch component', () => {
    render(<Switch.Root aria-label="dtwo switch" />);
    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeInTheDocument();
  });

  it('switch change checked when clicked', () => {
    render(<Switch.Root />);
    const SwitchRoot = screen.getByRole('switch');

    act(() => SwitchRoot.click());
    expect(SwitchRoot).toBeChecked();

    act(() => SwitchRoot.click());
    expect(SwitchRoot).not.toBeChecked();
  });

  it('switch can be disabled', () => {
    render(<Switch.Root disabled />);
    const SwitchRoot = screen.getByRole('switch');

    expect(SwitchRoot).toBeDisabled();
  });

  it("when switch disabled, it can't be click", () => {
    const mockClickHandler = vi.fn();

    render(<Switch.Root disabled onClick={mockClickHandler} />);
    const SwitchRoot = screen.getByRole('switch');

    act(() => SwitchRoot.click());
    expect(SwitchRoot).not.toBeChecked();

    expect(mockClickHandler).not.toHaveBeenCalled();
  });
});
