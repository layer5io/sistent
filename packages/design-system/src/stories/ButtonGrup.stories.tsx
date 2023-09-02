import { BaseButton, ButtonGroup, Stack, Paper } from '@layer5/sistent-components';
import React from 'react';

export default {
  title: 'Example/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs']
};

const buttons = [
  <BaseButton>One</BaseButton>,
  <BaseButton>Two</BaseButton>,
  <BaseButton>Three</BaseButton>
];

export function Basic() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {buttons}
    </ButtonGroup>
  );
}

export function Variants() {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonGroup variant="outlined" color="info" aria-label="outlined primary button group">
        {buttons}
      </ButtonGroup>

      <ButtonGroup variant="text" color="secondary" aria-label="outlined primary button group">
        {buttons}
      </ButtonGroup>
    </Stack>
  );
}

export function SizesAndColors() {
  return (
    <Stack direction="column" spacing={2}>
      <ButtonGroup size="small" aria-label="small button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup color="secondary" aria-label="medium secondary button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup size="large" color="warning" aria-label="large button group">
        {buttons}
      </ButtonGroup>
    </Stack>
  );
}

export function VerticalGroup() {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonGroup size="small" aria-label="small button group" orientation="vertical">
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        color="secondary"
        aria-label="medium secondary button group"
        orientation="vertical">
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        size="large"
        color="warning"
        aria-label="large button group"
        orientation="vertical">
        {buttons}
      </ButtonGroup>
    </Stack>
  );
}

export function DisabledElevation() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      color="error"
      aria-label="Disabled elevation buttons">
      {buttons}
    </ButtonGroup>
  );
}
