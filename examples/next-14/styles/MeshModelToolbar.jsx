import { styled } from '@mui/material/styles';

const MeshModelToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor:
    theme.palette.type === 'dark'
      ? theme.palette.secondary.toolbarBg2
      : theme.palette.secondary.toolbarBg1,
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
  height: '0rem',
  padding: '0rem',
  borderRadius: '0.5rem',
  position: 'relative',
  zIndex: 0,
  marginBottom: '0.5rem',
  marginTop: '1rem',
}));

export default MeshModelToolbar;
