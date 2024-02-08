import { styled } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const DashboardInfoOutlined = styled(InfoOutlined)(({ theme }) => ({
  color: theme.palette.iconMain,
  // color: '#F6F8F8', // #3C494F
  // ...iconSmall,
  marginLeft: '0.5rem',
  cursor: 'pointer',
}));

export default DashboardInfoOutlined;
