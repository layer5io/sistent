import { act, renderHook } from '@testing-library/react';
import { useWindowDimensions } from '../custom/Helpers/Dimension/windowSize';

describe('useWindowDimensions (client)', () => {
  it('reads the real window dimensions after mount', () => {
    const { result } = renderHook(() => useWindowDimensions());
    // The mount effect syncs state to the live window size (jsdom default).
    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  it('updates (debounced) on window resize', () => {
    jest.useFakeTimers();
    try {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        (window as unknown as { innerWidth: number }).innerWidth = 480;
        (window as unknown as { innerHeight: number }).innerHeight = 640;
        window.dispatchEvent(new Event('resize'));
        // Resize handling is debounced by 500ms.
        jest.advanceTimersByTime(500);
      });

      expect(result.current).toEqual({ width: 480, height: 640 });
    } finally {
      jest.useRealTimers();
    }
  });
});
