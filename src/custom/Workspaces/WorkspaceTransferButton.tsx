import { SyncAlt as SyncAltIcon } from '@mui/icons-material';
import { Grid, Tooltip, Typography } from '../../base';
import { useTheme } from '../../theme';
import { formatShortDate, formatShortDateTime } from './helper';
import { PopupButton, Record, TabCount, TabTitle } from './styles';

interface TransferButtonProps {
  title: string;
  count: number;
  onAssign: () => void;
  disabled: boolean;
}

interface RedirectButtonProps {
  title: string;
  count: number;
  disabled?: boolean;
}

export const TransferButton: React.FC<TransferButtonProps> = ({
  title,
  count,
  onAssign,
  disabled
}) => {
  const theme = useTheme();
  return (
    <PopupButton
      onClick={onAssign}
      disabled={disabled}
      color="primary"
      sx={{
        color: theme.palette.background.neutral?.default,
        backgroundColor: theme.palette.background.constant?.table,
        margin: '0px 0px 10px',
        padding: '20px 10px',
        '&:hover': {
          backgroundColor: theme.palette.background.constant?.table,
          boxShadow: 'none'
        }
      }}
    >
      <Grid>
        <TabCount textColor={theme.palette.text.default}>{count}</TabCount>
        <TabTitle textColor={theme.palette.text.default}>{title}</TabTitle>
        <SyncAltIcon sx={{ position: 'absolute', top: '10px', right: '10px' }} />
      </Grid>
    </PopupButton>
  );
};

export const RedirectButton: React.FC<RedirectButtonProps> = ({
  title,
  count,
  disabled = true
}) => {
  return (
    <PopupButton disabled={disabled} color="primary" sx={{ boxShadow: 'none' }}>
      <Grid>
        <TabCount>{count}</TabCount>
        <TabTitle>{title}</TabTitle>
        {/* <ArrowForward /> */}
      </Grid>
    </PopupButton>
  );
};

interface RecordRowProps {
  title: string;
  name: string;
  date?: string | Date;
}

export const RecordRow: React.FC<RecordRowProps> = ({ title, name, date }) => {
  const theme = useTheme();

  return (
    <Record>
      <Grid xs={10} sx={{ display: 'flex', maxHeight: '140px' }}>
        <Typography
          sx={{
            fontSize: 14,
            textAlign: 'left',
            color: theme.palette.background.constant?.white,
            maxWidth: 'max-content',
            overflowX: 'hidden'
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ ml: 1, fontStyle: 'italic', color: theme.palette.background.brand?.default }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title={date ? formatShortDateTime(date) : ''} placement="top">
          <Typography
            sx={{
              fontSize: 14,
              fontStyle: 'italic',
              color: `${theme.palette.text.disabled}`,
              paddingRight: '12px',
              textAlign: 'end'
            }}
          >
            {date ? formatShortDate(date) : '-'}
          </Typography>
        </Tooltip>
      </Grid>
    </Record>
  );
};
