import React from 'react';

export const keyframesCSS = `
@keyframes config-wrench-shake {
  0%   { transform: rotate(-20deg); }
  20%  { transform: rotate(20deg); }
  40%  { transform: rotate(-15deg); }
  55%  { transform: rotate(15deg); }
  65%  { transform: rotate(-8deg); }
  75%  { transform: rotate(8deg); }
  80%, 100% { transform: rotate(0deg); }
}
.configuration-icon-go .configuration-icon-path1 {
  animation: config-wrench-shake 2s ease-in-out 1;
}
`;

export const PathStyle: React.CSSProperties = {
  transformBox: 'fill-box',
  transformOrigin: 'center',
};
