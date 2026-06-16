import React from 'react';

export const StyleID = 'lifecycle-icon-keyframes';

export const keyframesCSS = `
@keyframes lc-gear-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes lc-gear-spin-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
.lifecycle-icon-go .lifecycle-gear-large {
  animation: lc-gear-spin 1.8s linear 1;
}
.lifecycle-icon-go .lifecycle-gear-small-tr {
  animation: lc-gear-spin-ccw 1.8s linear 1;
}
`;

export const GearStyle: React.CSSProperties = {
  transformBox: 'fill-box',
  transformOrigin: 'center'
};

export function injectKeyframes(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(StyleID)) return;
  const style = document.createElement('style');
  style.id = StyleID;
  style.textContent = keyframesCSS;
  document.head.appendChild(style);
}
