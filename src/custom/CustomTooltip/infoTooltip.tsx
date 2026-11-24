import { iconSmall } from '../../constants/iconsSizes';
import InfoOutlinedIcon from '../../icons/InfoOutlined/InfoOutlined';
import CustomTooltip, { CustomTooltipProps } from './customTooltip';

type InfoTooltipProps = {
  helpText: string | React.ReactNode | JSX.Element;
  style?: React.CSSProperties;
  'aria-label'?: string;
} & Omit<CustomTooltipProps, 'title' | 'children'>;

const InfoTooltip = ({
  helpText,
  style = {},
  'aria-label': ariaLabel,
  ...props
}: InfoTooltipProps) => {
  const accessibleName =
    ariaLabel || (typeof helpText === 'string' ? helpText : 'More information');

  return (
    <CustomTooltip title={helpText} {...props}>
      <button
        type="button"
        aria-label={accessibleName}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'help',
          ...style
        }}
      >
        <InfoOutlinedIcon {...iconSmall} />
      </button>
    </CustomTooltip>
  );
};

export default InfoTooltip;
