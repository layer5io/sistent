// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import MesheryDesignEmbedUmd from '@layer5/meshery-design-embed';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { styled } from '../../../theme';
import { JourneyStep, ProfileData, StepData } from './GetStartedModal';
import ReusableModal from './ReusableModal';

interface JourneyModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  clicked?: number;
  stepsData: StepData[];
  useNotificationHandlers: () => {
    handleInfo: (message: string) => void;
  };
  profileData?: ProfileData;
  embedDesignPath: string;
}

const stepperType = {
  Previous: 'Previous',
  Next: 'Next'
} as const;

export const ModalImage = styled('img')(() => ({
  aspectRatio: '16/9',
  paddingBlock: '1rem'
}));

export const ModalVideo = styled('video')(() => ({
  aspectRatio: '16/9',
  paddingBlock: '1rem'
}));

const JourneyModal: React.FC<JourneyModalProps> = ({
  open,
  handleClose,
  handleOpen,
  clicked,
  stepsData,
  useNotificationHandlers,
  profileData,
  embedDesignPath
}) => {
  const [currentModal, setCurrentModal] = useState<number>(0);
  const [step, setStep] = useState<StepData | null>(null);
  const [data, setData] = useState<JourneyStep | null>(null);
  const [isAccessRequest, setIsAccessRequest] = useState<boolean>(false);
  const { handleInfo } = useNotificationHandlers();

  const handlePlaygroundRequest = (): void => {
    if (isAccessRequest === true) {
      handleInfo('Your request for access is queued for review.');
      return;
    }

    if (getRolePermission(data?.roles)) {
      return;
    }
  };

  const getRolePermission = (roles?: string[]): boolean => {
    return roles?.some((role) => profileData?.role_names?.includes(role)) ?? false;
  };

  const handleStepper = (type: (typeof stepperType)[keyof typeof stepperType]): void => {
    const nextModal = type === stepperType.Next ? currentModal + 1 : currentModal - 1;
    if (nextModal === step?.journey.length) {
      setCurrentModal(0);
      handleClose();
      handleOpen();
      setStep(null);
      setData(null);
    } else if (step) {
      setData(step.journey[nextModal]);
      setCurrentModal(nextModal);
    }
  };

  const handleAction = (action: () => void): void => {
    if (data?.roles) {
      if (getRolePermission(data.roles)) {
        action();
      } else {
        handlePlaygroundRequest();
      }
    } else {
      action();
    }
    handleStepper(stepperType.Next);
  };

  useEffect(() => {
    if (clicked !== undefined) {
      setStep(stepsData[clicked - 1]);
      const nextStep = stepsData[clicked - 1];
      setStep(nextStep);
      setData(nextStep.journey[0]);
    }
  }, [clicked, stepsData]);

  useEffect(() => {
    const remoteProviderPref = profileData?.preferences?.remoteProviderPreferences;
    const currentRole = remoteProviderPref?.isKanvasAccessRequest
      ? remoteProviderPref.isKanvasAccessRequest
      : false;
    setIsAccessRequest(currentRole);
  }, [profileData]);

  return data ? (
    <ReusableModal
      open={open}
      modalTitle={data.title}
      handleClose={handleClose}
      cancelButtonText="PREVIOUS"
      cancelButton={data.previousButton}
      isFullScreenModeAllowed={data.isFullScreenModeAllowed}
      onCancel={() => handleStepper(stepperType.Previous)}
      secondaryActionButton={data.secondaryActionName ? true : false}
      secondaryActionName={_.toUpper(data.secondaryActionName)}
      actionName={_.toUpper(data.actionName)}
      onAction={
        data.primaryAction
          ? () => handleAction(data.primaryAction!)
          : () => handleStepper(stepperType.Next)
      }
      onSecondaryAction={
        data.secondaryAction ? data.secondaryAction : () => handleStepper(stepperType.Next)
      }
      maxWidth="sm"
    >
      <>
        {data.image !== undefined ? (
          <ModalImage width="100%" alt="Layer5 Cloud" className="modal-img" src={data.image} />
        ) : (
          ''
        )}
        {data.videoSrc !== undefined ? (
          <ModalVideo src={data.videoSrc} autoPlay className="modal-img" width="100%" />
        ) : (
          ''
        )}
        {data.video !== undefined ? (
          <iframe
            style={{
              aspectRatio: '16/9',
              width: '100%'
            }}
            src="https://www.youtube.com/embed/Do7htKrRzDA?si=5iMQ5a1JUf3qpIiH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        ) : (
          ''
        )}
        {data.embed !== undefined ? (
          <MesheryDesignEmbedUmd
            embedId="embedded-design-d429e684-c42a-4c14-816b-b4dddb4b6d40"
            embedScriptSrc={embedDesignPath}
            style={{
              height: '20rem'
            }}
          />
        ) : (
          ''
        )}
        <div style={{ padding: '0 1.5rem' }}>{data.content}</div>
      </>
    </ReusableModal>
  ) : null;
};

export default JourneyModal;
