import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '../../base';
import { useTheme } from '../../theme';
import { Modal, ModalBody, ModalButtonPrimary, ModalButtonSecondary, ModalFooter } from '../Modal';
import { ActionComponent, Subtitle } from './style';

/* Promt variants are used to define the color of the prompt button */
export const PROMPT_VARIANTS = {
  WARNING: 'warning',
  DANGER: 'error',
  SUCCESS: 'success',
  INFO: 'info'
} as const;

type PromptVariant = (typeof PROMPT_VARIANTS)[keyof typeof PROMPT_VARIANTS];

interface PromptProps {
  variant?: PromptVariant;
}

interface State {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  primaryOption: string;
  showInfoIcon?: string;
  variant?: PromptVariant;
  headerIcon?: React.ReactNode;
  showCheckbox?: boolean;
  isChecked?: boolean;
}

interface ShowParams {
  title: string;
  subtitle: string;
  primaryOption: string;
  variant: PromptVariant;
  showInfoIcon?: string;
  showCheckbox?: boolean;
  headerIcon?: React.ReactNode;
}

export interface PromptRef {
  show: (params: ShowParams) => Promise<string>;
  getCheckboxState: () => boolean;
}

const PromptComponent = forwardRef<PromptRef, PromptProps>(({ variant }, ref) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    title: '',
    subtitle: '',
    primaryOption: '',
    showInfoIcon: '',
    variant,
    headerIcon: undefined,
    isChecked: false,
    showCheckbox: false
  });

  /* This ref is used to store the resolve and reject functions of the promise returned by the show method */
  const promiseInfoRef = useRef<{ resolve: (value: string) => void; reject: () => void } | null>(
    null
  );

  const theme = useTheme();

  /* Settle active promise and hide modal */
  const settle = (value: string) => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
    if (promiseInfoRef.current) {
      const activeResolve = promiseInfoRef.current.resolve;
      promiseInfoRef.current = null;
      activeResolve(value);
    }
  };

  /* This function is used to show the prompt */
  const show = (params: ShowParams) => {
    if (promiseInfoRef.current) {
      const activeResolve = promiseInfoRef.current.resolve;
      promiseInfoRef.current = null;
      activeResolve('CANCEL');
    }
    return new Promise<string>((resolve, reject) => {
      promiseInfoRef.current = { resolve, reject };
      setState({
        ...params,
        isOpen: true,
        showInfoIcon: params.showInfoIcon || '',
        showCheckbox: !!params.showCheckbox
      });
    });
  };

  /* This function is used to hide the prompt */
  const hide = () => {
    settle('CANCEL');
  };

  const handleCheckboxChange = () => {
    setState((prevState) => ({ ...prevState, isChecked: !prevState.isChecked }));
  };

  const getCheckboxState = () => {
    return !!state.isChecked;
  };

  useImperativeHandle(ref, () => ({
    show,
    getCheckboxState
  }));

  const { isOpen, primaryOption, title, subtitle, showInfoIcon, headerIcon, showCheckbox } = state;

  return (
    <Modal
      open={isOpen}
      closeModal={hide}
      title={title}
      id="searchClick"
      headerIcon={headerIcon}
      reactNode={undefined}
      data-testid="prompt-modal"
    >
      {subtitle && (
        <ModalBody data-testid="prompt-body">
          <Subtitle
            id="alert-dialog-description"
            variant="body1"
            component="div"
            data-testid="prompt-subtitle"
          >
            <Typography
              variant="body1"
              component="div"
              style={{
                color: theme.palette.text.primary
              }}
            >
              {subtitle}
            </Typography>
          </Subtitle>
          {showCheckbox && (
            <FormControlLabel
              data-testid="prompt-checkbox-label"
              control={
                <Checkbox
                  checked={getCheckboxState()}
                  onChange={handleCheckboxChange}
                  color="primary"
                  data-testid="prompt-checkbox"
                />
              }
              label={<span style={{ fontSize: '1rem' }}>Do not show again</span>}
            />
          )}
        </ModalBody>
      )}
      <ModalFooter variant="filled" helpText={showInfoIcon} data-testid="prompt-footer">
        <ActionComponent data-testid="prompt-actions">
          <ModalButtonSecondary
            data-testid="prompt-secondary-button"
            onClick={() => settle('CANCEL')}
          >
            Cancel
          </ModalButtonSecondary>
          <ModalButtonPrimary
            data-testid="prompt-primary-button"
            onClick={() => settle(primaryOption)}
            style={
              state.variant && {
                backgroundColor: theme.palette.background[state.variant]?.default,
                textTransform: 'capitalize'
              }
            }
            type="submit"
          >
            {primaryOption}
          </ModalButtonPrimary>
        </ActionComponent>
      </ModalFooter>
    </Modal>
  );
});

PromptComponent.displayName = 'PromptComponent';

export default PromptComponent;
