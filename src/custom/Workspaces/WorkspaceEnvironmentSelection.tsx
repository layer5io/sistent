/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FunctionComponent } from 'react';
import { Autocomplete, Chip, TextField } from '../../base';

interface Environment {
  id: string;
  name: string;
}

interface EnvironmentOption {
  label: string;
  value: string;
}

interface WorkspaceEnvironmentSelectionProps {
  workspaceId: string;
  useAssignEnvironmentToWorkspaceMutation: any;
  useGetEnvironmentsOfWorkspaceQuery: any;
  useUnassignEnvironmentFromWorkspaceMutation: any;
  useNotificationHandlers: () => {
    handleSuccess: (message: string) => void;
    handleError: (message: string) => void;
  };
  isAssignedEnvironmentAllowed: boolean;
}

const WorkspaceEnvironmentSelection: FunctionComponent<WorkspaceEnvironmentSelectionProps> = ({
  workspaceId,
  useAssignEnvironmentToWorkspaceMutation,
  useGetEnvironmentsOfWorkspaceQuery,
  useUnassignEnvironmentFromWorkspaceMutation,
  useNotificationHandlers,
  isAssignedEnvironmentAllowed
}) => {
  const { handleSuccess, handleError } = useNotificationHandlers();

  const { data: environmentsResponse, isLoading } = useGetEnvironmentsOfWorkspaceQuery({
    workspaceId,
    page: 0,
    pagesize: 'all',
    filter: '{"assigned":false}'
  });

  const { data: environmentsOfWorkspace, isLoading: isEnvLoading } =
    useGetEnvironmentsOfWorkspaceQuery({
      workspaceId,
      page: 0,
      pagesize: 'all'
    });

  const _environmentOptions: EnvironmentOption[] =
    environmentsResponse?.environments?.map((env: Environment) => ({
      label: env.name,
      value: env.id
    })) || [];

  const _environmentValues: EnvironmentOption[] =
    environmentsOfWorkspace?.environments?.map((env: Environment) => ({
      label: env.name,
      value: env.id
    })) || [];

  const [assignEnvironmentToWorkspace] = useAssignEnvironmentToWorkspaceMutation();
  const [unassignEnvironmentFromWorkspace] = useUnassignEnvironmentFromWorkspaceMutation();

  const handleEnvironmentSelect = (
    selectedValues: EnvironmentOption[],
    unselectedValues: EnvironmentOption[]
  ): void => {
    const selectedEnvs = selectedValues.map((env) => env.value);
    const unselectedEnvs = unselectedValues.map((env) => env.value);

    if (unselectedEnvs.length > 0) {
      unselectedEnvs.forEach((envId) => {
        // Find environment name for the unassigned environment
        const envName =
          environmentsOfWorkspace?.environments?.find((env: Environment) => env.id === envId)
            ?.name || 'Unknown';

        unassignEnvironmentFromWorkspace({
          workspaceId,
          environmentId: envId
        })
          .unwrap()
          .then(() => handleSuccess(`Environment "${envName}" unassigned`))
          .catch((error: { data: string }) =>
            handleError(`Environment "${envName}" Unassign Error: ${error?.data}`)
          );
      });
      return;
    }

    if (selectedEnvs.length > 0) {
      selectedEnvs.forEach((envId) => {
        if (_environmentValues.find((env) => env.value === envId)) {
          return;
        }

        // Find environment name for the assigned environment
        const envName =
          environmentsResponse?.environments?.find((env: Environment) => env.id === envId)?.name ||
          'Unknown';

        assignEnvironmentToWorkspace({
          workspaceId,
          environmentId: envId
        })
          .unwrap()
          .then(() => handleSuccess(`Environment "${envName}" assigned`))
          .catch((error: { data: string }) =>
            handleError(`Environment "${envName}" Assign Error: ${error?.data}`)
          );
      });
      return;
    }
  };

  // Handle select change
  const handleChange = (
    _event: React.SyntheticEvent,
    selectedOptions: EnvironmentOption[]
  ): void => {
    const currentValues = _environmentValues || [];
    const selectedValues = selectedOptions || [];

    // Determine which items were selected and which were unselected
    const newlySelected = selectedValues.filter(
      (option) => !currentValues.some((item) => item.value === option.value)
    );

    const newlyUnselected = currentValues.filter(
      (item) => !selectedValues.some((option) => option.value === item.value)
    );

    handleEnvironmentSelect(newlySelected, newlyUnselected);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ marginBlock: '1rem', maxWidth: '15rem' }}>
      <Autocomplete
        //@ts-ignore
        multiple
        options={_environmentOptions}
        value={_environmentValues}
        loading={isLoading || isEnvLoading}
        //@ts-ignore
        onChange={handleChange}
        size="small"
        disableCloseOnSelect
        getOptionLabel={(option: unknown) => (option as EnvironmentOption).label}
        renderTags={(value: unknown) =>
          (value as EnvironmentOption[]).map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              size="small"
              style={{
                margin: '0.15rem',
                borderRadius: '0.2rem'
              }}
              onDelete={() => {
                unassignEnvironmentFromWorkspace({
                  workspaceId,
                  environmentId: option.value
                });
              }}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} placeholder="Assigned Environment" />}
        popupIcon={null}
        disabled={!isAssignedEnvironmentAllowed}
      />
    </div>
  );
};

export default WorkspaceEnvironmentSelection;
