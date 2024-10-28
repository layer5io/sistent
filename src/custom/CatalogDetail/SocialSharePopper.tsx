import { Fade } from '@mui/material';
import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { ClickAwayListener, IconButton, Paper, Popper, Tooltip } from '../../base';
import { ChainIcon, FacebookIcon, LinkedinIcon, ShareIcon, TwitterIcon } from '../../icons';
import { useTheme } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { CopyShareIconWrapper, VisibilityChip } from './style';

interface SocialSharePopperProps {
  details: Pattern;
  type: string;
  cardId: string;
  handleClick: (event: React.MouseEvent) => void;
  title: string;
  id: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  getUrl: (type: string, id: string) => string;
  handleCopyUrl: (type: string, name: string, id: string) => void;
}

const SocialSharePopper: React.FC<SocialSharePopperProps> = ({
  details,
  type,
  cardId,
  handleClick,
  title,
  id,
  anchorEl,
  handleClose,
  getUrl,
  handleCopyUrl
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const theme = useTheme();
  return (
    <CopyShareIconWrapper style={{ marginBottom: '2rem' }}>
      <VisibilityChip
        style={{
          color: theme.palette.text.default
        }}
      >
        {details?.visibility}
      </VisibilityChip>
      {details?.visibility !== 'private' && (
        <Tooltip title="Copy Link" placement="top" arrow>
          <IconButton
            sx={{ borderRadius: '0.1rem', padding: '0.5rem' }}
            onClick={() => handleCopyUrl(cleanedType, details?.name, details?.id)}
          >
            <ChainIcon height={'24'} width={'24'} />
          </IconButton>
        </Tooltip>
      )}
      {(details?.visibility === 'published' || details?.visibility === 'public') && (
        <>
          <Tooltip title={title} placement="top" arrow>
            <IconButton sx={{ borderRadius: '0.1rem', padding: '0.5rem' }} onClick={handleClick}>
              <ShareIcon height={24} width={22} />
            </IconButton>
          </Tooltip>
          <Popper id={id} open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={handleClose}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
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
                  </Paper>
                </Fade>
              </ClickAwayListener>
            )}
          </Popper>
        </>
      )}
    </CopyShareIconWrapper>
  );
};

export default SocialSharePopper;
