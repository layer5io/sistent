import React from 'react';

export const StyleID = 'extension-icon-keyframes';

export const keyframesCSS = `
@keyframes ext-main-join {
  0%   { transform: translate(-12px, 12px); }
  50%  { transform: translate(0, 0); }
  100% { transform: translate(-12px, 12px); }
}
@keyframes ext-detail-join {
  0%   { transform: translate(18px, -18px); }
  50%  { transform: translate(0, 0); }
  100% { transform: translate(18px, -18px); }
}
.extension-icon-go .extension-g-main {
  animation: ext-main-join 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.extension-icon-go .extension-g-detail {
  animation: ext-detail-join 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
`;

export const MainGroupStyle: React.CSSProperties = {
  transform: 'translate(-12px, 12px)'
};

export const DetailGroupStyle: React.CSSProperties = {
  transform: 'translate(18px, -18px)'
};

export function injectKeyframes(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(StyleID)) return;
  const style = document.createElement('style');
  style.id = StyleID;
  style.textContent = keyframesCSS;
  document.head.appendChild(style);
}
