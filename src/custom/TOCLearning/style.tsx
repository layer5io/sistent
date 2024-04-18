import { styled } from '@mui/material';

export const TOCWrapper = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '10rem',
  left: 0,
  marginLeft: '-3rem',

  '.go-back': {
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      display: 'inline-flex',
      '& svg': {
        alignSelf: 'center',
        fontSize: '1.5rem',
        color: theme.palette.text.disabled,
        width: '100%',
        maxWidth: '1.5rem'
      },
      '& h4': {
        fontWeight: 500,
        textTransform: 'capitalize',
        fontSize: '1.25rem',
        whiteSpace: 'nowrap'
      },
      '&:hover': {
        '& svg, & h4': {
          color: theme.palette.text.primary
        }
      }
    }
  },

  '.toc-toggle-btn': {
    display: 'none'
  },

  '.toc-ul-open': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0rem',
    listStyle: 'none',
    height: 'auto !important',
    opacity: '1 !important',
    transition: 'all .4s !important'
  },

  '.toc-menu-icon': {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    fill: theme.palette.common.white
  },

  '.toc-sub-heading': {
    marginTop: '1rem',
    fontWeight: 500,
    fontSize: '1.15rem'
  },

  '.toc-item': {
    lineHeight: '1.5rem'
  },

  '.toc-list': {
    '& ul': {
      position: 'relative',
      paddingInlineStart: '1.5rem',
      listStyleType: 'none',
      '& li': {
        margin: '1rem 0 1rem 0.5rem',
        width: 'fit-content',
        '&::marker': {
          color: 'rgba(177, 182, 184, 0.75)'
        },
        '& p': {
          margin: 0,
          fontSize: '1rem',
          '& a': {
            color: 'rgba(0, 0, 0, 0.65)'
          }
        },
        '&:hover': {
          '&::marker, & p, & a': {
            color: theme.palette.secondary.contrastText
          }
        }
      },
      '.active-link': {
        '&::marker, & p, & a': {
          color: theme.palette.secondary.contrastText
        }
      }
    }
  },

  '@media only screen and (max-width: 991px)': {
    position: 'initial',
    marginLeft: '-0.5rem',
    width: 'auto',
    '.toc-toggle-btn': {
      display: 'flex'
    },
    '.go-back': {
      marginLeft: 0
    },
    '.toc-ul': {
      opacity: 0,
      height: 0,
      transition: 'none',
      paddingLeft: '.8rem !important'
    },
    '.toc-item': {
      lineHeight: '.8rem'
    }
  }
}));
