import { SyncAlt as SyncAltIcon } from '@mui/icons-material';
import { Grid2, Typography } from '../../base';
import { useTheme } from '../../theme';
import { getFullFormattedTime, getRelativeTime } from '../../utils';
import { CustomTooltip } from '../CustomTooltip';
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
      <Grid2>
        <TabCount textColor={theme.palette.text.default}>{count}</TabCount>
        <TabTitle textColor={theme.palette.text.default}>{title}</TabTitle>
        <SyncAltIcon sx={{ position: 'absolute', top: '10px', right: '10px' }} />
      </Grid2>
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
      <Grid2>
        <TabCount>{count}</TabCount>
        <TabTitle>{title}</TabTitle>
        {/* <ArrowForward /> */}
      </Grid2>
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
      <Grid2 sx={{ display: 'flex', maxHeight: '140px' }} size={10}>
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
          sx={{
            marginInline: '0.5rem',
            fontStyle: 'italic',
            color: theme.palette.background.brand?.default,
            textWrap: 'nowrap'
          }}
        >
          {name}
        </Typography>
      </Grid2>
      <Grid2 sx={{ display: 'flex', justifyContent: 'flex-end' }} size={2}>
        <CustomTooltip title={date ? getFullFormattedTime(date as string) : ''} placement="top">
          <div>
            <Typography
              sx={{
                fontSize: 14,
                fontStyle: 'italic',
                color: `${theme.palette.text.disabled}`,
                paddingRight: '12px',
                textAlign: 'end'
              }}
            >
              {date ? getRelativeTime(date as string) : '-'}
            </Typography>
          </div>
        </CustomTooltip>
      </Grid2>
    </Record>
  );
};
