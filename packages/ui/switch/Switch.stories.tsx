import { Switch, SwitchThumb } from './index';
import { useState } from 'react';
export default {
  title: 'Design System/Switch',
  component: Switch,
  /*
   * More on Storybook parameters at:
   * https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
   */
};

export const Story = () => {
  const [switchState, setSwitchState] = useState(false);
  return (
    <Switch
      // checked={switchState}
      disabled={false}
      onChangeSwitch={() => {
        setSwitchState(prev => !prev);
      }}
    >
      <SwitchThumb />
    </Switch>
  );
};
