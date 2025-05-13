import React, { useState } from 'react';
import { Dialog } from '../../base';
import { styled } from '../../theme';

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
  caption?: string;
  align?: 'left' | 'center' | 'right';
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}
interface AlignProps {
  align: 'left' | 'center' | 'right';
}
const Figure = styled('figure')<AlignProps>(({ align }) => ({
  margin: '1rem 0',
  textAlign: align,
  width: '100%',
}));
const FigCaption = styled('figcaption')<AlignProps>(({ align }) => ({
  fontSize: '0.9rem',
  color: '#666',
  marginTop: '0.5rem',
  textAlign: align
}));

const CustomImage: React.FC<ImageComponentProps> = ({
  src,
  alt,
  caption,
  align = 'left',
  ...props
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoomClick = () => {
    setIsZoomed(true);
  };
  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <Figure align={align}>
        <img
          src={src}
          alt={alt || caption || ''}
          loading="lazy"
          onClick={handleZoomClick}
          {...props}
          style={{
            cursor: 'pointer',
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            borderRadius: '15px',
            width: '50%'
          }}
        />
        {caption && <FigCaption align={align}>{caption}</FigCaption>}
      </Figure>

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
          alt={alt || caption || ''}
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
