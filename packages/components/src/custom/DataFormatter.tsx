import { CloneIcon, LaunchIcon } from '@layer5/sistent-svg';
import { truncate } from 'lodash';
import React, { createContext, useContext } from 'react';
import { Box } from '../base/Box';
import { Grid } from '../base/Grid';
import { IconButton } from '../base/IconButton';
import { Tooltip } from '../base/Tooltip';
import { Typography } from '../base/Typography';

interface FormatterContextProps {
  propertyFormatters: Record<
    string,
    (value: unknown, originalData: Record<string, unknown>) => React.ReactNode
  >;
}

const FormatterContext = createContext<FormatterContextProps>({
  propertyFormatters: {}
});

const LevelContext = createContext<number>(0);

interface LevelProps {
  children: React.ReactNode;
}

const Level: React.FC<LevelProps> = ({ children }) => {
  const level = useContext(LevelContext);
  return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>;
};

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

export const formatTime = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const formattedTime = new Date(date).toLocaleTimeString('en-US', options);
  return formattedTime;
};

export const formatDateTime = (date: string): string => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  return `${formattedDate} ${formattedTime || ''}`;
};

interface FormattedDateProps {
  date: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return (
    <Tooltip title={formatDateTime(date)} placement="top">
      <div>
        <Typography
          variant="body1"
          style={{
            wordWrap: 'break-word',
            color: '#ffffff',
            textTransform: 'capitalize'
          }}
        >
          {formatDate(date)}
        </Typography>
      </div>
    </Tooltip>
  );
};

interface FormatIdProps {
  id: string;
  length: number;
}

export const FormatId: React.FC<FormatIdProps> = ({ id, length }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const truncatedId: string = truncate(id, { length: length }) as string;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <Tooltip title={id} placement="top">
        <Typography
          variant="body2"
          style={{
            cursor: 'pointer',
            color: '#ffffff'
          }}
        >
          {truncatedId}
        </Typography>
      </Tooltip>
      <Tooltip title="Copy" placement="top">
        <IconButton onClick={copyToClipboard} style={{ padding: '0.25rem' }}>
          <CloneIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

interface LinkProps {
  href: string;
  title: string;
}

export const Link: React.FC<LinkProps> = ({ href, title }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'inherit',
        textDecorationLine: 'underline',
        cursor: 'pointer',
        marginBottom: '0.5rem'
      }}
    >
      {title}
      <sup>
        <LaunchIcon />
      </sup>
    </a>
  );
};
interface LinkFormatter {
  base_url: string;
  formatter: (link: string) => JSX.Element;
}

const LinkFormatters: Record<string, LinkFormatter> = {
  DOC: {
    base_url: 'https://docs.meshery.io',
    formatter: (link) => <Link title="Doc" href={link} />
  },
  DEFAULT: {
    base_url: '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    formatter: (link) => <Link title={truncate(link, { length: 30 })} href={link} />
  }
};

function getFormattedLink(url: string): JSX.Element {
  for (const formatter of Object.values(LinkFormatters)) {
    if (url.startsWith(formatter.base_url)) {
      return formatter.formatter(url);
    }
  }

  return LinkFormatters.DEFAULT.formatter(url);
}

interface TextWithLinksProps {
  text: string;
  typographyProps?: React.ComponentProps<typeof Typography>;
  style?: React.CSSProperties;
}

export const TextWithLinks: React.FC<TextWithLinksProps> = ({ text, typographyProps }) => {
  // Regular expression to find HTTP links in the text
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text into parts, alternating between text and link components
  const parts = text.split(linkRegex);

  // Map the parts to React elements
  const elements = parts.map((part, idx) => {
    if (part.match(linkRegex)) {
      // If the part is a link, wrap it in a Link component
      return getFormattedLink(part);
    } else {
      return <span key={idx}>{part}</span>;
    }
  });

  return <Typography {...typographyProps}>{elements}</Typography>;
};

interface KeyValueProps {
  Key: string;
  Value: React.ReactNode | string;
}

export const KeyValue: React.FC<KeyValueProps> = ({ Key, Value }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.25rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        fontFamily: 'Qanelas Soft, sans-serif'
      }}
    >
      <SectionBody
        body={Key.replaceAll('_', ' ')}
        style={{
          textTransform: 'capitalize',
          color: '#fff'
        }}
      />
      {React.isValidElement(Value) ? (
        Value
      ) : (
        <SectionBody
          body={Value?.toString() ?? ''} // Ensure Value is a string
          style={{
            color: '#fff',
            textOverflow: 'ellipsis',
            wordBreak: 'break-all'
          }}
        />
      )}
    </div>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  level?: number;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, ...props }) => {
  const level = useContext(LevelContext);
  const fontSize = Math.max(0.9, 1.3 - 0.1 * level) + 'rem';
  const margin = Math.max(0.25, 0.55 - 0.15 * level) + 'rem';

  return (
    <Typography
      variant="h5"
      style={{
        fontWeight: 'bold !important',
        textTransform: 'capitalize',
        marginBottom: margin,
        wordBreak: 'break-all',
        fontSize
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

interface SectionBodyProps {
  body: string;
  style?: React.CSSProperties;
}

export const SectionBody: React.FC<SectionBodyProps> = ({ body, style = {} }) => {
  return (
    <TextWithLinks
      style={{
        wordWrap: 'break-word',
        color: '#ffffff',
        ...style
      }}
      text={body}
    ></TextWithLinks>
  );
};

interface ArrayFormatterProps {
  items: (Record<string, unknown> | string | string[] | null)[];
}

const ArrayFormatter: React.FC<ArrayFormatterProps> = ({ items }) => {
  return (
    <ol style={{ paddingInline: '0.75rem', paddingBlock: '0.25rem', margin: '0rem' }}>
      {items.map((item) => (
        <li key={item as string}>
          <Level>
            <DynamicFormatter data={item} />
          </Level>
        </li>
      ))}
    </ol>
  );
};

interface DynamicFormatterProps {
  data: Record<string, unknown> | string | string[] | null;
  uiSchema?: Record<string, unknown>;
  level?: number;
}
const isEmpty = (obj: Record<string, unknown>) => Object.keys(obj).length === 0;
const DynamicFormatter: React.FC<DynamicFormatterProps> = ({ data, uiSchema }) => {
  const { propertyFormatters } = useContext(FormatterContext);
  const level = useContext(LevelContext);
  if (typeof data === 'string') {
    return <SectionBody body={data}></SectionBody>;
  }

  if (Array.isArray(data)) {
    return <ArrayFormatter items={data} />;
  }

  if (typeof data === 'object' && data !== null && !isEmpty(data)) {
    return Object.entries(data).map(([title, data]) => {
      if (!title.trim() || !data) {
        return null;
      }
      if (propertyFormatters?.[title]) {
        return (
          <Grid item key={title} sm={12} {...(uiSchema?.[title] || {})}>
            {propertyFormatters[title](
              data as Record<string, unknown>,
              data as Record<string, unknown>
            )}
          </Grid>
        );
      }
      if (typeof data == 'string') {
        return (
          <Grid item key={title} sm={12} {...(uiSchema?.[title] || {})}>
            <KeyValue key={title} Key={title} Value={data} />
          </Grid>
        );
      }

      return (
        <Grid
          item
          key={title}
          sm={12}
          {...(uiSchema?.[title] || {})}
          style={{
            marginBlock: '0.25rem'
          }}
        >
          <SectionHeading level={level}>{title}</SectionHeading>
          <Level>
            <DynamicFormatter level={level + 1} data={data as Record<string, unknown>} />
          </Level>
        </Grid>
      );
    });
  }

  return null;
};
