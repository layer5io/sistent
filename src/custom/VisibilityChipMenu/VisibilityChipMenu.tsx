import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Theme, useTheme } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Button, Menu, MenuItem } from '../../base';
import { iconXSmall } from '../../constants/iconsSizes';
import { ALICE_BLUE, CHINESE_SILVER, NOT_FOUND, styled } from '../../theme';

export const VIEW_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  PUBLISHED: 'published'
} as const;

export type VIEW_VISIBILITY = (typeof VIEW_VISIBILITY)[keyof typeof VIEW_VISIBILITY];

interface VisibilityChipMenuProps {
  value: VIEW_VISIBILITY;
  onChange: (value: string) => void;
  options: [string, React.ElementType][];
  enabled: boolean;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor:
      theme.palette.mode === 'light' ? ALICE_BLUE : theme.palette.background.constant?.table,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.border.default}`,
    borderRadius: '0.25rem',
    padding: '0rem'
  },
  '& .MuiMenuItem-root': {
    fontSize: '.9rem',
    padding: '0.5rem',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? CHINESE_SILVER : 'rgba(0, 179, 159, 0.25)'
    }
  },
  //selected
  '& .Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? CHINESE_SILVER : 'rgba(0, 179, 159, 0.25)'
  },
  '& .MuiList-padding': {
    padding: '0px'
  }
}));

const StyledButton = styled(Button)(() => ({
  padding: '0px',
  width: '100%'
}));

const StyledDiv = styled('div')(
  ({ theme, enabled, type }: { theme: Theme; enabled: boolean; type: VIEW_VISIBILITY }) => ({
    paddingLeft: '0.3rem',
    height: '1.5rem',
    paddingRight: enabled ? '0' : '0.3rem',
    borderRadius: '0.25rem',
    border: `1px solid ${NOT_FOUND}`,
    background:
      theme?.palette.mode === 'light' ? ALICE_BLUE : theme?.palette.background.constant?.table,
    textTransform: 'uppercase',
    color: theme?.palette.text.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: type !== 'published' ? '3.8rem' : 'auto',
    fontSize: '0.75rem',
    fontFamily: theme?.typography.fontFamily
  })
);

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.icon.default
}));

const StyledIcon = styled('div')({
  marginRight: '0.5rem'
});

const VisibilityChipMenu: React.FC<VisibilityChipMenuProps> = ({
  value,
  onChange,
  options,
  enabled
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const close = (e: MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!enabled) return;
    setAnchorEl(e.currentTarget);
  };
  const handleChange = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(value);
    close(e);
  };
  const theme = useTheme();
  return (
    <>
      <StyledButton
        disabled={!enabled}
        onClick={handleOpen}
        data-testid={`design-visibility-${value.toLowerCase()}`}
      >
        <StyledDiv theme={theme} enabled={enabled} type={value}>
          <span style={{ fontSize: '0.7rem' }}>{value}</span>
          {enabled && <ArrowDropDownIcon style={{ ...iconXSmall }} />}
        </StyledDiv>
      </StyledButton>

      <StyledMenu
        open={open}
        onClose={close}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (anchorEl?.getBoundingClientRect().bottom ?? 0) + 5,
          left: (anchorEl?.getBoundingClientRect().left ?? 0) + 5
        }}
      >
        {options.map(([visibility, Icon], index) => (
          <StyledMenuItem
            key={index}
            data-testid={`visibility-toggle-${visibility.toLowerCase()}`}
            onClick={(e) => handleChange(e, visibility)}
          >
            <StyledIcon>
              <Icon width={16} height={16} />
            </StyledIcon>
            {visibility}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default VisibilityChipMenu;
