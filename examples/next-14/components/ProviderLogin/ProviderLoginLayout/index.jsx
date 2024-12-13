import { Box } from '@layer5/sistent';
import { styled } from '@mui/material/styles';

export const ProviderLoginContainer = styled(Box)(() => ({
  padding: '170px 0px',
  textAlign: 'center',
}));

export function ProviderLoginLayout({ children }) {
  return <ProviderLoginContainer data-cy="root">{children}</ProviderLoginContainer>;
}

export default ProviderLoginLayout;
