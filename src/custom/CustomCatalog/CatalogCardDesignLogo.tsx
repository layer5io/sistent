import React, { useState } from 'react';
import { Dialog } from '../../base';
import { DesignIcon, MesheryFilterIcon } from '../../icons';

interface CatalogCardDesignLogoProps {
  zoomEffect?: boolean;
  imgURL?: string[];
  type: { type: string };
  width: string;
  height: string;
  style?: React.CSSProperties;
}

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

  const handleZoomClick = () => {
    if (zoomEffect) {
      setIsZoomed(true);
    }
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  const renderSvg =
    type.type === 'filter' ? (
      <MesheryFilterIcon width={width} height={height} style={style} />
    ) : (
      <DesignIcon width={width} height={height} style={style} />
    );

  return (
    <>
      {imgURL && imgURL.length > 0 ? (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {!imgError ? (
            <>
              <img
                src={imgURL[0]}
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
                  src={imgURL[0]}
                  alt="Zoomed Design SnapShot"
                  style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                />
              </Dialog>
            </>
          ) : (
            renderSvg
          )}
        </div>
      ) : (
        renderSvg
      )}
    </>
  );
};

export default CatalogCardDesignLogo;
