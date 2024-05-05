import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StyledMarkdown } from './style';
export interface RenderMarkdownProps {
  content: string;
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ ...props }) => <StyledMarkdown>{props.children}</StyledMarkdown>
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
