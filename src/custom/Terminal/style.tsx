import { styled } from '@mui/material';

export const TerminalWrapper = styled('div')({
  width: '52rem',
  maxWidth: '90%'
});

export const TitleBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  background: '#323339',
  width: '100%',
  height: '2.875rem',
  borderRadius: '2px 2px 0 0'
});

export const Title = styled('div')({
  color: '#76767d',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '13.5px',
  margin: '0 auto'
});

export const WindowControls = styled('ul')({
  position: 'absolute',
  display: 'block',
  listStyle: 'none',
  marginLeft: '1rem',
  marginTop: '0',
  marginBottom: '0',
  padding: '0',

  '& li': {
    display: 'inline-block',
    width: '0.875rem',
    height: '0.875rem',
    background: '#1d1e23',
    borderRadius: '0.75rem',
    marginRight: '7px'
  }
});

export const Content = styled('div')({
  width: '100%',
  height: '100%',
  background: '#1d1e23',
  borderRadius: '0 0 2px 2px',
  padding: '24px 32px'
});

export const OverflowWrapper = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'scroll',

  /* Hides the scrollbars */
  msOverflowStyle: 'none' /* IE and Edge */,
  scrollbarWidth: 'none' /* Firefox */,
  '&::-webkit-scrollbar': {
    /* Safari */
    WebkitAppearance: 'none',
    width: '0',
    height: '0'
  },
  '&.no-scroll-overflow-wrapper': {
    '& .code-wrapper': {
      bottom: '0',
      position: 'absolute',
      minHeight: '100%'
    }
  }
});

export const CodeWrapper = styled('div')(({ theme }) => ({
  '& pre': {
    padding: '0',
    margin: '0',
    width: '100%',
    height: '100%',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '27px',
    whiteSpace: 'pre-wrap',
    color: theme.palette.info.main,

    '&.short': {
      lineHeight: '16px'
    },
    '&.navy': {
      color: '#66a2ff'
    },
    '&.gray': {
      color: '#bdbec2'
    },
    '&.white': {
      color: '#fff'
    },

    wrapWord: 'normal',

    [theme.breakpoints.up('sm')]: {
      fontSize: '13.5px',
      lineHeight: '26px'
    }
  }
}));
