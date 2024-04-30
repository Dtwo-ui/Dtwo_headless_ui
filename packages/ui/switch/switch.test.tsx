/* eslint-disable jest-dom/prefer-required */
/* eslint-disable jest-dom/prefer-checked */

import { Primitive } from '@d_two/primitive';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CSSProperties, useState } from 'react';
import { describe } from 'vitest';

import { Switch } from './switch';
import { testSwitchStyle, testSwitchStyleObj } from './switchStyle.css';

describe('Switch basic capabilities', () => {
  it('renders the Switch component', () => {
    render(<Switch.Root aria-label="dtwo switch" />);
    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeInTheDocument();
  });

  it('switch change checked when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch.Root />);
    const SwitchRoot = screen.getByRole('switch');

    await user.click(SwitchRoot);
    expect(SwitchRoot).toBeChecked();

    await user.click(SwitchRoot);
    expect(SwitchRoot).not.toBeChecked();
  });

  it('switch can be disabled', async () => {
    render(<Switch.Root disabled />);
    const SwitchRoot = screen.getByRole('switch');

    expect(SwitchRoot).toBeDisabled();
  });

  it("when switch disabled, it can't be click", async () => {
    const user = userEvent.setup();

    const mockClickHandler = vi.fn();

    render(<Switch.Root disabled onClick={mockClickHandler} />);
    const SwitchRoot = screen.getByRole('switch');

    await user.click(SwitchRoot);
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

    it('should submit when Switch is required and checked', async () => {
      const mockSubmitEventHandler = vi.fn(event => {
        event.preventDefault();
      });
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

    await user.keyboard('[space]');

    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeChecked();
  });

  it('enter keydown 발생시 스위치의 check 상태가 변화한다.', async () => {
    const user = userEvent.setup();

    await user.keyboard('[enter]');

    const switchRoot = screen.getByRole('switch');

    expect(switchRoot).toBeChecked();
  });
});

describe('controlled/Uncontrolled 상태제어', () => {
  it('unControlled 컴포넌트 상태 제어', async () => {
    const user = userEvent.setup();
    render(<Switch.Root />);
    const SwitchRoot = screen.getByRole('switch');

    await user.click(SwitchRoot);
    expect(SwitchRoot).toBeChecked();
    expect(SwitchRoot).toHaveAttribute('data-state', 'true');

    await user.click(SwitchRoot);
    expect(SwitchRoot).not.toBeChecked();
    expect(SwitchRoot).toHaveAttribute('data-state', 'false');
  });

  it('controlled 컴포넌트 상태 제어', async () => {
    const user = userEvent.setup();
    const SwitchComponent = () => {
      const [checked, setChecked] = useState(false);
      return <Switch.Root checked={checked} onChangeSwitch={() => setChecked(prev => !prev)} />;
    };

    render(<SwitchComponent />);

    const SwitchRoot = screen.getByRole('switch');

    await user.click(SwitchRoot);
    expect(SwitchRoot).toBeChecked();
    expect(SwitchRoot).toHaveAttribute('data-state', 'true');

    await user.click(SwitchRoot);
    expect(SwitchRoot).not.toBeChecked();
    expect(SwitchRoot).toHaveAttribute('data-state', 'false');
  });
});

describe('WAI-ARIA test', () => {
  it('aria-clicked', async () => {
    const user = userEvent.setup();

    render(<Switch.Root />);
    const SwitchRoot = screen.getByRole('switch');

    await user.click(SwitchRoot);
    expect(SwitchRoot).toHaveAttribute('aria-checked', 'true');

    await user.click(SwitchRoot);
    expect(SwitchRoot).toHaveAttribute('aria-checked', 'false');
  });

  it('aria-required', () => {
    render(<Switch.Root required />);
    const SwitchRoot = screen.getByRole('switch');

    expect(SwitchRoot).toHaveAttribute('aria-required', 'true');
  });

  it('fakeInput is hidden', async () => {
    const user = userEvent.setup();

    const SwitchComponent = () => {
      const [checked, setChecked] = useState(false);
      return <Switch.Root checked={checked} onChangeSwitch={() => setChecked(prev => !prev)} />;
    };

    render(
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <SwitchComponent />
      </form>,
    );
    const SwitchRoot = screen.getByRole('switch');
    const FakeInput = await screen.findByRole('checkbox', { hidden: true });

    await user.click(SwitchRoot);

    expect(FakeInput).toBeInTheDocument();
    expect(FakeInput).not.toBeVisible();

    await user.click(SwitchRoot);

    expect(FakeInput).toBeInTheDocument();
    expect(FakeInput).not.toBeVisible();
  });
});

describe('custom style', () => {
  it('inline 스타일을 적용 할 수 있다.', () => {
    const styleObj: CSSProperties = { backgroundColor: '#fff', width: '200px', height: '100px' };

    render(<Switch.Root style={styleObj} />);
    const SwitchButton = screen.getByRole('switch');

    expect(SwitchButton).toHaveStyle({ 'background-color': '#fff' });
  });

  //TODO: vanilla extract 스타일 테스트 해야함

  // it('zero-runtime css를 적용할 수 있다.', () => {
  //   render(<Switch.Root className={testSwitchStyle} />);
  //   const SwitchButton = screen.getByRole('switch');
  //
  //   expect(SwitchButton).toHaveStyle(testSwitchStyleObj);
  // });
});

// render(<Switch.Root className={testSwitchStyle} />);
// const SwitchButton = screen.getByRole('switch');
// const computedStyle = window.getComputedStyle(SwitchButton);
// console.log(computedStyle);
// expect(computedStyle.color).toBe(testSwitchStyleObj.color);
