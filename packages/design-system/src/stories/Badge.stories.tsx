import { Badge, Stack, Switch } from '@layer5/sistent-components/src';
import React from 'react';
import { AddIcon } from '@layer5/sistent-svg/src'; //can anyone suggest a diff icon here?

export default {
  title: 'Example/Badge',
  component: Badge,
  tags: ['autodocs']
};

export function Basic() {
  return (
    <Badge badgeContent={4} color="primary">
      <AddIcon />
    </Badge>
  );
}

export function Colored() {
  return (
    <Stack direction="row" spacing={2}>
      <Badge badgeContent={4} color="secondary">
        <AddIcon />
      </Badge>
      <Badge badgeContent={4} color="success">
        <AddIcon />
      </Badge>
    </Stack>
  );
}

export function BadgeVisibility() {
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Badge color="secondary" variant="dot" invisible={invisible}>
        <AddIcon />
      </Badge>
      <Switch checked={!invisible} onChange={handleBadgeVisibility} />
    </Stack>
  );
}

export function MaximumValue() {
  return (
    <Badge color="error" badgeContent={1000} max={999}>
      <AddIcon />
    </Badge>
  );
}

export function Dot() {
  return (
    <Badge color="error" variant="dot">
      <AddIcon />
    </Badge>
  );
}

export function Alignment() {
  return (
    <Stack direction="row" spacing={3}>
      <Badge color="error" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <AddIcon />
      </Badge>
      <Badge color="error" variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <AddIcon />
      </Badge>
      <Badge color="error" variant="dot" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <AddIcon />
      </Badge>
      <Badge color="error" variant="dot" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <AddIcon />
      </Badge>
    </Stack>
  );
}
