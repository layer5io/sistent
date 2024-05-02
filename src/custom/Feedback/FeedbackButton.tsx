import Typography from '@mui/material/Typography';
import React, { CSSProperties, useState } from 'react';
import {
  CalenderIcon,
  CloseIcon,
  FeedbackIcon,
  IdeaIcon,
  QuestionIcon,
  SuccessIcon
} from '../../icons';
import { CULTURED } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';
import { ModalCard } from '../ModalCard';
import {
  ActionWrapper,
  CloseButton,
  Container,
  FeedbackButton,
  FeedbackForm,
  FeedbackMessage,
  FeedbackMiniIcon,
  FeedbackOptionButton,
  FeedbackOptions,
  FeedbackSubmitButton,
  FeedbackTextArea,
  HelperWrapper,
  InnerComponentWrapper,
  StyledCheckbox,
  StyledLink,
  StyledTextArea
} from './style';

const tooltipContent = (
  <p>
    Some account and system information may be sent to Layer5. We will use it to fix problems and
    improve our services, subject to our{' '}
    <StyledLink target="_blank" href="https://layer5.io/company/legal/privacy">
      Privacy Policy
    </StyledLink>{' '}
    and{' '}
    <StyledLink target="_blank" href="https://layer5.io/company/legal/terms-of-service">
      Terms of Service
    </StyledLink>
    . We may email you for more information or updates.
  </p>
);

interface FeedbackDataItem {
  icon: JSX.Element;
  label: string;
  placeholder?: string;
  isTextInput: boolean;
  innerComponent?: JSX.Element;
}

const feedbackData: FeedbackDataItem[] = [
  {
    icon: <FeedbackIcon />,
    label: 'Issue',
    placeholder: 'I’m having an issue with...',
    isTextInput: true
  },
  {
    icon: <IdeaIcon />,
    label: 'Suggestion',
    placeholder: 'I have a suggestion about...',
    isTextInput: true
  },
  {
    icon: <CalenderIcon />,
    label: 'Meet Request',
    isTextInput: false,
    innerComponent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '137px',
          color: 'black'
        }}
      >
        <Typography style={{ lineHeight: '2.5', textAlign: 'center' }}>
          Need help or have more feedback than fits here?
          <br /> Meet with us.
        </Typography>
        <StyledLink
          target="_blank"
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3pmcApaDP4xd8hvG5fy8ylxuFxD3akIRc5vpWJ60q-HemQi80SFFAVftbiIsq9pgiA2o8yvU56"
        >
          Select a time convenient for you.
        </StyledLink>
      </div>
    )
  }
];

interface FeedbackComponentProps {
  onSubmit: (data: { label: string; message: string }) => void;
  containerStyles?: CSSProperties;
  feedbackOptionStyles?: CSSProperties;
  renderPosition:
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'right-top'
    | 'right-middle'
    | 'right-bottom';
  defaultMessage?: string;
  defaultOpen?: boolean;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({
  onSubmit,
  containerStyles,
  feedbackOptionStyles,
  renderPosition,
  defaultMessage = undefined,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [category, setCategory] = useState<FeedbackDataItem | undefined>(feedbackData[0]);
  const [messageValue, setMessageValue] = useState<string | undefined>(defaultMessage);
  const [isChecked, setIsChecked] = useState<boolean>(!!defaultMessage);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleFeedback = () => {
    setIsOpen(!isOpen);
    setCategory(feedbackData[0]);
    setSubmitted(false);
    setMessageValue('');
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (messageValue && isChecked) {
      onSubmit({ label: category?.label || '', message: messageValue });
    }
    setTimeout(() => {
      setIsOpen(false);
      setCategory(undefined);
      setSubmitted(false);
      setMessageValue('');
    }, 2000);
  };

  return (
    <>
      <FeedbackButton
        onClick={handleFeedback}
        style={containerStyles}
        renderPosition={renderPosition}
      >
        Feedback
      </FeedbackButton>
      <Container isOpen={isOpen} style={containerStyles} renderPosition={renderPosition}>
        {submitted ? (
          <FeedbackMessage isOpen={isOpen}>
            <SuccessIcon width={'32'} height={'32'} />
            Submitting your feedback...
          </FeedbackMessage>
        ) : (
          <>
            <ModalCard
              onClose={() => {}}
              open={true}
              closeComponent={
                <CloseButton onClick={() => setIsOpen(false)}>
                  <CloseIcon width={'30'} height={'30'} fill={CULTURED} />
                </CloseButton>
              }
              actions={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ActionWrapper>
                    <StyledCheckbox checked={isChecked} onChange={handleCheckboxChange} />
                    <Typography style={{ color: 'white', fontSize: '12px', height: '15px' }}>
                      We may email you for more information or updates
                    </Typography>
                  </ActionWrapper>
                  <FeedbackSubmitButton
                    type="submit"
                    disabled={!(messageValue && isChecked)}
                    isOpen={!(messageValue && isChecked)}
                    onClick={handleSubmit}
                  >
                    Send
                  </FeedbackSubmitButton>
                </div>
              }
              leftHeaderIcon={<FeedbackIcon />}
              title="Feedback"
              helpArea={
                <CustomTooltip placement="top" title={tooltipContent} arrow>
                  <HelperWrapper>
                    <QuestionIcon width={'30'} height={'30'} />
                  </HelperWrapper>
                </CustomTooltip>
              }
              helpText={'Help'}
              content={
                <FeedbackForm>
                  <FeedbackOptions>
                    {feedbackData?.map((item) => (
                      <FeedbackOptionButton
                        key={item.label}
                        style={feedbackOptionStyles}
                        type="button"
                        onClick={() => {
                          setCategory(item);
                        }}
                        isOpen={category?.label === item.label}
                      >
                        <FeedbackMiniIcon>{item.icon}</FeedbackMiniIcon>
                        <Typography>{item.label}</Typography>
                      </FeedbackOptionButton>
                    ))}
                  </FeedbackOptions>
                  {category?.isTextInput ? (
                    <FeedbackTextArea>
                      <StyledTextArea
                        value={messageValue || ''}
                        onChange={(e) => {
                          setMessageValue(e.target.value);
                        }}
                        required
                        placeholder={category.placeholder}
                        rows={5}
                        cols={30}
                      />
                    </FeedbackTextArea>
                  ) : (
                    <InnerComponentWrapper>{category?.innerComponent}</InnerComponentWrapper>
                  )}
                </FeedbackForm>
              }
            ></ModalCard>
          </>
        )}
      </Container>
    </>
  );
};

export default FeedbackComponent;
