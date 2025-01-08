import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { iconMedium } from '../../constants/iconsSizes';
import { useTheme } from '../../theme';

interface ExpandArrowProps {
  expanded: boolean;
}

const ExpandArrow: React.FC<ExpandArrowProps> = ({ expanded }) => {
  const theme = useTheme();
  return expanded ? (
    <ExpandLessIcon fill={theme.palette.icon.default} {...iconMedium} />
  ) : (
    <ExpandMoreIcon fill={theme.palette.icon.default} {...iconMedium} />
  );
};

export default ExpandArrow;
