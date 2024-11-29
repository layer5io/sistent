/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemText } from '../../base';
import { InfoTooltip } from '../CustomTooltip';
import { SideContainer, SideTitleButton } from './style';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyState: string;
  tooltip: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  items,
  renderItem,
  emptyState,
  tooltip
}) => {
  return (
    <SideContainer>
      <SideTitleButton onClick={onToggle}>
        <ListItemText
          primaryTypographyProps={{
            variant: 'h6',
            fontWeight: 'bold',
            fontFamily: 'inherit'
          }}
          primary={title}
        />
        <InfoTooltip helpText={tooltip} />
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </SideTitleButton>
      <Collapse
        sx={{ width: '100%', fontFamily: 'inherit' }}
        in={isOpen}
        timeout="auto"
        unmountOnExit
      >
        {items && items.length > 0 ? (
          <List component="div" sx={{ width: '100%', padding: '0.5rem' }} disablePadding>
            {items?.map(renderItem)}
          </List>
        ) : (
          <ListItemText
            sx={{
              textAlign: 'center',
              opacity: 0.8,
              padding: '7px'
            }}
            primaryTypographyProps={{
              fontFamily: 'inherit'
            }}
            primary={emptyState}
          />
        )}
      </Collapse>
    </SideContainer>
  );
};

export default CollapsibleSection;
