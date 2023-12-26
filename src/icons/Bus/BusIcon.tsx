import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../constants/constants';
import { IconProps } from '../types';

export const BusIcon = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 64"
      data-testid="bus-icon-svg"
      {...props}
    >
      <path d="M39.178 40.59a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Z" />
      <path d="M39.178 40.59a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Zm-18.98-17.12v11.303m-5.762 5.762a5.762 5.762 0 1 1 11.524 0 5.762 5.762 0 0 1-11.524 0Z" />
      <path d="M14.436 40.535a5.762 5.762 0 1 1 11.524 0 5.762 5.762 0 0 1-11.524 0Zm30.503-16.599V34.83m7.578-27.206a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Z" />
      <path d="M52.517 7.624a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Zm5.761 5.762v10.563M28.935 7.397a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Z" />
      <path d="M28.935 7.397a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Zm5.762 5.761v10.563M5.825 7.17a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Z" />
      <path d="M5.825 7.17a5.762 5.762 0 1 1 11.523 0 5.762 5.762 0 0 1-11.523 0Zm5.762 5.761v10.563M0 23.942h69.55" />
    </svg>
  );
};

export default BusIcon;
