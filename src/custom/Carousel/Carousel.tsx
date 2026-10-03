import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { CarouselButton, CarouselContainer, CarouselWrapper } from './style';

interface CarouselProps {
  items: ReactNode[];
  title?: string;
  scrollAmount?: number;
  showNavButtons?: boolean;
  itemClassName?: string;
}

const SCROLL_TOLERANCE = 1; // scrollLeft can be fractional on some displays/zoom levels

const Carousel: React.FC<CarouselProps> = ({
  items,
  scrollAmount = 300,
  showNavButtons = true,
  itemClassName = 'carousel-item'
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanScrollLeft(el.scrollLeft > SCROLL_TOLERANCE);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - SCROLL_TOLERANCE);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [updateScrollState, items.length]);

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
        <CarouselButton
          aria-label="Scroll left"
          onClick={() => scroll('left')}
          style={{ visibility: canScrollLeft ? 'visible' : 'hidden' }}
        >
          <ChevronLeft />
        </CarouselButton>
      )}
      <CarouselContainer ref={carouselRef} onScroll={updateScrollState}>
        {items.map((item, index) => (
          <div key={`carousel-item-${index}`} className={itemClassName}>
            {item}
          </div>
        ))}
      </CarouselContainer>
      {showNavButtons && (
        <CarouselButton
          aria-label="Scroll right"
          onClick={() => scroll('right')}
          style={{ visibility: canScrollRight ? 'visible' : 'hidden' }}
        >
          <ChevronRight />
        </CarouselButton>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
