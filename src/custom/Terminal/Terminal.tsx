import { FC, Fragment } from 'react';
import {
  CodeWrapper,
  Content,
  OverflowWrapper,
  TerminalWrapper,
  TitleBar,
  WindowControls
} from './style';

interface Line {
  short?: boolean;
  color?: string;
  indent?: number;
  code: string;
}

interface Props {
  lines: Line[];
  title?: string;
  noScroll?: boolean;
}

const Terminal: FC<Props> = ({ lines, title, noScroll }) => {
  return (
    <TerminalWrapper>
      <TitleBar>
        <WindowControls>
          <li style={{ backgroundColor: 'red' }} />
          <li style={{ backgroundColor: 'yellow' }} />
          <li style={{ backgroundColor: 'green' }} />
        </WindowControls>
        {title && <div className="title">{title}</div>}
      </TitleBar>
      <Content>
        <OverflowWrapper className={noScroll ? 'no-scroll-overflow-wrapper' : ''}>
          <CodeWrapper>
            {lines &&
              lines.map((line, index) => (
                <Fragment key={index}>
                  <pre
                    className={`${line.short ? 'short' : ''}`}
                    style={{ color: line.color ? line.color : 'blue' }}
                  >
                    {line.indent &&
                      new Array(line.indent * 2)
                        .fill({})
                        .map((_, index) => <Fragment key={index}>&nbsp;</Fragment>)}
                    {line.code}
                  </pre>
                </Fragment>
              ))}
          </CodeWrapper>
        </OverflowWrapper>
      </Content>
    </TerminalWrapper>
  );
};

export default Terminal;
