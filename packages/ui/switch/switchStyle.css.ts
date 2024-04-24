import { style } from '@vanilla-extract/css';

export const storyContainer = style({ display: 'flex' });

export const styledSwitchRoot = style({
  display: 'flex',
  width: '60px',
  padding: '6px',
  borderRadius: '9999px',
  border: 'none',
  selectors: {
    '&:[data-state="true"]': {
      color: '#3498db',
    },
    '&:[data-state="false"]': {
      color: '#bdc3c7',
    },
  },
});

export const styledSwitchThumb = style({
  display: 'block',
  width: '20px',
  height: '20px',
  backgroundColor: 'white',
  borderRadius: '50%',
});
