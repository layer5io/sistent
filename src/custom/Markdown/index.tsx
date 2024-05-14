import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  StyledMarkdown,
  StyledMarkdownBlockquote,
  StyledMarkdownH1,
  StyledMarkdownH2,
  StyledMarkdownH3,
  StyledMarkdownH4,
  StyledMarkdownH5,
  StyledMarkdownH6,
  StyledMarkdownLi,
  StyledMarkdownTd,
  StyledMarkdownTh,
  StyledMarkdownUl
} from './style';
export interface RenderMarkdownProps {
  content: string;
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ ...props }) => <StyledMarkdown>{props.children}</StyledMarkdown>,
        h1: ({ ...props }) => <StyledMarkdownH1>{props.children}</StyledMarkdownH1>,
        h2: ({ ...props }) => <StyledMarkdownH2>{props.children}</StyledMarkdownH2>,
        h3: ({ ...props }) => <StyledMarkdownH3>{props.children}</StyledMarkdownH3>,
        h4: ({ ...props }) => <StyledMarkdownH4>{props.children}</StyledMarkdownH4>,
        h5: ({ ...props }) => <StyledMarkdownH5>{props.children}</StyledMarkdownH5>,
        h6: ({ ...props }) => <StyledMarkdownH6>{props.children}</StyledMarkdownH6>,
        blockquote: ({ ...props }) => (
          <StyledMarkdownBlockquote>{props.children}</StyledMarkdownBlockquote>
        ),
        ul: ({ ...props }) => <StyledMarkdownUl>{props.children}</StyledMarkdownUl>,
        li: ({ ...props }) => <StyledMarkdownLi>{props.children}</StyledMarkdownLi>,
        th: ({ ...props }) => <StyledMarkdownTh>{props.children}</StyledMarkdownTh>,
        td: ({ ...props }) => <StyledMarkdownTd>{props.children}</StyledMarkdownTd>
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
