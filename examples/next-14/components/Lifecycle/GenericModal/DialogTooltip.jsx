import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const DialogTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(122,132,142,1)',
    color: '#F5F5F5',
    padding: '1rem',
    fontSize: '0.925rem',
    '& .tooltip-dark': {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  },
});

export default DialogTooltip;
