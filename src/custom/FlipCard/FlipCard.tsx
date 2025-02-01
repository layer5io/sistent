import { styled } from '@mui/material';
import React from 'react';
import { BUTTON_MODAL_DARK, WHITE } from '../../theme/colors/colors';

export type FlipCardProps = {
  duration?: number;
  onClick?: () => void;
  onShow?: () => void;
  children: [React.ReactNode, React.ReactNode];
  disableFlip?: boolean;
  padding?: string;
};

/**
 * Helper function to get the front or back child component from the children array
 * @param children Array containing exactly two child components
 * @param key Index to retrieve (0 for front, 1 for back)
 * @throws Error if children is undefined or doesn't contain exactly two components
 * @returns The selected child component
 */
function GetChild(children: [React.ReactNode, React.ReactNode], key: number) {
  if (!children) throw Error('FlipCard requires exactly two child components');
  if (children.length != 2) throw Error('FlipCard requires exactly two child components');

  return children[key];
}

const Card = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'transparent',
  perspective: theme.spacing(125)
}));

const InnerCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  transformStyle: 'preserve-3d',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  backgroundColor: theme.palette.mode === 'dark' ? BUTTON_MODAL_DARK : WHITE,
  cursor: 'pointer',
  transformOrigin: '50% 50% 10%'
}));

const FrontContent = styled('div')({
  backfaceVisibility: 'hidden'
});

const BackContent = styled('div')({
  backfaceVisibility: 'hidden',
  transform: 'scale(-1, 1)',
  wordBreak: 'break-word'
});

/**
 * A card component that provides a flipping animation between two content faces
 *
 * @component
 * @param props.duration - Animation duration in milliseconds (default: 500)
 * @param props.onClick - Callback function triggered on card click
 * @param props.onShow - Additional callback function triggered when card shows new face
 * @param props.children - Array of exactly two child components (front and back)
 * @param props.disableFlip - When true, prevents the card from flipping (default: false)
 *
 * @example
 * ```tsx
 * <FlipCard>
 *   <div>Front Content</div>
 *   <div>Back Content</div>
 * </FlipCard>
 * ```
 */
export function FlipCard({
  duration = 500,
  onClick,
  onShow,
  children,
  disableFlip = false,
  padding
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const [activeBack, setActiveBack] = React.useState(false);

  const timeout = React.useRef<null | NodeJS.Timeout>(null);

  const Front = GetChild(children, 0);
  const Back = GetChild(children, 1);

  React.useEffect(() => {
    // This function makes sure that the inner content of the card disappears roughly
    // after 30 deg rotation has already occured. It will ensure that the user doesn't gets
    // a "blank" card while the card is rotating
    //
    // This guarantee can be offered because of two main reasons:
    // 1. In sufficiently modern browsers JS and CSS are handled in different threads
    // hence ones execution doesn't blocks another.
    // 2. setTimeout will put its callback at the end of current context's end hence ensuring
    // this callback doesn't gets blocked by another JS process.

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setActiveBack(flipped);
    }, duration / 6);
  }, [flipped, duration]);

  return (
    <Card
      onClick={() => {
        if (disableFlip) return;
        setFlipped((flipped) => !flipped);
        onClick && onClick();
        onShow && onShow();
      }}
    >
      <InnerCard
        style={{
          transform: flipped ? 'scale(-1,1)' : undefined,
          transition: `transform ${duration}ms`,
          padding: padding
        }}
      >
        {!activeBack ? (
          <FrontContent>{React.isValidElement(Front) ? Front : null}</FrontContent>
        ) : (
          <BackContent>{React.isValidElement(Back) ? Back : null}</BackContent>
        )}
      </InnerCard>
    </Card>
  );
}
