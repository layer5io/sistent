import React from 'react';
import { Checkbox, Grid, List, ListItem, Typography } from '../../../base';
import { KubernetesIcon, LeftArrowIcon, RightArrowIcon, SMPIcon } from '../../../icons';
import Tooltip from '../../../patches/Tooltip';
import {
  ButtonGrid,
  ListGrid,
  ListHeading,
  StyledChip,
  StyledPaper,
  TransferButton
} from './style';

export const TRANSFER_COMPONET = {
  CHIP: 'chip',
  OTHER: 'other'
};

export interface TransferListProps {
  name: string;
  assignableData: ListItemType[];
  assignedData: (data: ListItemType[]) => void;
  originalAssignedData: ListItemType[];
  emptyStateIconLeft: JSX.Element;
  emtyStateMessageLeft: string;
  emptyStateIconRight: JSX.Element;
  emtyStateMessageRight: string;
  transferComponentType: string;
}

interface ListItemType {
  id: number;
  name: string;
}

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((value: T) => b.indexOf(value) === -1);
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value: T) => b.indexOf(value) !== -1);
}

/**
 * Renders transfer component.
 *
 * @param {Object} props - The component props.
 * @param {String} props.name - This is the name of the data list.
 * @param {Array} props.assignableData - The assignable data list.
 * @param {Function} props.assignedData - The callback function to transfer assigned data list.
 * @param {Array} props.originalAssignedData - The already assigend data list.
 * @param {Element} props.emptyStateIconLeft - Icon for empty state of list left.
 * @param {String} props.emtyStateMessageLeft - Message for the empty state of the list left.
 * @param {Element} props.emptyStateIconRight - Icon for empty state of list right.
 * @param {String} props.emtyStateMessageRight - Message for the empty state of the list right.
 * @param {String} props.transferComponentType - Type of the component transfer (There is two types: chip and other).
 */

function TransferList({
  name,
  assignableData,
  assignedData,
  originalAssignedData,
  emptyStateIconLeft,
  emtyStateMessageLeft,
  emptyStateIconRight,
  emtyStateMessageRight,
  transferComponentType = TRANSFER_COMPONET.OTHER
}: TransferListProps): JSX.Element {
  const [checked, setChecked] = React.useState<ListItemType[]>([]);
  const [left, setLeft] = React.useState<ListItemType[]>([]);
  const [right, setRight] = React.useState<ListItemType[]>(originalAssignedData);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  React.useEffect(() => {
    assignedData(right);
    const idsToRemove = new Set(right.map((item: { id: number }) => item.id));
    const filteredLeft = assignableData.filter((item) => !idsToRemove.has(item.id));
    setLeft(filteredLeft);
  }, [right, assignableData, assignedData]);

  const handleToggle = (value: ListItemType) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (
    items: ListItemType[],
    emptyStateIcon: JSX.Element,
    emtyStateMessage: string
  ) => (
    <StyledPaper>
      <List dense component="div" role="list">
        {items.length > 0 ? (
          items.map((item) => {
            const labelId = `transfer-list-item-${item.name}-label`;
            return (
              <ListItem
                key={item.id}
                role="listitem"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  '&:hover': {
                    backgroundColor: `#00000010`
                  }
                }}
                onClick={handleToggle(item)}
              >
                {transferComponentType === TRANSFER_COMPONET.CHIP ? (
                  <Tooltip title={item.name} placement="top">
                    <StyledChip
                      sx={{ paddingY: '10px' }}
                      variant="outlined"
                      label={item.name}
                      onDelete={() => {}}
                      deleteIcon={<SMPIcon />}
                      icon={<KubernetesIcon />}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={item.name} placement="top">
                    <Typography sx={{ maxWidth: '230px', height: '1.5rem', overflow: 'hidden' }}>
                      {item.name}
                    </Typography>
                  </Tooltip>
                )}
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItem>
            );
          })
        ) : (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '264px'
            }}
          >
            {emptyStateIcon}
            <Typography sx={{ color: '#979797', px: 5, py: 2, lineHeight: 1 }}>
              {emtyStateMessage}
            </Typography>
          </div>
        )}
      </List>
    </StyledPaper>
  );

  return (
    <Grid container justifyContent="center" alignItems="center">
      <ListGrid>
        <ListHeading>
          Available {name} ({left.length})
        </ListHeading>
        {customList(left, emptyStateIconLeft, emtyStateMessageLeft)}
      </ListGrid>
      <ButtonGrid>
        <Grid container direction="column" alignItems="center">
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            <RightArrowIcon width={18} height={18} />
            <RightArrowIcon style={{ position: 'absolute', left: '27px' }} width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <RightArrowIcon width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <LeftArrowIcon width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            <LeftArrowIcon width={18} height={18} />
            <LeftArrowIcon style={{ position: 'absolute', left: '27px' }} width={18} height={18} />
          </TransferButton>
        </Grid>
      </ButtonGrid>
      <ListGrid>
        <ListHeading>
          Assigned {name} ({right.length})
        </ListHeading>
        {customList(right, emptyStateIconRight, emtyStateMessageRight)}
      </ListGrid>
    </Grid>
  );
}

export default TransferList;
