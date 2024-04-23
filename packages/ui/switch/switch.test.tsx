import { Primitive } from '@dtwo/primitive';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe } from 'vitest';

import { Switch } from './switch';

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
    it('should not submit when Switch is required but unchecked', async () => {
      const mockSubmitEventHandler = vi.fn(() => {});
      const user = userEvent.setup();

      render(
        <form onSubmit={mockSubmitEventHandler}>
          <Switch.Root required checked={false} />
          <button type="submit" aria-label="submitButton" />
        </form>,
      );

      const submitButton = screen.getByRole('button', { name: 'submitButton' });
      await user.click(submitButton);
      expect(mockSubmitEventHandler).not.toHaveBeenCalled();
    });

    /**
     * TODO: 테스트 submit 이벤트 발생안되는 버그 발생 고쳐야함
     * */
    it('should submit when Switch is required and checked', async () => {
      const mockSubmitEventHandler = vi.fn(() => {});
      const user = userEvent.setup();

      render(
        <form onSubmit={mockSubmitEventHandler}>
          <Switch.Root required checked />
          <button type="submit">submit Button</button>
        </form>,
      );

      const switchButton = screen.getByRole('switch');
      await user.click(switchButton);

      const submitButton = screen.getByRole('button', { name: 'submit Button' });
      await user.click(submitButton);

      expect(mockSubmitEventHandler).toHaveBeenCalled();
    });
  });
});

describe('스위치 키보드 액션', () => {
  beforeEach(async () => {
    const user = userEvent.setup();
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    render(<Switch.Root />);
    await user.tab();
  });
  it('tab 키 입력시 switch에 hover된다.', async () => {
    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toHaveFocus();
  });

  it('spacebar keydown 발생시 스위치의 check 상태가 변화한다.', async () => {
    const user = userEvent.setup();

    await user.keyboard('space');

    screen.debug();

    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeChecked();
  });

  it('enter keydown 발생시 스위치의 check 상태가 변화한다.', async () => {
    const user = userEvent.setup();

    await user.keyboard('enter');

    screen.debug();

    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeChecked();
  });
});
