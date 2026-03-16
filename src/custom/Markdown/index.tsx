import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
  BasicAnchorMarkdown,
  StyledMarkdown,
  StyledMarkdownBlockquote,
  StyledMarkdownCode,
  StyledMarkdownH1,
  StyledMarkdownH2,
  StyledMarkdownH3,
  StyledMarkdownH4,
  StyledMarkdownH5,
  StyledMarkdownH6,
  StyledMarkdownLi,
  StyledMarkdownP,
  StyledMarkdownPre,
  StyledMarkdownTd,
  StyledMarkdownTh,
  StyledMarkdownTooltipP,
  StyledMarkdownUl
} from './style';
export interface RenderMarkdownProps {
  content: string;
}

export const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  const components: Components = {
    p: ({ children }) => <StyledMarkdownP>{children}</StyledMarkdownP>,
    a: ({ href, children }) => (
      <StyledMarkdown
        onClick={(e) => {
          e.preventDefault();
          if (href) {
            window.open(href, '_blank');
          }
        }}
        href={href}
      >
        {children}
      </StyledMarkdown>
    ),
    h1: ({ children }) => <StyledMarkdownH1>{children}</StyledMarkdownH1>,
    h2: ({ children }) => <StyledMarkdownH2>{children}</StyledMarkdownH2>,
    h3: ({ children }) => <StyledMarkdownH3>{children}</StyledMarkdownH3>,
    h4: ({ children }) => <StyledMarkdownH4>{children}</StyledMarkdownH4>,
    h5: ({ children }) => <StyledMarkdownH5>{children}</StyledMarkdownH5>,
    h6: ({ children }) => <StyledMarkdownH6>{children}</StyledMarkdownH6>,
    blockquote: ({ children }) => (
      <StyledMarkdownBlockquote>{children}</StyledMarkdownBlockquote>
    ),
    ul: ({ children }) => <StyledMarkdownUl>{children}</StyledMarkdownUl>,
    li: ({ children }) => <StyledMarkdownLi>{children}</StyledMarkdownLi>,
    th: ({ children }) => <StyledMarkdownTh>{children}</StyledMarkdownTh>,
    td: ({ children }) => <StyledMarkdownTd>{children}</StyledMarkdownTd>,
    pre: ({ children }) => <StyledMarkdownPre>{children}</StyledMarkdownPre>,
    code: ({ children }) => <StyledMarkdownCode>{children}</StyledMarkdownCode>
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};

export const RenderMarkdownTooltip: React.FC<RenderMarkdownProps> = ({ content }) => {
  const processDescription = (desc: string | undefined): string | undefined => {
    if (!desc) return desc;
    try {
      // -> json.parse will handle esacpe characters
      return JSON.parse(`"${desc}"`);
    } catch {
      return desc;
    }
  };
  const components: Components = {
    p: ({ children }) => <StyledMarkdownTooltipP>{children}</StyledMarkdownTooltipP>,
    a: ({ href, children }) => (
      <StyledMarkdown
        onClick={(e) => {
          if (href) {
            window.open(href, '_blank');
          }
          e.stopPropagation();
        }}
        as="a"
      >
        {children}
      </StyledMarkdown>
    ),
    h1: ({ children }) => <StyledMarkdownH1>{children}</StyledMarkdownH1>,
    h2: ({ children }) => <StyledMarkdownH2>{children}</StyledMarkdownH2>,
    h3: ({ children }) => <StyledMarkdownH3>{children}</StyledMarkdownH3>,
    h4: ({ children }) => <StyledMarkdownH4>{children}</StyledMarkdownH4>,
    h5: ({ children }) => <StyledMarkdownH5>{children}</StyledMarkdownH5>,
    h6: ({ children }) => <StyledMarkdownH6>{children}</StyledMarkdownH6>,
    blockquote: ({ children }) => (
      <StyledMarkdownBlockquote>{children}</StyledMarkdownBlockquote>
    ),
    ul: ({ children }) => <StyledMarkdownUl>{children}</StyledMarkdownUl>,
    li: ({ children }) => <StyledMarkdownLi>{children}</StyledMarkdownLi>,
    th: ({ children }) => <StyledMarkdownTh>{children}</StyledMarkdownTh>,
    td: ({ children }) => <StyledMarkdownTd>{children}</StyledMarkdownTd>
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {processDescription(content) as string}
    </ReactMarkdown>
  );
};

// Markdown support for notifications markdown content
export const BasicMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  const components: Components = {
    a: ({ href, children }) => (
      <BasicAnchorMarkdown
        onClick={(e) => {
          if (href) {
            window.open(href, '_blank');
          }
          e.stopPropagation();
        }}
        as="a"
      >
        {children}
      </BasicAnchorMarkdown>
    )
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};
