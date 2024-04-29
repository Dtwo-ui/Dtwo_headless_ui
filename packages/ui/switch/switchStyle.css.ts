import { style } from '@vanilla-extract/css';

export const storyContainer = style({ display: 'flex' });
export const testSwitchStyleObj = {
  color: 'rgb(255, 255, 255)',
  width: '300px',
  height: '200px',
};

export const testSwitchStyle = style(testSwitchStyleObj);

export const styledSwitchRoot = style({
  display: 'flex',
  width: '60px',
  padding: '6px',
  borderRadius: '9999px',
  border: 'none',
  selectors: {
    '&[data-state="true"]': {
      backgroundColor: '#3498db',
      justifyContent: 'flex-end',
    },
    '&[data-state="false"]': {
      backgroundColor: '#bdc3c7',
    },
    '&:disabled': {
      opacity: '0.5',
    },
  },
});

export const styledSwitchThumb = style({
  display: 'block',
  width: '20px',
  height: '20px',
  backgroundColor: 'white',
  borderRadius: '50%',
  selectors: {
    '&[data-state="true"]': {
      transform: 'translate(0, 0)',
    },
  },
});
