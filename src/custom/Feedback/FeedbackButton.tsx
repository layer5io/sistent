import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';
import {
  CalenderIcon,
  CloseIcon,
  FeedbackIcon,
  IdeaIcon,
  QuestionIcon,
  SuccessIcon
} from '../../icons';
import { ModalCard } from '../ModalCard';
import {
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
  MeetWrapper,
  StyledCheckBox,
  StyledLink,
  StyledTextArea
} from './style';

const tooltipContent = (
  <MeetWrapper>
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
  </MeetWrapper>
);

interface FeedbackDataItem {
  icon: JSX.Element;
  label: string;
  placeholder: string;
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
    icon: <IdeaIcon width={'24'} height={'24'} />,
    label: 'Suggestion',
    placeholder: 'I have a suggestion about...',
    isTextInput: true
  },
  {
    icon: <CalenderIcon />,
    label: 'Meet Request',
    placeholder: 'You have a suggestion3?',
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
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [category, setCategory] = useState<FeedbackDataItem | undefined>();
  const [messageValue, setMessageValue] = useState<string | undefined>();
  const feedbackTextRef = useRef<HTMLTextAreaElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
    <Container isOpen={isOpen}>
      {submitted ? (
        <FeedbackMessage isOpen={isOpen}>
          <SuccessIcon width={'32'} height={'32'} />
          We got your concern. Thank you!
        </FeedbackMessage>
      ) : (
        <>
          <FeedbackButton onClick={handleFeedback}>Feedback</FeedbackButton>

          <ModalCard
            onClose={() => {}}
            open={true}
            closeComponent={
              <CloseButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </CloseButton>
            }
            actions={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    label={''}
                    style={{
                      color: 'white',
                      fontSize: '2px',
                      marginLeft: '0px',
                      marginRight: '5px'
                    }}
                    control={<StyledCheckBox checked={isChecked} onChange={handleCheckboxChange} />}
                  />
                  <Typography style={{ fontSize: '0.8rem', marginRight: '10px', color: 'white' }}>
                    We may email you for more information or updates
                  </Typography>
                </div>
                <FeedbackSubmitButton
                  type="submit"
                  disabled={!(messageValue && isChecked)}
                  style={{ backgroundColor: !(messageValue && isChecked) ? '#b0bec5' : '#00B39F' }}
                  onClick={handleSubmit}
                >
                  Send
                </FeedbackSubmitButton>
              </div>
            }
            leftHeaderIcon={<FeedbackIcon fill="#FBFBFB" />}
            title="Feedback"
            helpArea={
              <Tooltip placement="top" title={tooltipContent} arrow>
                <div style={{ marginRight: '0.5rem' }}>
                  <QuestionIcon />
                </div>
              </Tooltip>
            }
            helpText={'Help'}
            content={
              <FeedbackForm>
                <FeedbackOptions>
                  {feedbackData?.map((item) => (
                    <FeedbackOptionButton
                      key={item.label}
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
                    <div style={{ padding: '1.6rem 1.1rem' }}>
                      <StyledTextArea
                        value={messageValue || ''}
                        onChange={(e) => {
                          setMessageValue(e.target.value);
                        }}
                        ref={feedbackTextRef}
                        required
                        placeholder={category.placeholder}
                        rows={5}
                        cols={30}
                      />
                    </div>
                  </FeedbackTextArea>
                ) : (
                  <div style={{ padding: '1.6rem 1.1rem' }}>{category?.innerComponent}</div>
                )}
              </FeedbackForm>
            }
          ></ModalCard>
        </>
      )}
    </Container>
  );
};

export default FeedbackComponent;
