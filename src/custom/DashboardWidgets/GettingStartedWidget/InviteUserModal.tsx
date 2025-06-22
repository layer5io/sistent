/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '../../../base';
import { InviteUserIcon } from '../../../icons';
import { styled, useTheme } from '../../../theme';
import { Modal, ModalBody, ModalFooter, PrimaryActionButtons } from '../../Modal';
import { withDefaultPageArgs } from '../../PerformersSection/PerformersSection';
import TeamSearchField from './TeamSearchField';

const CreateUserInputField = styled(TextField)(() => ({
  width: 'auto'
}));

const FormControlSelect = styled(FormControl)(() => ({
  width: '100%',
  '& .MuiSelect-select': {
    padding: '0.8rem 0.6rem',
    ['@media (max-width : 899px)']: {
      width: '18.5rem'
    }
  },
  '& .MuiChip-root': {
    height: '1.5rem'
  }
}));

const EMAIL_REGEXP =
  /^[\w!#$%&'*+\-\\/=?^_`{|}~]+(\.[\w!#$%&'*+\-\\/=?^_`{|}~]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

interface Organization {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
}

interface ErrorMessages {
  inviteeEmail: string;
}

interface UserInviteModalProps {
  open: boolean;
  handleInviteModalClose: () => void;
  setLoading: (loading: boolean) => void;
  setInviteModal: (open: boolean) => void;
  currentOrgId: string;
  useGetOrgsQuery: any;
  useGetUserOrgRolesQuery: any;
  useHandleUserInviteMutation: any;
  useNotificationHandlers: () => {
    handleSuccess: (message: string) => void;
    handleError: (message: string) => void;
  };
  isAssignUserRolesAllowed: boolean;
  useLazyGetTeamsQuery: any;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  sx?: any;
}

export default function UserInviteModal({
  open,
  handleInviteModalClose,
  setLoading,
  setInviteModal,
  currentOrgId,
  useGetOrgsQuery,
  useGetUserOrgRolesQuery,
  useHandleUserInviteMutation,
  useNotificationHandlers,
  isAssignUserRolesAllowed,
  useLazyGetTeamsQuery,
  sx
}: UserInviteModalProps) {
  const [inviteeFirstName, setInviteeFirstName] = useState<string>('');
  const [inviteeLastName, setInviteeLastName] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [inviteeEmail, setInviteeEmail] = useState<string>('');
  const [orgRoles, setOrgRoles] = useState<string[]>(['user']);
  const [teams, setTeams] = useState<Team[]>([]);
  const { handleSuccess, handleError } = useNotificationHandlers();
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    inviteeEmail: ''
  });
  const theme = useTheme();
  const [availableProviderRoles, setAvailableProviderRoles] = useState<string[]>([]);
  const [availableOrgRoles, setAvailableOrgRoles] = useState<string[]>([]);

  const { data } = useGetOrgsQuery(withDefaultPageArgs());
  const orgs = data?.organizations;
  const defaultOrgSelection = { id: 'none', name: 'None' };
  const [organization, setOrganization] = useState<Organization>(defaultOrgSelection);
  const { data: providerRolesData } = useGetUserOrgRolesQuery({
    orgId: currentOrgId,
    all: true,
    order: 'role_name asc',
    selector: 'provider'
  });

  const { data: organizationRolesData } = useGetUserOrgRolesQuery({
    orgId: currentOrgId,
    all: true,
    order: 'role_name asc',
    selector: 'organization'
  });
  const [userInvite] = useHandleUserInviteMutation();

  useEffect(() => {
    if (currentOrgId) {
      const providerRoles: string[] = [];
      const organizationRoles: string[] = [];

      if (providerRolesData) {
        providerRolesData?.roles?.forEach((role: { role_name: string }) =>
          providerRoles.push(role?.role_name)
        );
        setAvailableProviderRoles(providerRoles);
      }

      if (organizationRolesData) {
        organizationRolesData?.roles?.forEach((role: { role_name: string }) =>
          organizationRoles.push(role?.role_name)
        );
        setAvailableOrgRoles(organizationRoles);
      }
    }
  }, [currentOrgId, providerRolesData, organizationRolesData]);

  function getSelectStyle(ele: string, arr: string[]) {
    return {
      fontWeight:
        arr.indexOf(ele) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }

  const handleRoleChange = (event: { target: { value: string | string[] } }) => {
    let value = event.target.value;
    value = typeof value === 'string' ? value.split(',') : value;
    setRoles(value);
  };

  const handleOrgRoleChange = (event: { target: { value: string | string[] } }) => {
    let value = event.target.value;
    value = typeof value === 'string' ? value.split(',') : value;
    setOrgRoles(value);
  };

  const handleInviteeEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setErrorMessages((state) => ({ ...state, inviteeEmail: '' }));
    setInviteeEmail(text);
  };

  const handleInviteeFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInviteeFirstName(e.target.value);

  const handleInviteeLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInviteeLastName(e.target.value);

  const handleSubmit = () => {
    let isSuccess = true;
    if (inviteeEmail.trim().length === 0) {
      setErrorMessages((state) => ({ ...state, inviteeEmail: 'Email is Required' }));
      isSuccess = false;
    }
    if (!EMAIL_REGEXP.test(inviteeEmail)) {
      setErrorMessages((state) => ({ ...state, inviteeEmail: 'Email is invalid' }));
      isSuccess = false;
    }
    if (isSuccess) handleInvite();
  };

  const isSendButtonDisabled = !inviteeEmail;

  const handleInvite = async () => {
    setLoading(true);
    const inviteeName = inviteeFirstName + ' ' + inviteeLastName;

    try {
      await userInvite({
        userInvite: {
          first_name: inviteeFirstName,
          last_name: inviteeLastName,
          email: inviteeEmail,
          roles: roles,
          org_name: organization.name,
          org_roles: orgRoles,
          teams: teams
        },
        orgId: organization.id
      }).unwrap();

      handleSuccess(`Invite send to ${inviteeName.trim() === '' ? inviteeEmail : inviteeName}.`);
    } catch (e) {
      console.debug('cannot send user invite', e);
      handleError(`Invitation to ${inviteeFirstName} ${inviteeLastName} failed.`);
    }
    setInviteModal(false);
    setLoading(false);
    setInviteeFirstName('');
    setInviteeLastName('');
    setInviteeEmail('');
    setOrganization(defaultOrgSelection);
    setTeams([]);
    setRoles([]);
    setOrgRoles([]);
  };

  const handleOrgChange = (event: { target: { value: string } }) => {
    if (event.target.value === 'none') {
      setOrganization(defaultOrgSelection);
      return;
    }
    const selectedOrg = orgs?.find((org: any) => org.id === event.target.value);
    if (selectedOrg) setOrganization(selectedOrg);
  };

  let helpText = `Create a new user account and email new user with account setup instructions. Optionally, add the new user to one or more of your organizations and one or more teams.[Learn more about inviting users](https://docs.layer5.io/cloud/identity/users/user-management/).`;
  if (isAssignUserRolesAllowed) {
    helpText += ` Optionally, assign roles.`;
  }

  return (
    <>
      {orgs && (
        <Modal
          open={open}
          closeModal={handleInviteModalClose}
          title={'Invite User'}
          headerIcon={<InviteUserIcon height="32" width="32" fill={theme.palette.common.white} />}
          sx={sx}
        >
          <ModalBody>
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <CreateUserInputField
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  value={inviteeFirstName}
                  onChange={handleInviteeFirstNameChange}
                  sx={{ width: '48% !important' }}
                />

                <CreateUserInputField
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  value={inviteeLastName}
                  onChange={handleInviteeLastNameChange}
                  sx={{ width: '48% !important' }}
                />
              </div>

              <CreateUserInputField
                id="email"
                label="Email"
                variant="outlined"
                value={inviteeEmail}
                onChange={handleInviteeEmailChange}
                helperText={errorMessages.inviteeEmail}
                error={!!errorMessages.inviteeEmail}
                sx={{ width: '100% !important' }}
                required={true}
              />
              <FormControl fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <InputLabel id="org-select-label">Organization</InputLabel>
                <Select
                  labelId="org-select-label"
                  id="outlined-org-select"
                  value={organization}
                  label="Organization Name"
                  onChange={handleOrgChange}
                  renderValue={(org: any) => org?.name}
                >
                  <MenuItem key={defaultOrgSelection?.id} value={defaultOrgSelection?.id}>
                    {defaultOrgSelection?.name}
                  </MenuItem>
                  {orgs.map((org: Organization) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TeamSearchField
                label={'Team(s)'}
                teamsData={teams}
                setTeamsData={setTeams}
                orgID={organization?.id === 'none' ? '' : organization?.id}
                disabled={organization.id == 'none'}
                useLazyGetTeamsQuery={useLazyGetTeamsQuery}
                useNotificationHandlers={useNotificationHandlers}
              />

              <FormControlSelect sx={{ marginTop: '1rem' }} disabled={organization.id == 'none'}>
                <InputLabel id="roles">Organization Roles</InputLabel>
                <Select
                  disabled={organization.id == 'none'}
                  labelId="roles"
                  id="multiple-checkbox"
                  multiple
                  label="Organization Roles"
                  value={orgRoles}
                  onChange={handleOrgRoleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Roles" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {availableOrgRoles.map((name) => (
                    <MenuItem key={name} value={name} style={getSelectStyle(name, roles)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlSelect>

              {isAssignUserRolesAllowed && (
                <FormControlSelect sx={{ marginTop: '1rem' }}>
                  <InputLabel id="roles">Provider Roles</InputLabel>
                  <Select
                    labelId="roles"
                    id="multiple-checkbox"
                    multiple
                    label="Provider Roles"
                    value={roles}
                    onChange={handleRoleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Provider Roles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {availableProviderRoles.map((name) => (
                      <MenuItem key={name} value={name} style={getSelectStyle(name, roles)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControlSelect>
              )}
            </>
          </ModalBody>
          <ModalFooter helpText={helpText} variant="filled">
            <PrimaryActionButtons
              primaryText="Send Invite"
              secondaryText="Cancel"
              primaryButtonProps={{
                onClick: handleSubmit,
                disabled: isSendButtonDisabled
              }}
              secondaryButtonProps={{
                onClick: handleInviteModalClose
              }}
            />
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
