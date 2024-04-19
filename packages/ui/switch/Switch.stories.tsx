import { Switch } from './switch';
import { useState } from 'react';
export default {
  title: 'Design System/Switch',
  component: Switch,
};

export const Story = () => {
  const [switchState, setSwitchState] = useState(false);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log('서브밋 발생');
      }}
      style={{ backgroundColor: 'red' }}
    >
      <Switch.Root
        // checked={switchState}
        name="dott"
        required={false}
        onChangeSwitch={() => setSwitchState(prev => !prev)}
        style={{
          display: 'flex',
          width: '60px',
          padding: '6px',
          borderRadius: '9999px',
          border: 'none',
          justifyContent: switchState
            ? 'end'
            : 'start' /* control만 스타일 적용 -> unControl은 추후 처리 */,
          background: switchState ? 'coral' : 'lightGray',
        }}
      >
        <Switch.Thumb
          style={{
            display: 'block',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
        <button type={'submit'}></button>
      </Switch.Root>
    </form>
  );
};
