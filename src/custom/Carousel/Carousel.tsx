import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { ReactNode, useRef } from 'react';
import { CarouselButton, CarouselContainer, CarouselWrapper } from './style';

interface CarouselProps {
  items: ReactNode[];
  title?: string;
  scrollAmount?: number;
  showNavButtons?: boolean;
  itemClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  scrollAmount = 300,
  showNavButtons = true,
  itemClassName = 'carousel-item'
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  if (!items.length) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <CarouselWrapper>
      {showNavButtons && (
        <CarouselButton onClick={() => scroll('left')}>
          <ChevronLeft />
        </CarouselButton>
      )}
      <CarouselContainer ref={carouselRef}>
        {items.map((item, index) => (
          <div key={`carousel-item-${index}`} className={itemClassName}>
            {item}
          </div>
        ))}
      </CarouselContainer>
      {showNavButtons && (
        <CarouselButton onClick={() => scroll('right')}>
          <ChevronRight />
        </CarouselButton>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
