import { styled } from '@mui/material';

export const TOCWrapper = styled('div')(({ theme }) => ({
  '.chapter-back': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      display: 'inline-flex',
      '& svg': {
        alignSelf: 'center',
        fontSize: '1.5rem',
        color: theme.palette.grey[600],
        width: '100%',
        maxWidth: '1.5rem'
      },
      '& h4': {
        fontWeight: 500,
        textTransform: 'capitalize',
        fontSize: '1.25rem'
      },
      '&:hover': {
        '& svg, & h4': {
          color: theme.palette.text.primary
        }
      }
    },
    '.toc-toggle-btn': {
      display: 'none'
    },
    '.toc-menu-icon': {
      width: '1.5rem',
      height: '1.5rem',
      cursor: 'pointer',
      fill: theme.palette.secondary.main,
      transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
    }
  },
  '.toc-list': {
    '& ul': {
      position: 'relative',
      paddingInlineStart: '2.65rem',
      MozPaddingStart: '2.65rem',
      '&::after': {
        position: 'absolute',
        inset: '1rem auto 1rem 1.7rem',
        width: 'auto',
        height: 'auto',
        borderLeft: `1px solid rgba(177, 182, 184, 0.25)`,
        content: '""',
        zIndex: 0
      },
      '& li': {
        width: 'fit-content',
        margin: '1rem 0',
        '&::marker': {
          color: 'rgba(177, 182, 184, 0.75)'
        },
        '& p': {
          margin: 0,
          fontSize: '1rem',
          '& a': {
            color: theme.palette.mode === 'light' ? 'rgb(0 0 0 / 0.65)' : 'rgb(255 255 255 / 0.65)',
            transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }
        },
        '&:hover': {
          '&::marker, & p, & a': {
            color: theme.palette.background.brand?.default
          }
        }
      },
      '.active-link': {
        '&::marker, & p, & a': {
          color: theme.palette.background.brand?.default
        }
      }
    }
  }
}));
