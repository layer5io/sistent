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

interface OpenLeaderBoardButtonProps {
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
          size="large"
          style={{
            backgroundColor: open ? undefined : theme.palette.background.constant?.disabled
          }}
        >
          <TropyIcon style={{ height: '2rem', width: '2rem', marginRight: '10px' }} />
          {open ? 'Hide Performers' : 'Show Performers'}
        </Button>
      </span>
    </CustomTooltip>
  );
};

const OpenLeaderBoardButton: React.FC<OpenLeaderBoardButtonProps> = ({ handleClick }) => {
  return (
    <CustomTooltip title={'Open Leaderboard'} placement="bottom">
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          height: '3.7rem',
          padding: '0.3rem',
          display: { xs: 'inline-flex', sm: 'none' }
        }}
      >
        <TropyIcon style={{ height: '2rem', width: '2rem' }} />
      </Button>
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
export { OpenLeaderBoardButton, PerformersSectionButton };
