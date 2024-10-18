import { FC } from 'react';
import { EmptyStyleIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CatalogEmptyStateDiv } from './style';

const EmptyStateCard: FC = () => {
  const theme = useTheme();
  return (
    <CatalogEmptyStateDiv>
      <EmptyStyleIcon fill={theme.palette.text.default} width="100px" height="100px" />
      <h3 style={{ color: theme.palette.text.default }}>No match found</h3>
    </CatalogEmptyStateDiv>
  );
};

export default EmptyStateCard;
