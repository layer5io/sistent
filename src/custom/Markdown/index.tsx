import ReactMarkdown from 'react-markdown';
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
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={
        {
          p: ({ children }: any) => <StyledMarkdownP>{children}</StyledMarkdownP>,
          a: ({ href, children }: any) => (
          <StyledMarkdown
            onClick={(e) => {
              e.preventDefault();
              window.open(href, '_blank');
            }}
            href={href}
          >
            {children}
          </StyledMarkdown>
        ),
        h1: ({ children }: any) => <StyledMarkdownH1>{children}</StyledMarkdownH1>,
        h2: ({ children }: any) => <StyledMarkdownH2>{children}</StyledMarkdownH2>,
        h3: ({ children }: any) => <StyledMarkdownH3>{children}</StyledMarkdownH3>,
        h4: ({ children }: any) => <StyledMarkdownH4>{children}</StyledMarkdownH4>,
        h5: ({ children }: any) => <StyledMarkdownH5>{children}</StyledMarkdownH5>,
        h6: ({ children }: any) => <StyledMarkdownH6>{children}</StyledMarkdownH6>,
        blockquote: ({ children }: any) => (
          <StyledMarkdownBlockquote>{children}</StyledMarkdownBlockquote>
        ),
        ul: ({ children }: any) => <StyledMarkdownUl>{children}</StyledMarkdownUl>,
        li: ({ children }: any) => <StyledMarkdownLi>{children}</StyledMarkdownLi>,
        th: ({ children }: any) => <StyledMarkdownTh>{children}</StyledMarkdownTh>,
        td: ({ children }: any) => <StyledMarkdownTd>{children}</StyledMarkdownTd>,
        pre: ({ children }: any) => <StyledMarkdownPre>{children}</StyledMarkdownPre>,
        code: ({ children }: any) => <StyledMarkdownCode>{children}</StyledMarkdownCode>
        } as any
      }
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
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={
        {
          p: ({ children }: any) => <StyledMarkdownTooltipP>{children}</StyledMarkdownTooltipP>,
          a: ({ href, children }: any) => (
          <StyledMarkdown
            onClick={(e) => {
              window.open(href, '_blank');
              e.stopPropagation();
            }}
            as="a"
          >
            {children}
          </StyledMarkdown>
        ),
        h1: ({ children }: any) => <StyledMarkdownH1>{children}</StyledMarkdownH1>,
        h2: ({ children }: any) => <StyledMarkdownH2>{children}</StyledMarkdownH2>,
        h3: ({ children }: any) => <StyledMarkdownH3>{children}</StyledMarkdownH3>,
        h4: ({ children }: any) => <StyledMarkdownH4>{children}</StyledMarkdownH4>,
        h5: ({ children }: any) => <StyledMarkdownH5>{children}</StyledMarkdownH5>,
        h6: ({ children }: any) => <StyledMarkdownH6>{children}</StyledMarkdownH6>,
        blockquote: ({ children }: any) => (
          <StyledMarkdownBlockquote>{children}</StyledMarkdownBlockquote>
        ),
        ul: ({ children }: any) => <StyledMarkdownUl>{children}</StyledMarkdownUl>,
        li: ({ children }: any) => <StyledMarkdownLi>{children}</StyledMarkdownLi>,
        th: ({ children }: any) => <StyledMarkdownTh>{children}</StyledMarkdownTh>,
        td: ({ children }: any) => <StyledMarkdownTd>{children}</StyledMarkdownTd>
        } as any
      }
    >
      {processDescription(content) as string}
    </ReactMarkdown>
  );
};

// Markdown support for notifications markdown content
export const BasicMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={
        {
          a: ({ href, children }: any) => (
          <BasicAnchorMarkdown
            onClick={(e) => {
              window.open(href, '_blank');
              e.stopPropagation();
            }}
            as="a"
          >
            {children}
          </BasicAnchorMarkdown>
        )
        } as any
      }
    >
      {content}
    </ReactMarkdown>
  );
};
