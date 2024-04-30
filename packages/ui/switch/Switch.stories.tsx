import { useState } from 'react';

import { Switch } from './switch';
import { styledSwitchRoot, styledSwitchThumb } from './switchStyle.css';

export default {
  title: 'Design System/Switch',
  component: Switch,
};

export const Default = () => {
  return (
    <>
      <fieldset>
        <legend>Switch Default</legend>
        <Switch.Root className={styledSwitchRoot}>
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </fieldset>

      <fieldset>
        <legend>Switch Disabled</legend>
        <Switch.Root disabled className={styledSwitchRoot}>
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </fieldset>
    </>
  );
};

export const Controllable = () => {
  const [switchState, setSwitchState] = useState(false);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <fieldset>
        <legend>controlled Switch</legend>
        <Switch.Root
          checked={switchState}
          onChangeSwitch={() => setSwitchState(prev => !prev)}
          className={styledSwitchRoot}
        >
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </fieldset>

      <fieldset>
        <legend>unControlled Switch</legend>
        <Switch.Root className={styledSwitchRoot}>
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </fieldset>
    </form>
  );
};

export const FormControlSwitch = () => {
  const [resultText, setResultText] = useState<string>('');

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          let text = '';
          for (const key of formData.keys()) {
            text += `${key}Switch : ${formData.get(key)}\n`;
          }
          setResultText(text);
        }}
      >
        <fieldset>
          <legend>
            required
            <b style={{ color: 'red' }}>*</b>
          </legend>
          <Switch.Root name="required" required className={styledSwitchRoot}>
            <Switch.Thumb className={styledSwitchThumb} />
          </Switch.Root>
        </fieldset>

        <fieldset>
          <legend>isFormControl</legend>
          <h4> When this option is false, the form will not collect the switch’s information</h4>

          <p>this switch is form controlled (default:true)</p>
          <Switch.Root name="isFormControl" isFormControl required className={styledSwitchRoot}>
            <Switch.Thumb className={styledSwitchThumb} />
          </Switch.Root>
          <p>this switch is not form controlled (false)</p>
          <Switch.Root
            name="isNotFormControl"
            required
            isFormControl={false}
            className={styledSwitchRoot}
          >
            <Switch.Thumb className={styledSwitchThumb} />
          </Switch.Root>
        </fieldset>

        <button type="submit" style={{ marginTop: 8 }}>
          submit
        </button>
      </form>

      <h3>submitted SwitchValue</h3>
      <p>{resultText}</p>
    </>
  );
};
