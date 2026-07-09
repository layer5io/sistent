import React, { useEffect, useState } from 'react';
import { Dialog } from '../../base';
import { DesignIcon, MesheryFilterIcon } from '../../icons';
import { sanitizeCatalogImageUrl } from './Helper';

interface CatalogCardDesignLogoProps {
  zoomEffect?: boolean;
  imgURL?: string[];
  type: { type: string };
  width: string;
  height: string;
  style?: React.CSSProperties;
}
const SvgComponent: React.FC<{
  type: { type: string };
  width: string;
  height: string;
  style?: React.CSSProperties;
}> = ({ type, width, height, style }) => {
  return type.type === 'filter' ? (
    <MesheryFilterIcon width={width} height={height} style={style} />
  ) : (
    <DesignIcon width={width} height={height} style={style} />
  );
};

const CatalogCardDesignLogo: React.FC<CatalogCardDesignLogoProps> = ({
  zoomEffect = false,
  imgURL,
  type,
  width,
  height,
  style = {}
}) => {
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Guard against legacy/malformed snapshot URLs (e.g. stray '%' delimiters or
  // non-absolute values) so we never issue a broken request against the app
  // origin — fall back to the placeholder icon instead.
  const resolvedSrc = sanitizeCatalogImageUrl(imgURL?.[0]);

  // Reset the error state when the resolved source changes so a new, valid
  // snapshot isn't hidden by a previous image's load failure.
  useEffect(() => {
    setImgError(false);
  }, [resolvedSrc]);

  const handleZoomClick = () => {
    if (zoomEffect) {
      setIsZoomed(true);
    }
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      {resolvedSrc && !imgError ? (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img
            src={resolvedSrc}
            alt="Design SnapShot"
            loading="lazy"
            onClick={handleZoomClick}
            onError={() => setImgError(true)}
            style={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Dialog
            open={isZoomed}
            onClose={handleZoomClose}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}
            PaperProps={{
              style: {
                background: 'transparent',
                boxShadow: 'none',
                overflow: 'hidden',
                maxWidth: '60vw'
              }
            }}
          >
            <img
              src={resolvedSrc}
              alt="Zoomed Design SnapShot"
              style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
            />
          </Dialog>
        </div>
      ) : (
        <SvgComponent type={type} width={width} height={height} style={style} />
      )}
    </>
  );
};

export default CatalogCardDesignLogo;
