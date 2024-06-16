import { styled } from '@mui/material/styles';
import { InfoOutlined } from '@mui/icons-material';
import { cultured } from '@layer5/sistent';

const DashboardInfoOutlined = styled(InfoOutlined)(({ theme }) => ({
  color: cultured.main,
  // color: '#F6F8F8', // #3C494F
  // ...iconSmall,
  marginLeft: '0.5rem',
  cursor: 'pointer',
}));

export default DashboardInfoOutlined;
