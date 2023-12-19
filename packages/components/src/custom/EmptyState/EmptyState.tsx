import CurvedArrowIcon from '@layer5/sistent-svg';
import { Grid } from '../../base/Grid';
import { Typography } from '../../base/Typography';

/**
 * Empty state component for grid view.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message of the empty state.
 * @param {string} props.icon - The icon of the empty state.
 * @param {boolean} pros.poiner - The arrow pointer for button state.
 *
 */

export interface EmptyStateProps {
  icon: string;
  message?: string;
  pointerLabel?: string;
  poiner?: boolean;
}

function EmptyState({
  icon,
  message,
  pointerLabel,
  poiner = false,
  ...rest
}: EmptyStateProps): JSX.Element {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '50vh'
      }}
    >
      {poiner && (
        <Grid style={{ display: 'flex', width: '100%', padding: '0 40px' }}>
          <CurvedArrowIcon />
          <Typography
            sx={{
              fontSize: 24,
              color: '#808080',
              px: 5,
              py: 2,
              lineHeight: 1.5,
              letterSpacing: '0.15px',
              display: 'flex',
              alignItems: 'flex-end',
              marginBottom: -32
            }}
          >
            {pointerLabel}
          </Typography>
        </Grid>
      )}
      <Grid style={{ marginTop: '120px' }}>
        {icon}
        <Typography
          sx={{
            fontSize: 24,
            color: '#808080',
            px: 5,
            py: 2,
            lineHeight: 1
          }}
        >
          {message}
        </Typography>
      </Grid>
    </div>
  );
}

export default EmptyState;
