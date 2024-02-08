import { styled } from '@mui/material';
import { Button } from '@layer5/sistent';

const CreateDesignButton = styled(Button)(({ theme }) => ({
  paddingRight: theme.spacing(0.5),
  margin: '0.5rem 0.5rem',
  whiteSpace: 'nowrap',
  '& .MuiSvgIcon-root': {
    width: theme.spacing(2.5),
  },
}));

export default CreateDesignButton;
