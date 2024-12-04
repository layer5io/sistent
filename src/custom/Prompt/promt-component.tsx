import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Typography } from '../../base';
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
}

interface ShowParams {
  title: string;
  subtitle: string;
  primaryOption: string;
  variant: PromptVariant;
  showInfoIcon?: string;
  headerIcon?: React.ReactNode;
}

export interface PromptRef {
  show: (params: ShowParams) => Promise<string>;
}

const PromptComponent = forwardRef<PromptRef, PromptProps>(({ variant }, ref) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    title: '',
    subtitle: '',
    primaryOption: '',
    showInfoIcon: '',
    variant,
    headerIcon: undefined
  });

  /* This ref is used to store the resolve and reject functions of the promise returned by the show method */
  const promiseInfoRef = useRef<{ resolve: (value: string) => void; reject: () => void }>({
    resolve: () => {},
    reject: () => {}
  });

  const theme = useTheme();

  /* This function is used to show the prompt */
  const show = (params: ShowParams) => {
    return new Promise<string>((resolve, reject) => {
      promiseInfoRef.current = { resolve, reject };
      setState({
        ...params,
        isOpen: true,
        showInfoIcon: params.showInfoIcon || ''
      });
    });
  };

  /* This function is used to hide the prompt */
  const hide = () => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  };

  useImperativeHandle(ref, () => ({
    show
  }));

  const { isOpen, primaryOption, title, subtitle, showInfoIcon, headerIcon } = state;
  const { resolve } = promiseInfoRef.current;

  return (
    <Modal
      open={isOpen}
      closeModal={hide}
      title={title}
      id="searchClick"
      headerIcon={headerIcon}
      reactNode={undefined}
    >
      {subtitle && (
        <ModalBody>
          <Subtitle id="alert-dialog-description" variant="body1" component="div">
            <Typography variant="body1" component="div">
              {subtitle}
            </Typography>
          </Subtitle>
        </ModalBody>
      )}
      <ModalFooter variant="filled" helpText={showInfoIcon}>
        <ActionComponent>
          <ModalButtonSecondary
            onClick={() => {
              hide();
              resolve('CANCEL');
            }}
          >
            Cancel
          </ModalButtonSecondary>
          <ModalButtonPrimary
            onClick={() => {
              hide();
              resolve(primaryOption);
            }}
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
