import { Switch } from './switch';

import { act, render, screen } from '@testing-library/react';

import { Primitive } from '@dtwo/primitive';

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

  it('Switch can have child element', () => {
    const htmlElementsTag = ['input', 'h2', 'span'] as const;
    const randomIndex = Math.floor(Math.random() * htmlElementsTag.length);
    const RandomChildTag = Primitive[htmlElementsTag[randomIndex]];
    render(
      <Switch.Root>
        <RandomChildTag />
      </Switch.Root>,
    );

    const SwitchRoot = screen.getByRole('switch');
    expect(SwitchRoot.hasChildNodes()).toBe(true);
  });

  describe('Form submission', () => {
    it('should not submit when Switch is required but unchecked', () => {
      const mockSubmitEventHandler = vi.fn(() => {});

      render(
        <form onSubmit={mockSubmitEventHandler}>
          <Switch.Root required checked={false} />
          <button type="submit" />
        </form>,
      );

      const switchRoot = screen.getByRole('button');
      act(() => switchRoot.click());

      expect(mockSubmitEventHandler).not.toHaveBeenCalled();
    });

    /**
     * TODO: 테스트 submit 이벤트 발생안되는 버그 발생 고쳐야함
     * */
    it('should submit when Switch is required and checked', () => {
      const mockSubmitEventHandler = vi.fn(() => {
        console.log('서브밋');
      });

      render(
        <form onSubmit={mockSubmitEventHandler}>
          <Switch.Root required checked />
          <button type="submit">submit Button</button>
        </form>,
      );

      const switchRoot = screen.getByRole('button', { name: 'submit Button' });

      act(() => switchRoot.click());
      expect(mockSubmitEventHandler).toHaveBeenCalled();
    });
  });
});
