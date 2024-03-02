import { Box, Button, Checkbox, styled } from '@mui/material';
import {} from '../../constants/constants';
import {
  BLACK,
  BUTTON_MODAL,
  BUTTON_MODAL_DARK,
  CARIBBEAN_GREEN,
  CHINESE_SILVER,
  CULTURED,
  DARK_JUNGLE_GREEN,
  DARK_PRIMARY_COLOR,
  DARK_SLATE_GRAY,
  KEPPEL,
  MEDIUM_GREY,
  SNOW_WHITE,
  WHITE,
  buttonDisabled
} from '../../theme/colors/colors';
export const CloseButton = styled('div')({
  cursor: 'pointer',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  fill: CULTURED
});

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled(Box)<ContainerProps>(({ isOpen }) => ({
  position: 'fixed',
  bottom: isOpen ? '0px' : '-487px',
  right: '20px',
  transition: 'bottom 0.5s ease'
}));

export const FeedbackTextArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'bottom 0.5s ease',
  padding: '1.688rem 1.188rem',
  width: '28rem',
  height: '12rem'
});

export const ActionWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '0.5px',
  height: '20px',
  width: '21.188rem'
});

export const FeedbackMiniIcon = styled('div')({
  width: '24px',
  height: '24px'
});

export const FeedbackSubmitButton = styled(Button)<ContainerProps>(({ isOpen }) => ({
  color: 'white',
  width: '4.313rem',
  height: '2.25rem',
  textTransform: 'none',
  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
  backgroundColor: isOpen ? buttonDisabled.main : KEPPEL
}));

export const FeedbackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? BUTTON_MODAL_DARK : BUTTON_MODAL,
  color: CULTURED,
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  transition: 'bottom 0.5s ease',
  position: 'fixed',
  bottom: '-10px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? BLACK : '#213A45'
  }
}));

export const FeedbackForm = styled('form')(({ theme }) => ({
  display: 'block',
  right: '0',
  backgroundColor: theme.palette.mode === 'dark' ? '#333333' : CULTURED,
  bottom: '0',
  width: '100%',
  zIndex: '100',
  position: 'relative',
  height: '100%',
  alignItems: 'center',
  transition: 'bottom 0.5s ease'
}));

interface FeedbackMessageProps {
  isOpen: boolean;
}

export const FeedbackMessage = styled(Box)<FeedbackMessageProps>(({ isOpen, theme }) => ({
  position: 'relative',
  bottom: isOpen ? '0px' : '-240px',
  right: '0',
  color: BLACK,
  backgroundColor: theme.palette.mode === 'dark' ? DARK_JUNGLE_GREEN : WHITE,
  border: `1px solid ${MEDIUM_GREY}`,
  padding: '20px',
  width: '28rem',
  height: '333.5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'bottom 0.5s ease',
  fontSize: '1.5rem',
  textAlign: 'center'
}));

export const FeedbackOptions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignSelf: 'center'
});

export const FeedbackOptionButton = styled(Button)<FeedbackMessageProps>(({ theme, isOpen }) => ({
  fontSize: '16px',
  lineHeight: 1,
  letterSpacing: '0.029em',
  textTransform: 'none',
  width: '100%',
  height: '5rem',
  display: 'flex',
  padding: '0rem',
  borderRadius: '0px',
  flexDirection: 'column',
  borderBottom: isOpen ? `2px solid ${KEPPEL}` : '',
  background: isOpen
    ? theme.palette.mode === 'dark'
      ? BLACK
      : SNOW_WHITE
    : theme.palette.mode === 'dark'
    ? DARK_JUNGLE_GREEN
    : DARK_SLATE_GRAY,
  color: isOpen
    ? theme.palette.mode === 'dark'
      ? SNOW_WHITE
      : BLACK
    : theme.palette.mode === 'dark'
    ? SNOW_WHITE
    : SNOW_WHITE,
  fill: isOpen ? (theme.palette.mode === 'dark' ? CULTURED : DARK_PRIMARY_COLOR) : CULTURED,
  '&:hover': {
    color: theme.palette.mode === 'dark' ? SNOW_WHITE : BLACK,
    fill: theme.palette.mode === 'dark' ? CULTURED : DARK_PRIMARY_COLOR,
    backgroundColor: WHITE
  }
}));

export const StyledTextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  background: 'transparent',
  border: `1px solid ${CHINESE_SILVER}`,
  borderRadius: '4px',
  color: theme.palette.mode === 'dark' ? SNOW_WHITE : BLACK,
  fontSize: '16px',
  paddingTop: '10.5px',
  paddingBottom: '10.5px',
  paddingLeft: '0.6rem',
  paddingRight: '0.6rem',
  resize: 'none',
  fontFamily: 'inherit',
  fontStyle: 'normal',
  '&::placeholder': {
    color: theme.palette.mode === 'dark' ? SNOW_WHITE : DARK_JUNGLE_GREEN
  },
  '&:focus': {
    outline: `1px solid ${CARIBBEAN_GREEN}`
  }
}));

export const MeetWrapper = styled('p')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? SNOW_WHITE : DARK_JUNGLE_GREEN
}));

export const StyledLink = styled('a')({
  textDecoration: 'underline',
  color: 'inherit',
  '&:hover': {
    color: 'inherit'
  }
});

export const StyledCheckbox = styled(Checkbox)({
  color: `${WHITE} !important`,
  marginLeft: '-11px',
  paddingLeft: '0px'
});
export const InnerComponentWrapper = styled('div')({
  padding: '1.5rem 1rem',
  width: '28rem',
  height: '12rem'
});
export const HelperWrapper = styled('div')({
  padding: '0px',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center'
});
