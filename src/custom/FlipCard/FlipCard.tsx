import { styled } from '@mui/material';
import React from 'react';
import { BUTTON_MODAL_DARK, WHITE } from '../../theme/colors/colors';

export type FlipCardProps = {
  duration?: number;
  disableFlip?: boolean;
  frontElement: React.ReactNode;
  backElement: React.ReactNode;
  flipAction?: 'hover' | 'click';
};


const Card = styled('div')({
  height: '100%',
  width: '100%',
  perspective: '1000px',
});

const InnerCard = styled('div', {
  // Prevent 'flipped' prop from leaking to the DOM element
  shouldForwardProp: (prop) => prop !== 'flipped',
})<{ flipped: boolean }>(({ flipped }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FrontContent = styled('div')({
  position: 'absolute',
  height: '100%',
  width: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BackContent = styled('div')({
  position: 'absolute',
  height: '100%',
  width: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotateY(180deg)',
});

/**
 * A card component that provides a flipping animation between two content faces
 *
 * @component
 * @param props.duration - Animation duration in milliseconds (default: 500)
 * @param props.flipAction - The action that triggers the flip animation ('hover' or 'click') (default: 'click')
 * @param props.frontElement - React node to be displayed on the front face of the card
 * @param props.backElement - React node to be displayed on the back face of the card
 * @param props.disableFlip - When true, prevents the card from flipping (default: false)
 *
 * @example
 * ```tsx
 * <FlipCard 
 * frontElement={<div>Front Content</div>} 
 * backElement={<div>Back Content</div>} 
 * flipAction="hover"
 * />
 * ```
 */
export function FlipCard({
  duration = 500,
  frontElement,
  backElement,
  disableFlip = false,
  flipAction = 'click'
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  
  const handleFlip = () => {
    if (!disableFlip) setFlipped((prev) => !prev);
  };

  // Determine triggers
  const triggerProps = flipAction === 'click' 
    ? { 
        onClick: handleFlip,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        },
        role: 'button',
        tabIndex: 0,
        'aria-pressed': flipped
      } 
    : { 
        onMouseEnter: () => !disableFlip && setFlipped(true), 
        onMouseLeave: () => !disableFlip && setFlipped(false) 
      };


  return (
    <Card {...triggerProps}>
      <InnerCard
        flipped={flipped}
        style={{
          transition: `transform ${duration}ms`
        }}
      >
          <FrontContent>{frontElement}</FrontContent>
        
          <BackContent>{backElement}</BackContent>
        
      </InnerCard>
    </Card>
  );
}
