import { Avatar, AvatarGroup, Badge, Stack } from '@layer5/sistent-components';
import { AddIcon } from '@layer5/sistent-svg';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
// type Story = StoryObj<typeof meta>;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

export function Image() {
  return <Avatar alt="person" src="/public/vite.svg" />;
}

export function Letter() {
  return (
    <Stack spacing={2} direction="row">
      <Avatar>H</Avatar>
      <Avatar sx={{ bgcolor: 'seagreen' }}>N</Avatar>
      <Avatar sx={{ bgcolor: 'burlywood' }}>OP</Avatar>
      <Avatar {...stringAvatar('Josh Smith')} />
    </Stack>
  );
}

export function Icon() {
  return (
    <Avatar sx={{ bgcolor: 'burlywood' }}>
      <AddIcon />
    </Avatar>
  );
}

export function Variant() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: 'burlywood' }} variant="circular">
        <AddIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: 'burlywood' }} variant="rounded">
        <AddIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: 'burlywood' }} variant="square">
        <AddIcon />
      </Avatar>
    </Stack>
  );
}

export function Grouped() {
  return (
    <Stack direction="row">
      <AvatarGroup max={4}>
        <Avatar {...stringAvatar('Remy Sharp')} />
        <Avatar {...stringAvatar('Travis Howard')} />
        <Avatar {...stringAvatar('Cindy Baker')} />
        <Avatar {...stringAvatar('Agnes Walker')} />
        <Avatar {...stringAvatar('Trevor Anderson')} />
      </AvatarGroup>
    </Stack>
  );
}

export function Badged() {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      color="secondary"
    >
      <Avatar {...stringAvatar('Trevor Anderson')} />
    </Badge>
  );
}
