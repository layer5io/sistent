import { Box, Button, Card, Checkbox, Grid2, IconButton, Typography } from '../../base';

import { DeleteIcon, EditIcon } from '../../icons';
import { styled, useTheme } from '../../theme';
import { charcoal } from '../../theme/colors/colors';
import { CustomTooltip } from '../CustomTooltip';

export const ModalActionDiv = styled('div')({
  display: 'flex',
  gap: '1rem'
});

interface ExtendedEditIconProps {
  onClick: () => void;
  disabled?: boolean;
  bulk?: boolean;
  style?: React.CSSProperties;
  title?: string;
}

export const TableHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center'
});

export const TableRightActionHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem'
});

export const CellStyle = styled('div')({
  boxSizing: 'border-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

export const CustomBodyRenderStyle = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  boxSizing: 'border-box',
  display: 'block',
  width: '100%'
});

export const TableTopIcon = styled('span')(() => ({
  '& svg': {
    cursor: 'pointer',
    width: '2rem',
    height: '2rem'
  }
}));

export const DisabledTableTopIcon = styled('span')(() => ({
  '& svg': {
    width: '2rem',
    height: '2rem'
  }
}));

export const MesheryDeleteIcon = styled('span')(({ theme }) => ({
  '& svg': {
    color: '#3C494F',
    '&:hover': {
      color: theme.palette.error.error
    }
  }
}));

export const TableIconsDisabledContainer = styled('span')(() => ({
  color: '#455a64',
  opacity: '0.5',
  '& svg': {
    cursor: 'not-allowed'
  }
}));

export const TableTopIconsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: '26px'
}));

export const TableIconsContainer = styled('div')(() => ({
  color: '#455a64',
  display: 'flex',
  cursor: 'not-allowed',
  '& svg': {
    cursor: 'pointer'
  }
}));

export const BulkSelectCheckbox = styled(Checkbox)({
  padding: 0,
  marginRight: '0.5rem',
  height: '28px',
  '& .MuiSvgIcon-root': {
    borderColor: 'white'
  },
  color: 'white',
  '&:hover': {
    color: 'white',
    cursor: 'pointer'
  },
  '&.Mui-checked': {
    color: 'white'
  }
});

export const CardTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 800,
  '&:hover': {
    cursor: 'default'
  }
});

export const OrganizationName = styled(Typography)({
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'end',
  padding: '0 5px',
  '&:hover': {
    cursor: 'default'
  }
});

export const StyledIconButton = styled('button')({
  background: 'transparent',
  border: 'none',
  '&:hover': {
    cursor: 'default'
  }
});

export const DateLabel = styled(Typography)({
  fontStyle: 'italic',
  fontSize: '12px',
  '&:hover': {
    cursor: 'default'
  }
});

export const EmptyDescription = styled(Typography)({
  fontSize: '0.9rem',
  textAlign: 'left',
  fontStyle: 'italic'
});

export const DescriptionLabel = styled(EmptyDescription)({
  height: 'fit-content',
  fontStyle: 'normal',
  '&:hover': {
    cursor: 'default'
  }
});

export const AllocationButton = styled(Box)(({ theme }) => ({
  background: theme.palette.background.brand?.default,
  padding: '10px 10px 1px 10px',
  borderRadius: '4px',
  height: '100%',
  display: 'flex',
  width: '100%'
}));

export const AllocationWorkspace = styled(AllocationButton)({
  display: 'flex',
  width: '100%',
  gap: '10px',
  ['@media (min-width : 600px)']: {
    flexDirection: 'column',
    gap: '0'
  }
});

export const PopupButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  background: theme.palette.background.brand?.default,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  color: theme.palette.text.default,
  '&:hover': {
    background: theme.palette.text.default
  },
  padding: '15px 10px'
}));

interface TabStyleProps {
  textColor?: string;
}

export const TabTitle = styled('p')<TabStyleProps>(({ theme, textColor }) => ({
  margin: '0',
  fontSize: '14px',
  fontWeight: '400',
  display: 'flex',
  color: textColor || theme.palette.text.constant?.white
}));

export const TabCount = styled('p')<TabStyleProps>(({ theme, textColor }) => ({
  margin: '0',
  fontSize: '60px',
  fontWeight: '500',
  lineHeight: 1,
  marginBottom: '5px',
  color: textColor || theme.palette.text.constant?.white
}));

export const ViewButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  background: theme.palette.text.default,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  color: `${charcoal[40]}30 !important`,
  '&:hover': {
    background: theme.palette.text.default
  },
  padding: '15px 10px'
}));

interface IconWrapperProps {
  disabled?: boolean;
}

export const IconWrapper = styled('div')<IconWrapperProps>(({ disabled = false }) => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? '0.5' : '1',
  display: 'flex',
  '& svg': {
    cursor: disabled ? 'not-allowed' : 'pointer'
  }
}));

export const Record = styled(Grid2)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'row',
  padding: '5px 0'
}));

export const L5DeleteIcon = ({
  onClick,
  bulk,
  disabled,
  style,
  key,
  title = 'Delete'
}: {
  onClick: () => void;
  bulk?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  key?: string;
  title?: string;
}) => {
  const theme = useTheme();
  return (
    <CustomTooltip title={title} key={key} arrow>
      <div>
        <IconButton
          sx={{
            '&:hover': {
              '& svg': {
                fill: disabled ? theme.palette.icon.disabled : theme.palette.background.error?.hover
              }
            },
            ...style
          }}
          disableRipple
          disabled={disabled}
          onClick={onClick}
        >
          <DeleteIcon
            fill={disabled ? theme.palette.icon.disabled : theme.palette.icon.default}
            width={bulk ? '28' : '24'}
            height={bulk ? '28' : '24'}
            style={style}
          />
        </IconButton>
      </div>
    </CustomTooltip>
  );
};

export const L5EditIcon = ({
  onClick,
  disabled,
  bulk,
  style,
  title = 'Edit'
}: ExtendedEditIconProps) => {
  const theme = useTheme();
  return (
    <CustomTooltip title={title} arrow>
      <div>
        <IconButton
          onClick={onClick}
          sx={{
            '&:hover': {
              '& svg': {
                fill: disabled
                  ? theme.palette.icon.disabled
                  : theme.palette.background.brand?.default
              }
            },
            ...style
          }}
          disableRipple
          disabled={disabled}
        >
          <EditIcon
            fill={disabled ? theme.palette.icon.disabled : theme.palette.icon.default}
            width={bulk ? '28' : '24'}
            height={bulk ? '28' : '24'}
            style={style}
          />
        </IconButton>
      </div>
    </CustomTooltip>
  );
};

export const WorkspaceCardGrid = styled(Grid2)({
  display: 'flex',
  flexDirection: 'row'
});

export const DescriptionGrid = styled(Grid2)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 1
});

export const AllocationColumnGrid = styled(Grid2)({
  width: '100%'
});

export const CardWrapper = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2.5),
  cursor: 'pointer'
}));

export const CardBackWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: theme.spacing(50),
  background: 'linear-gradient(180deg, #007366 0%, #000 100%)'
}));

export const CardFrontWrapper = styled(CardWrapper)(({ theme }) => ({
  minHeight: theme.spacing(50),

  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none'
}));

export const CardBackTopGrid = styled(Grid2)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

export const CardBackTitleGrid = styled(Grid2)({
  display: 'flex',
  alignItems: 'flex-start'
});

export const CardBackActionsGrid = styled(Grid2)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

export const RecentActivityTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  padding: '0.5rem 0',
  color: theme.palette.background.constant?.white
}));

export const RecentActivityGrid = styled(Grid2)({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '14.5rem',
  overflowY: 'scroll'
});

export const DateGrid = styled(Grid2)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  bottom: '20px',
  width: '100%',
  color: `${theme.palette.background.constant?.white}99`,
  justifyContent: 'space-between',
  paddingRight: '40px'
}));

export const DateColumnGrid = styled(Grid2)({
  textAlign: 'left'
});
