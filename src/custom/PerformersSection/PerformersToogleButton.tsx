import React from 'react';
import { Button, Skeleton } from '../../base';
import { TropyIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';
import { CardSkeleton } from './styles';

interface PerformersSectionButtonProps {
  open: boolean;
  handleClick: () => void;
}

const PerformersSectionButton: React.FC<PerformersSectionButtonProps> = ({ open, handleClick }) => {
  const theme = useTheme();

  return (
    <CustomTooltip title={open ? 'Hide Performers' : 'Show Performers'} placement="bottom">
      <span>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            height: '3.7rem',
            padding: '0rem'
          }}
          style={{
            backgroundColor: open ? undefined : theme.palette.background.constant?.disabled
          }}
        >
          <TropyIcon style={{ height: '2rem', width: '2rem' }} />
        </Button>
      </span>
    </CustomTooltip>
  );
};

export const StateCardSekeleton = () => {
  return (
    <CardSkeleton>
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant={'rounded'}
          height={'13.5rem'}
          width={'inherit'}
          sx={{
            minWidth: '150px'
          }}
          style={{ borderRadius: '1rem' }}
        />
      ))}
    </CardSkeleton>
  );
};
export default PerformersSectionButton;
