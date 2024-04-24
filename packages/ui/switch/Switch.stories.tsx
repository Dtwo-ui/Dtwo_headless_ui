import { useState } from 'react';

import { Switch } from './switch';
import { styledSwitchRoot, styledSwitchThumb } from './switchStyle.css';

export default {
  title: 'Design System/Switch',
  component: Switch,
};

export const FormControl = () => {
  const [switchState, setSwitchState] = useState(false);

  return (
    <>
      <h2>controlled Switch</h2>
      <form onSubmit={e => e.preventDefault()}>
        <Switch.Root
          checked={switchState}
          onChangeSwitch={() => setSwitchState(prev => !prev)}
          className={styledSwitchRoot}
        >
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </form>

      <h2>unControlled Switch</h2>
      <form onSubmit={e => e.preventDefault()}>
        <Switch.Root className={styledSwitchRoot}>
          <Switch.Thumb className={styledSwitchThumb} />
        </Switch.Root>
      </form>
    </>
  );
};
