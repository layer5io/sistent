import React, { useEffect, useRef } from 'react';

const HUB_X = 259,
  HUB_Y = 283;
const naturalAngle = (Math.atan2(169.88 - HUB_Y, 315.28 - HUB_X) * 180) / Math.PI;
const zeroAngle = (Math.atan2(165 - HUB_Y, 103 - HUB_X) * 180) / Math.PI;
const ROT_ZERO = zeroAngle - naturalAngle;
const ROT_REST = 0;

export const needleInitialStyle: React.CSSProperties = {
  opacity: 0.8,
  transformBox: 'fill-box',
  transformOrigin: '50% 80%'
};

export function useNeedleSpring(
  needleRef: React.RefObject<SVGGElement | null>,
  isHovered: boolean
): void {
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const s = useRef({ cur: ROT_REST, vel: 0 });

  useEffect(() => {
    const el = needleRef.current;
    if (!el) return;

    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    const set = (deg: number) => {
      el.style.transform = `rotate(${deg}deg)`;
    };

    if (!isHovered) {
      s.current = { cur: ROT_REST, vel: 0 };
      set(ROT_REST);
      return;
    }

    s.current = { cur: ROT_ZERO, vel: 0 };
    set(ROT_ZERO);

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const { cur, vel } = s.current;
      const v = vel + (-32.5 * (cur - ROT_REST) - 9 * vel) * dt;
      const c = cur + v * dt;
      s.current = { cur: c, vel: v };
      set(c);
      if (Math.abs(c - ROT_REST) > 0.05 || Math.abs(v) > 0.05)
        raf.current = requestAnimationFrame(tick);
      else {
        set(ROT_REST);
        s.current = { cur: ROT_REST, vel: 0 };
        raf.current = null;
      }
    };

    timer.current = setTimeout(() => {
      lastTime = performance.now();
      raf.current = requestAnimationFrame(tick);
    }, 60);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [isHovered, needleRef]);
}
