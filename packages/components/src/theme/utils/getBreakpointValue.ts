export function getBreakpointValue(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value.includes('rem')) {
    return Number(value.replace('rem', '')) * 16;
  }

  if (typeof value === 'string' && value.includes('em')) {
    return Number(value.replace('em', '')) * 16;
  }

  return Number(value);
}
