/* eslint-disable jest-dom/prefer-required */
/* eslint-disable jest-dom/prefer-checked */
import { Primitive } from '@dtwo/primitive';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

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

  describe('WAI-ARIA test', () => {
    it('aria-clicked', () => {
      render(<Switch.Root />);
      const SwitchRoot = screen.getByRole('switch');

      act(() => SwitchRoot.click());
      expect(SwitchRoot).toHaveAttribute('aria-checked', 'true');

      act(() => SwitchRoot.click());
      expect(SwitchRoot).toHaveAttribute('aria-checked', 'false');
    });

    it('aria-required', () => {
      render(<Switch.Root required />);
      const SwitchRoot = screen.getByRole('switch');

      expect(SwitchRoot).toHaveAttribute('aria-required', 'true');
    });

    it('fakeInput is hidden', async () => {
      const SwitchComponent = () => {
        const [checked, setChecked] = useState(false);
        return <Switch.Root checked={checked} onChangeSwitch={() => setChecked(prev => !prev)} />;
      };

      render(
        <form>
          <SwitchComponent />
        </form>,
      );

      const SwitchRoot = screen.getByRole('switch');
      const FakeInput = await screen.findByRole('checkbox', { hidden: true });

      expect(FakeInput).toBeInTheDocument();
      expect(FakeInput).not.toBeVisible();

      act(() => SwitchRoot.click());

      expect(FakeInput).toBeInTheDocument();
      expect(FakeInput).not.toBeVisible();
    });
  });
});
