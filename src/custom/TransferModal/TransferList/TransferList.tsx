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
  assignablePage: () => void;
  assignedPage: () => void;
  originalLeftCount: number;
  originalRightCount: number;
  rightPermission: boolean;
  leftPermission: boolean;
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
 * @param {Boolean} props.leftPermission - Permission to move data from left to right.
 * @param {Boolean} props.rightPermission - Permission to move data from right to left.
 */

function TransferList({
  name,
  assignableData,
  assignedData,
  assignablePage,
  assignedPage,
  originalAssignedData,
  emptyStateIconLeft,
  emtyStateMessageLeft,
  emptyStateIconRight,
  emtyStateMessageRight,
  originalLeftCount,
  originalRightCount,
  leftPermission = true,
  rightPermission = true,
  transferComponentType = TRANSFER_COMPONET.OTHER
}: TransferListProps): JSX.Element {
  const [checked, setChecked] = React.useState<ListItemType[]>([]);
  const [left, setLeft] = React.useState<ListItemType[]>([]);
  const [right, setRight] = React.useState<ListItemType[]>(originalAssignedData);
  const [leftCount, setLeftCount] = React.useState<number>(0);
  const [rightCount, setRightCount] = React.useState<number>(0);

  React.useEffect(() => {
    setRight(originalAssignedData);
  }, [originalAssignedData]);

  React.useEffect(() => {
    setLeft(assignableData);
  }, [assignableData]);

  React.useEffect(() => {
    setLeftCount(originalLeftCount);
    setRightCount(originalRightCount);
  }, [originalLeftCount, originalRightCount]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  React.useEffect(() => {
    assignedData(right);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [right]);

  React.useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        assignablePage();
      }
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 1 });
    const sentinel = document.getElementById('leftList');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignableData]);

  React.useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        assignedPage();
      }
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 1 });
    const sentinel = document.getElementById('rightList');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalAssignedData]);

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
    setLeftCount(0);
    setRightCount((prevRightCount: number) => prevRightCount + leftCount);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setLeftCount((prevLeftCount: number) => prevLeftCount - leftChecked.length);
    setRightCount((prevRightCount: number) => prevRightCount + leftChecked.length);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setRightCount((prevRightCount: number) => prevRightCount - rightChecked.length);
    setLeftCount((prevLeftCount: number) => prevLeftCount + rightChecked.length);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setRightCount(0);
    setLeftCount((prevLeftCount: number) => prevLeftCount + rightCount);
  };

  const customList = (
    items: ListItemType[],
    emptyStateIcon: JSX.Element,
    emtyStateMessage: string,
    listId?: string
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
      <div id={listId}></div>
    </StyledPaper>
  );

  return (
    <Grid container justifyContent="center" alignItems="center">
      <ListGrid>
        <ListHeading>
          Available {name} ({left.length})
        </ListHeading>
        {customList(left, emptyStateIconLeft, emtyStateMessageLeft, 'leftList')}
      </ListGrid>
      <ButtonGrid>
        <Grid container direction="column" alignItems="center">
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={
              !rightPermission ||
              (rightPermission && (left?.length === 0 || left.length < leftCount))
            }
            aria-label="move all right"
          >
            <RightArrowIcon width={18} height={18} />
            <RightArrowIcon style={{ position: 'absolute', left: '27px' }} width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={!rightPermission || (rightPermission && leftChecked.length === 0)}
            aria-label="move selected right"
          >
            <RightArrowIcon width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={!leftPermission || (leftPermission && rightChecked.length === 0)}
            aria-label="move selected left"
          >
            <LeftArrowIcon width={18} height={18} />
          </TransferButton>
          <TransferButton
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={
              !leftPermission ||
              (leftPermission && (right?.length === 0 || right.length < rightCount))
            }
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
        {customList(right, emptyStateIconRight, emtyStateMessageRight, 'rightList')}
      </ListGrid>
    </Grid>
  );
}

export default TransferList;
