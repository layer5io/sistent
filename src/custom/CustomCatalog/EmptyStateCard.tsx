import { FC } from 'react';
import { Typography } from '../../base';
import { EmptyStyleIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CatalogEmptyStateDiv } from './style';

const EmptyStateCard: FC = () => {
  const theme = useTheme();
  return (
    <CatalogEmptyStateDiv>
      <EmptyStyleIcon fill={theme.palette.text.default} width="100px" height="100px" />
      <Typography variant="h3" style={{ color: theme.palette.text.default }}>
        No match found
      </Typography>
    </CatalogEmptyStateDiv>
  );
};

export default EmptyStateCard;
