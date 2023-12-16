import React from 'react';

/**
 * Wrapper component for flip cards.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.frontComponents - The components of the card front.
 * @param {string} props.backComponents - The components of the card back.
 * @param {Boolean} props.disableFlip - The card can be flip or not.
 *
 */

export interface FlipCardProps {
  frontComponents: JSX.Element;
  backComponents?: JSX.Element;
  disableFlip?: boolean;
}

function FlipCard({ frontComponents, backComponents, disableFlip }: FlipCardProps): JSX.Element {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => {
    if (!disableFlip) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <>
      <div
        style={{
          background: 'transparent',
          perspective: '1000px'
        }}
      >
        <div
          onClick={handleFlip}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              width: '100%',
              height: 'fit-content',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {frontComponents}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          >
            {backComponents}
          </div>
        </div>
      </div>
    </>
  );
}

export default FlipCard;
