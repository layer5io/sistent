/**
 * @file colors.ts
 * @description This file defines the color palette for the design system.
 * It provides a dictionary of commonly used colors for consistency across components.
 * @remarks These colors can be imported and used in various components.
 */

/**
 * Dictionary of commonly used colors.
 */

type ColorDictionary = Record<string, string>;

export const colors: ColorDictionary = {
  primary: '#0070f3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  caribbeanGreen: '#00D3A9',
  yellowSea: '#F0A303',
  keppelGreen: '#00B39F',
  pineGreen: '#008071',
  charcoal: '#3C494F',
  cultured: '#F6F8F8',
  white: '#ffffff',
  btnHover: '#00D3A9',
  tabmenuhover: '#607d8b',
  btnDisabled: '#b0bec5'
  //define other colors here
};

// usage example:
// import colors from './ColorDictionary';

//  const Button = styled.button`
// background-color: ${colors.primary};
