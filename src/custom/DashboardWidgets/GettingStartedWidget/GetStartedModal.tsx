/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  DialogContent,
  DialogTitle,
  ListItem,
  Typography
} from '../../../base';

import { CloseIcon } from '../../../icons';
import { CheckIcon } from '../../../icons/Check';
import { styled, useTheme } from '../../../theme';
import { CustomTooltip } from '../../CustomTooltip';
import { CloseBtn, ModalStyledHeader } from '../../Modal';
import { PrecentageLabel, SliderDiv } from '../styles';
import UserInviteModal from './InviteUserModal';
import JourneyModal from './JourneyModal';

interface LoadingProps {
  showModal: boolean;
  handleClose: () => void;
  style?: React.CSSProperties;
}
export interface JourneyStep {
  title: string;
  content: React.ReactNode;
  image?: string;
  videoSrc?: string;
  video?: boolean;
  embed?: boolean;
  previousButton?: boolean;
  isFullScreenModeAllowed?: boolean;
  actionName?: string;
  secondaryActionName?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  roles?: string[];
}

export interface StepData {
  id: number;
  title: string;
  subTitle: string;
  isDisabled?: boolean;
  journey: JourneyStep[];
}

export interface ProfileData {
  role_names?: string[];
  preferences?: {
    remoteProviderPreferences?: {
      isKanvasAccessRequest?: boolean;

      getstarted?: number[];
    };
  };
}

interface GetStartedModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  stepsData: StepData[];
  profileData: ProfileData;
  useUpdateUserPrefMutation: any;
  useGetOrgsQuery: any;
  currentOrgId: string;
  useGetUserOrgRolesQuery: any;
  useHandleUserInviteMutation: any;
  useNotificationHandlers: any;
  isAssignUserRolesAllowed: boolean;
  useLazyGetTeamsQuery: any;
  embedDesignPath: string;
  isFromMeshery: boolean;
  useGetUserByEmailQuery: any;
}

const Loading: React.FC<LoadingProps> = ({ showModal, handleClose, style }) => {
  return (
    <Backdrop sx={{ zIndex: '2010' }} open={showModal} onClick={handleClose}>
      <CircularProgress color="inherit" style={style} />
    </Backdrop>
  );
};

const SwipeableDrawerDiv = styled(SwipeableDrawer)(() => ({
  '& .MuiPaper-root': {
    right: 'unset !important',
    width: '500px'
  },
  '@media(max-width: 500px)': {
    '& .MuiPaper-root': {
      width: '100%'
    }
  }
}));

const DialogHeader = styled(DialogTitle)(() => ({
  padding: 0,
  color: 'white',
  bottom: '2px'
}));

const ModalTitle = styled(Typography)(() => ({
  flexGrow: 1,
  fontSize: '1.25rem',
  textAlign: 'left'
}));

const CheckboxLabel = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}));

interface CheckFieldProps {
  isVisit?: boolean;
}

const CheckField = styled('div')<CheckFieldProps>(({ theme, isVisit }) => ({
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  marginRight: '10px',
  backgroundColor: isVisit === true ? theme.palette.background.brand?.default : 'white',
  border:
    isVisit === true ? `1px solid ${theme.palette.background.brand?.default}` : '1px solid #3C494F',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const LabelTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  color: theme.palette.text.default
}));

const LabelDetail = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1.75rem',
  color: theme.palette.background.neutral?.pressed
}));

const GetStartedModal: React.FC<GetStartedModalProps> = ({
  open,
  handleClose,
  handleOpen,
  stepsData,
  profileData,
  useUpdateUserPrefMutation,
  useGetOrgsQuery,
  currentOrgId,
  useGetUserOrgRolesQuery,
  useHandleUserInviteMutation,
  useNotificationHandlers,
  isAssignUserRolesAllowed,
  useLazyGetTeamsQuery,
  embedDesignPath,
  isFromMeshery,
  useGetUserByEmailQuery
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number | undefined>(undefined);
  const [inviteModalOpen, setInviteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [updatePref] = useUpdateUserPrefMutation();

  const completedSteps = profileData?.preferences?.remoteProviderPreferences?.getstarted || [];

  const completed = completedSteps ? completedSteps.length : 0;
  const totalSteps = stepsData.length;

  const isComplete = (id: number): boolean =>
    Boolean(completedSteps.find((item: number) => item === id));

  const handleClick = (id: number): void => {
    const completeWelcome = {
      ...profileData?.preferences,
      remoteProviderPreferences: {
        ...profileData?.preferences?.remoteProviderPreferences,
        getstarted: isComplete(id)
          ? completedSteps.filter((i: number) => i !== id)
          : [...completedSteps, id]
      }
    };
    // different api use for the cloud and meshery
    if (isFromMeshery) {
      updatePref(completeWelcome);
    } else {
      updatePref({
        mapObject: completeWelcome
      });
    }
    if (id === 3) {
      setInviteModal(true);
    } else {
      setOpenModal(true);
      setClicked(id);
    }
  };

  const completedPercentage = (): number => {
    return Math.round((100 / totalSteps) * completed);
  };

  const theme = useTheme();
  const percentage = completedPercentage();

  return (
    <>
      <Loading showModal={loading} handleClose={() => setLoading(false)} />
      <SwipeableDrawerDiv anchor={'bottom'} open={open} onClose={handleClose} onOpen={handleOpen}>
        <>
          <DialogHeader>
            <ModalStyledHeader>
              <ModalTitle>Let’s get started</ModalTitle>
              <CustomTooltip title="close">
                <CloseBtn onClick={handleClose}>
                  <CloseIcon width="32" height="32" />
                </CloseBtn>
              </CustomTooltip>
            </ModalStyledHeader>
          </DialogHeader>
          <DialogContent
            sx={{ pb: 2, overflow: 'hidden', backgroundColor: theme.palette.background.surfaces }}
          >
            <Typography sx={{ mt: 3, mb: 1 }}>
              {completedPercentage() === 100
                ? 'Congratulations 🌟 you have all caught up. It’s time for you to create some designs and share with the world!'
                : 'Click each item to know how Meshery works'}
            </Typography>
            <SliderDiv
              value={completedPercentage()}
              size="medium"
              aria-label="Default"
              valueLabelDisplay="auto"
            />
            <PrecentageLabel
              size="medium"
              completedPercentage={percentage}
            >{`${completedPercentage()}%`}</PrecentageLabel>
          </DialogContent>
          <Grid2 sx={{ overflowY: 'auto', backgroundColor: theme.palette.background.surfaces }}>
            {stepsData.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  onClick={() => {
                    if (!item.isDisabled) {
                      handleClick(item.id);
                      handleClose();
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    mb: 0,
                    width: '100%',
                    backgroundColor: item.isDisabled
                      ? `${theme.palette.background.brand?.disabled}`
                      : `inherit`,
                    '&:hover': {
                      backgroundColor: item.isDisabled
                        ? 'none'
                        : `${theme.palette.background.hover}`
                    }
                  }}
                >
                  <CheckField isVisit={isComplete(item.id)}>
                    <CheckIcon height="16" width="21" fill={theme.palette.icon.default} />
                  </CheckField>
                  <CheckboxLabel>
                    <LabelTitle>{item.title}</LabelTitle>
                    <LabelDetail>{item.subTitle}</LabelDetail>
                  </CheckboxLabel>
                </ListItem>
              );
            })}
          </Grid2>
        </>
      </SwipeableDrawerDiv>
      <JourneyModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleOpen={handleOpen}
        clicked={clicked}
        stepsData={stepsData}
        profileData={profileData}
        useNotificationHandlers={useNotificationHandlers}
        embedDesignPath={embedDesignPath}
      />
      {inviteModalOpen && (
        <UserInviteModal
          open={inviteModalOpen}
          setLoading={setLoading}
          handleInviteModalClose={() => setInviteModal(false)}
          setInviteModal={setInviteModal}
          currentOrgId={currentOrgId}
          useGetOrgsQuery={useGetOrgsQuery}
          useGetUserOrgRolesQuery={useGetUserOrgRolesQuery}
          useHandleUserInviteMutation={useHandleUserInviteMutation}
          useNotificationHandlers={useNotificationHandlers}
          isAssignUserRolesAllowed={isAssignUserRolesAllowed}
          useLazyGetTeamsQuery={useLazyGetTeamsQuery}
          useGetUserByEmailQuery={useGetUserByEmailQuery}
        />
      )}
    </>
  );
};

export default GetStartedModal;
