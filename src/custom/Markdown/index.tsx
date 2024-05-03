import { useCallback, useEffect, useState } from 'react';
import remark from 'remark';
import html from 'remark-html';

interface RenderMarkdownProps {
  content: string;
}

const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  const convertMarkdownToHtml = useCallback(async () => {
    const result = await remark.remark().use(html).process(content);

    setHtmlContent(result.toString());
  }, [content]);

  useEffect(() => {
    // convert markdown to html (also sanitizes the html)
    convertMarkdownToHtml();
  }, [content, convertMarkdownToHtml]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default RenderMarkdown;
