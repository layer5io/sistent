import { Slider } from '@mui/material';
import { styled } from '../../theme';

export const SliderDiv = styled(Slider)(({ theme, size }) => ({
  margin: '5px 0',
  borderRadius: '16px',
  color: theme.palette.background.brand?.default,
  border: `1px solid ${theme.palette.background.brand?.default} `,
  padding: '0 !important',
  height: size === 'small' ? '26px' : '30px',
  '& .MuiSlider-thumb': {
    display: 'none !important'
  },
  '& .MuiSlider-track': {
    borderWidth: size === 'small' ? '4px !important' : '0 !important'
  },
  '& .MuiSlider-rail': {
    opacity: '0 !important'
  }
}));

interface PrecentageLabelProps {
  size: 'small' | 'medium' | 'large';
  completedPercentage: number;
}

export const PrecentageLabel = styled('div')<PrecentageLabelProps>(
  ({ size, completedPercentage, theme }) => ({
    position: 'relative',
    marginBottom: '-25px',
    fontSize: size === 'small' ? '12px' : '16px',
    left: '7px',
    top: '-35px',
    color:
      completedPercentage === 0
        ? theme.palette.background.brand?.default
        : theme.palette.text.constant?.white,
    bottom: size === 'small' ? '30px' : '37px'
  })
);
