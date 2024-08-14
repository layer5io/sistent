import React, { useState } from 'react';
import { Dialog } from '../../base';

interface ImageComponentProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: undefined | 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  sizes?: string;
  srcSet?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const CustomImage: React.FC<ImageComponentProps> = ({ src, alt, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomClick = () => {
    setIsZoomed(true);
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={handleZoomClick}
        {...props}
        style={{
          cursor: 'pointer',
          maxWidth: '100%',
          height: 'auto',
          ...props.style
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
            overflow: 'auto',
            maxWidth: '100%'
          }
        }}
      >
        <img
          src={src}
          alt={alt}
          onClick={handleZoomClose}
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </Dialog>
    </>
  );
};

export default CustomImage;
