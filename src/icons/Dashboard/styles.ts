import React from 'react';

export const StyleID = 'dashboard-icon-keyframes';

export const keyframesCSS = `
@keyframes dashboard-icon-tl-to-br {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(var(--di-tx), var(--di-ty)); }
  100% { transform: translate(0, 0); }
}
@keyframes dashboard-icon-br-to-tl {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(var(--di-ntx), var(--di-nty)); }
  100% { transform: translate(0, 0); }
}
@keyframes dashboard-icon-tr-to-bl {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(var(--di-ntx), var(--di-ty)); }
  100% { transform: translate(0, 0); }
}
@keyframes dashboard-icon-bl-to-tr {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(var(--di-tx), var(--di-nty)); }
  100% { transform: translate(0, 0); }
}
.dashboard-icon-go .dashboard-icon-tl {
  animation: dashboard-icon-tl-to-br 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.dashboard-icon-go .dashboard-icon-br {
  animation: dashboard-icon-br-to-tl 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.dashboard-icon-go .dashboard-icon-tr {
  animation: dashboard-icon-tr-to-bl 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.08s forwards;
}
.dashboard-icon-go .dashboard-icon-bl {
  animation: dashboard-icon-bl-to-tr 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.08s forwards;
}
`;

export const PathStyle: React.CSSProperties = {
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
