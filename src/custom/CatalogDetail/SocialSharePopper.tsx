import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { ChainIcon, FacebookIcon, LinkedinIcon, ShareIcon, TwitterIcon } from '../../icons';
import { useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { CustomTooltip } from '../CustomTooltip';
import { ErrorBoundary } from '../ErrorBoundary';
import { CopyShareIconWrapper, VisibilityChip } from './style';

interface SocialSharePopperProps {
  details: Pattern;
  type: string;
  cardId: string;
  title: string;
  getUrl: (type: string, id: string) => string;
  handleCopyUrl: (type: string, name: string, id: string) => void;
}

const SocialSharePopper: React.FC<SocialSharePopperProps> = ({
  details,
  type,
  cardId,
  title,
  getUrl,
  handleCopyUrl
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cleanedType = type.replace('my-', '').replace(/s$/, '');

  return (
    <ErrorBoundary>
      <CopyShareIconWrapper style={{ marginBottom: '2rem' }}>
        <VisibilityChip
          style={{
            color: theme.palette.text.default
          }}
        >
          {details?.visibility}
        </VisibilityChip>

        {details?.visibility !== 'private' && (
          <CustomTooltip title="Copy Link" placement="top" arrow>
            <IconButton
              sx={{ borderRadius: '0.1rem', padding: '0.5rem' }}
              onClick={() => handleCopyUrl(cleanedType, details?.name, details?.id)}
            >
              <ChainIcon height={'24'} width={'24'} fill={theme.palette.icon.secondary} />
            </IconButton>
          </CustomTooltip>
        )}

        {(details?.visibility === 'published' || details?.visibility === 'public') && (
          <>
            <CustomTooltip title={title} placement="top" arrow>
              <IconButton sx={{ borderRadius: '0.1rem', padding: '0.5rem' }} onClick={handleClick}>
                <ShareIcon height={24} width={22} fill={theme.palette.icon.secondary} />
              </IconButton>
            </CustomTooltip>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                sx: {
                  p: 0,
                  width: 'auto'
                }
              }}
              sx={{
                '& .MuiList-root': {
                  paddingBottom: 0
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                sx={{
                  backgroundColor: 'transparent',
                  '&:hover': { backgroundColor: 'transparent' },
                  padding: '0px',
                  cursor: 'default'
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TwitterShareButton
                    url={getUrl(cleanedType, cardId)}
                    title="Checkout this awesome design"
                    hashtags={['opensource']}
                  >
                    <TwitterIcon />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={getUrl(cleanedType, cardId)}
                    summary="Checkout this awesome design"
                  >
                    <LinkedinIcon />
                  </LinkedinShareButton>
                  <FacebookShareButton url={getUrl(cleanedType, cardId)} hashtag="#opensource">
                    <FacebookIcon />
                  </FacebookShareButton>
                </Box>
              </MenuItem>
            </Menu>
          </>
        )}
      </CopyShareIconWrapper>
    </ErrorBoundary>
  );
};

export default SocialSharePopper;
