import { styled } from '@mui/material/styles';
import React from 'react';
import Button, { ButtonProps } from '../../base/Button/Button';
import { darkTeal } from '../../theme/colors';

export function ContainedButton(props: ButtonProps): React.JSX.Element {
  return <Button variant="contained" {...props} />;
}

export function OutlinedButton(props: ButtonProps): React.JSX.Element {
  return <Button variant="outlined" {...props} />;
}

export function TextButton(props: ButtonProps): React.JSX.Element {
  return <Button variant="text" {...props} />;
}

export function SecondaryContainedButton(props: ButtonProps): React.JSX.Element {
  return <Button variant="contained" color="secondary" {...props} />;
}

export function LargeContainedButton(props: ButtonProps): React.JSX.Element {
  return <Button variant="contained" size="large" {...props} />;
}

/**
 * Renders the default style for the Button
 */
export const DefaultButton = styled(Button)(() => ({}));

/**
 * Renders the style for `variant="contained"`
 */
export const ContainedDefaultButton = styled(ContainedButton)(() => ({}));

/**
 * Renders the style for `variant="outlined"`
 */
export const OutlinedDefaultButton = styled(OutlinedButton)(() => ({}));

/**
 * Renders the style for `variant="text"`
 */
export const TextDefaultButton = styled(TextButton)(() => ({}));

/**
 * Renders the style for `variant="contained" color="secondary"`
 */
export const SecondaryContainedDefaultButton = styled(SecondaryContainedButton)(() => ({}));

/**
 * Exports the `StyledButton` which inherits the `DefaultButton`
 */
export const StyledButton = DefaultButton;

export const GetStartedButton = styled(ContainedDefaultButton)(() => ({}));

export const LoginButton = styled(SecondaryContainedButton)(() => ({}));

export const AddButton = styled(ContainedDefaultButton)(({ theme }) => ({
  margin: theme.spacing(1)
}));

export const EditButton = styled(ContainedDefaultButton)(() => ({
  '@media (max-width: 768px)': {
    minWidth: '50px'
  }
}));

export const SpanTextButton = styled('span')(() => ({
  marginLeft: '0.5rem',
  display: 'block',
  '@media (max-width: 853px)': {
    display: 'none'
  }
}));

export const DeleteButton = styled(DefaultButton)(() => ({}));

export const DenyButton = styled(DefaultButton)(() => ({}));

export const ApproveButton = styled(ContainedDefaultButton)(() => ({
  marginRight: '.5rem'
}));

export const CancelButton = styled(DefaultButton)(() => ({
  marginRight: '1rem',
  color: '#000',
  backgroundColor: '#fff'
}));

export const SaveButton = styled(ContainedDefaultButton)(() => ({
  marginRight: '1rem'
}));

export const ConnectButton = styled(ContainedDefaultButton)(() => ({
  marginTop: '1rem'
}));

export const FilterButton = styled(ContainedDefaultButton)(() => ({
  height: '3.5rem'
}));

export const ActionButton = styled(ContainedDefaultButton)(() => ({}));

export const TableCtrlButton = styled(SecondaryContainedDefaultButton)(() => ({
  '&:first-child': {
    marginRight: '1rem'
  }
}));

export const RangeButton = styled(DefaultButton)(() => ({
  border: '1px solid rgba(0, 0, 0, 0.23)',
  backgroundColor: 'white'
}));

export const ErrorCloseButton = styled(DefaultButton)(() => ({}));

export const TryAgainButton = styled(OutlinedButton)(() => ({}));

export const TransferButton = styled(DefaultButton)(() => ({
  margin: '5px 0',
  padding: '7px 0',
  borderRadius: '10px',
  boxShadow: 'none',
  borderColor: darkTeal.main,
  '&:hover': {
    borderColor: darkTeal.main
  }
}));

export const CardStatsBox = styled(ContainedDefaultButton)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '5px',
  minWidth: '175px',
  borderRadius: '5px',
  marginBottom: '10px'
}));

export const IconButton = styled(DefaultButton)({
  minWidth: 'fit-content',
  '&.MuiButtonBase-root:hover': {
    bgcolor: 'transparent'
  }
});

export const PopupButton = styled(DefaultButton)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  background: theme.palette.common.white,
  color: theme.palette.text.secondary,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px'
}));

export const ConnectionsButton = styled(ContainedDefaultButton)(() => ({
  marginTop: '1rem',
  marginRight: '1rem',
  padding: '1.5rem, 1.5rem',
  width: 'object-fit'
}));

/** Review later
export const TOSButton = styled("a")(({ theme }) => ({
  display: "flex",
  padding: "0.5rem 2rem",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.keppelGreen,
  borderRadius: "5px",
  transition: "all .3s",
  boxShadow: "0 1px 20px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: theme.palette.caribbeanGreen,
  },
}));

export const PrivacyButton = styled("a")(({ theme }) => ({
  display: "flex",
  padding: "0.5rem 2rem",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.keppelGreen,
  borderRadius: "5px",
  transition: "all .3s",
  boxShadow: "0 1px 20px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: theme.palette.caribbeanGreen,
  },
}));
*/
