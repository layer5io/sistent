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
          // MUI replaced `primaryTypographyProps` with the `primary` slot, and
          // Typography no longer takes system props outside `sx`.
          slotProps={{
            primary: {
              variant: 'h6',
              sx: {
                fontWeight: 'bold',
                fontFamily: 'inherit'
              }
            }
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
            // MUI replaced `primaryTypographyProps` with the `primary` slot, and
            // Typography no longer takes system props outside `sx`.
            slotProps={{
              primary: {
                sx: {
                  fontFamily: 'inherit'
                }
              }
            }}
            primary={emptyState}
          />
        )}
      </Collapse>
    </SideContainer>
  );
};

export default CollapsibleSection;
