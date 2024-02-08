import { CHARCOAL, Tooltip } from '@layer5/sistent';
import { styled } from '@mui/material';
import { ziCalc } from '@/utils/zIndex';

export const renderTooltipContent = ({ showPriorText, showAfterText, link }) => {
  const handleClick = (e) => {
    window.open(link, '_blank');
    e.stopPropagation;
  };

  return (
    <div>
      <span style={{ marginRight: '2px' }}>{showPriorText}</span>
      <a onClick={handleClick} target="_blank" rel="noopener noreferrer">
        Read docs
      </a>
      <span style={{ marginLeft: '2px' }}>{showAfterText}</span>
    </div>
  );
};

const CustomTextTooltip = styled(Tooltip)(({ backgroundColor, flag }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: backgroundColor || CHARCOAL,
    color: '#fff',
    opacity: '100%',
    fontSize: '0.75rem',
    fontFamily: flag ? 'Qanelas Soft, sans-serif' : 'inherit',
    borderRadius: '0.9375rem',
    padding: '0.9rem',
    zIndex: ziCalc(11),
  },
  '& .MuiTooltip-popper': {
    zIndex: `${ziCalc(5)} !important`,
  },
}));

export function TextTooltip({ backgroundColor = CHARCOAL, flag, ...props }) {
  return <CustomTextTooltip {...props} />;
}

export default TextTooltip;
