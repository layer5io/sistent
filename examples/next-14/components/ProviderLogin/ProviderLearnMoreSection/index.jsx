import { Box, Tooltip, Typography } from '@layer5/sistent';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

export const ProviderLearnMoreContainer = styled(Box)(() => ({
  width: '60%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3rem',
}));

export function ProviderLearnMoreSection({ handleOpen }) {
  return (
    <ProviderLearnMoreContainer>
      <Typography variant="h5" sx={{ fontWeight: 500 }} gutterBottom>
        Learn more about{' '}
        <Tooltip title="Learn more aboout providers" placement="bottom" data-cy="providers-tooltip">
          <Link
            href={'#'}
            style={{ color: '#00B39F', cursor: 'pointer', fontWeight: 700 }}
            onClick={handleOpen}
          >
            {' '}
            providers{' '}
          </Link>
        </Tooltip>
      </Typography>
    </ProviderLearnMoreContainer>
  );
}

export default ProviderLearnMoreSection;
