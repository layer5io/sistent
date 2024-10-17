import { useTheme } from '@mui/material';
import { FC } from 'react';
import { EmptyStyleIcon } from '../../icons/EmptyStyle';
import { CatalogEmptyStateDiv } from './style';

const EmptyStateCard: FC = () => {
  const theme = useTheme();
  return (
    <CatalogEmptyStateDiv>
      <EmptyStyleIcon fill={theme.palette.secondary.contrastText} width="100px" height="100px" />
      <h3 style={{ color: theme.palette.secondary.contrastText }}>No match found</h3>
    </CatalogEmptyStateDiv>
  );
};

export default EmptyStateCard;
