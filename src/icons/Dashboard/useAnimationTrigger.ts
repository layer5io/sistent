import { RefObject, useEffect } from 'react';

export function useAnimationTrigger(
  svgRef: RefObject<SVGSVGElement | null>,
  isHoverEffect: boolean
): void {
  useEffect(() => {
    if (!isHoverEffect || !svgRef.current) return;

    const svg = svgRef.current;
    svg.classList.remove('dashboard-icon-go');

    const { width, height } = svg.getBoundingClientRect();
    svg.style.setProperty('--di-tx', `${(width * 16) / 72}px`);
    svg.style.setProperty('--di-ty', `${(height * 18) / 72}px`);
    svg.style.setProperty('--di-ntx', `${(-width * 16) / 72}px`);
    svg.style.setProperty('--di-nty', `${(-height * 18) / 72}px`);

    svg.classList.add('dashboard-icon-go');

    const lastPath = svg.querySelector('.dashboard-icon-bl');
    const handleAnimationEnd = () => {
      svg.classList.remove('dashboard-icon-go');
    };

    lastPath?.addEventListener('animationend', handleAnimationEnd, { once: true });

    return () => {
      lastPath?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isHoverEffect, svgRef]);
}
