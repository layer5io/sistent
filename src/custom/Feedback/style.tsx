import { Box, Button, styled } from '@mui/material';
export const CloseButton = styled('div')({
  cursor: 'pointer'
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

export const FeedbackTextArea = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'bottom 0.5s ease'
});

export const FeedbackMiniIcon = styled('div')({
  width: '24px'
});

export const FeedbackSubmitButton = styled(Button)({
  color: 'white',
  width: '67px',
  height: '36px',
  textTransform: 'lowercase'
});

export const FeedbackButton = styled(Button)({
  backgroundColor: '#396679',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  transition: 'bottom 0.5s ease',
  position: 'fixed',
  bottom: '-10px',
  '&:hover': {
    backgroundColor: '#213A45'
  }
});

export const FeedbackForm = styled('form')({
  display: 'block',
  right: '0',
  backgroundColor: '#F6F8F8',
  bottom: '0',
  width: '100%',
  zIndex: '100',
  position: 'relative',
  height: '100%',
  alignItems: 'center',
  transition: 'bottom 0.5s ease'
});

interface FeedbackMessageProps {
  isOpen: boolean;
}

export const FeedbackMessage = styled(Box)<FeedbackMessageProps>(({ isOpen }) => ({
  position: 'relative',
  bottom: isOpen ? '0px' : '-240px',
  right: '0',
  color: '#000',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '20px',
  width: '448px',
  height: '333.5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'bottom 0.5s ease',
  fontSize: '1.5rem'
}));

export const FeedbackOptions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignSelf: 'center'
});

export const FeedbackOptionButton = styled(Button)({
  backgroundColor: '#294957',
  color: '#fff',
  fontSize: '16px',
  lineHeight: 1,
  letterSpacing: '0.029em',
  textTransform: 'none',
  width: '100%',
  height: '5rem',
  marginBottom: '0.5rem',
  display: 'flex',
  borderRadius: '0px',
  flexDirection: 'column',
  fill: '#f2f2f2',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#000',
    fill: '#51636B'
  }
});

export const StyledTextArea = styled('textarea')({
  width: '100%',
  background: 'transparent',
  border: '1px solid grey',
  borderRadius: '4px',
  color: '#000',
  fontSize: '16px',
  padding: '10px',
  resize: 'none',
  fontFamily: 'inherit',
  fontStyle: 'normal',
  '&::placeholder': {
    color: '#1E2117'
  },
  '&:focus': {
    outline: '1px solid #00D3A9'
  }
});

export const StyledLink = styled('a')({
  textDecoration: 'underline',
  color: 'inherit',
  '&:hover': {
    color: 'inherit'
  }
});
