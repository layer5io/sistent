import { styled } from '@mui/material';
import { FC } from 'react';
import { RenderMarkdownTooltip } from '../Markdown';

interface AlertProps {
  type?: 'success' | 'warning' | 'note';
  title?: string;
  content: string;
}

const NoteWrapper = styled('div')<NoteWrapperProps>(({ type, theme }) => ({
  fontWeight: 500,
  background: '#212529',
  color: 'inherit',
  marginTop: '2rem',
  width: '100%',
  height: '100%',
  marginBottom: '2rem',
  padding: '0.5rem 1rem',
  borderRadius: 0,
  borderStyle: 'solid',
  borderColor:
    type === 'warning' ? theme.palette.text.warning : theme.palette.background.brand?.default,
  borderWidth: '0 0 0 4px'
}));

const NoteHeading = styled('h4')<NoteWrapperProps>(({ type, theme }) => ({
  color: type === 'warning' ? theme.palette.text.warning : theme.palette.background.brand?.default,
  fontSize: '1.35rem'
}));

const NoteContent = styled('p')(({ theme }) => ({
  color: theme.palette.text.inverse
}));

interface NoteWrapperProps {
  type: 'success' | 'warning' | 'note';
}

const Note: FC<AlertProps> = ({ type = 'note', title, content }) => {
  return (
    <NoteWrapper type={type}>
      <NoteHeading type={type}>{title}</NoteHeading>
      <NoteContent>
        <RenderMarkdownTooltip content={content} />
      </NoteContent>
    </NoteWrapper>
  );
};

export default Note;
