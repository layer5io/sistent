/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMediaQuery } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { LeftArrowIcon, RightArrowIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CarouselContainer, CarouselItem, CarouselTrack, LeftButton, RightButton } from './style';

export interface CarouselProps {
  className?: string;
  itemClassName?: string;
  data?: any[];
  itemPerRow?: 4 | 5;
  cardProps?: any;
  Card: FC<any>;
}

const Carousel: FC<CarouselProps> = ({
  className = '',
  itemClassName = '',
  data = [],
  itemPerRow = 5,
  Card,
  cardProps
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));

  useEffect(() => {
    if (isXs) return setNumberOfItems(1);
    if (isSm) return setNumberOfItems(itemPerRow - 3);
    if (isMd) return setNumberOfItems(itemPerRow - 2);
    if (isLg) return setNumberOfItems(itemPerRow - 1);
    setNumberOfItems(itemPerRow);
  }, [itemPerRow, isXs, isSm, isMd, isLg]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
    },
    onSwipedRight: () => {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    },
    trackMouse: true
  });

  const renderCard = (item: any) => {
    return <Card {...item} {...cardProps} />;
  };

  if (!numberOfItems) return null;

  return (
    <div className={className}>
      <CarouselContainer {...handlers}>
        <CarouselTrack transform={`translateX(-${currentIndex * 100}%)`}>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className={itemClassName}
              width={`calc(100% / ${numberOfItems})`}
            >
              {renderCard(item)}
            </CarouselItem>
          ))}
        </CarouselTrack>

        {currentIndex > 0 && (
          <LeftButton onClick={() => setCurrentIndex(currentIndex - 1)}>
            <LeftArrowIcon />
          </LeftButton>
        )}

        {data.length > currentIndex + numberOfItems && (
          <RightButton onClick={() => setCurrentIndex(currentIndex + 1)}>
            <RightArrowIcon />
          </RightButton>
        )}
      </CarouselContainer>
    </div>
  );
};

export default Carousel;
