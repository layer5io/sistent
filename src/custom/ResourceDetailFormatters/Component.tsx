import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import React, { useState } from 'react';
import { Grid, IconButton, Typography } from '../../base';
import { iconSmall, iconXSmall } from '../../constants/iconsSizes';
import { CopyIcon } from '../../icons';
import { useTheme } from '../../theme';
import { CustomTooltip } from './../CustomTooltip';
import { NumberState } from './Formatter';
import {
  Details,
  ElementDataWrap,
  Heading,
  KeyValueGrid,
  KeyValueGridCell,
  KeyValueGridTitle,
  LongWrap,
  StyledNumberBox,
  Title,
  VariableSubfield,
  Wrap
} from './styles';
import {
  ActionIconButtonProps,
  CategoryProps,
  CopyToClipboardProps,
  EnvironmentVariablesProps,
  KeyValueProps,
  LongDetailsProps,
  NumberStateFormatterProps,
  PrimaryDetailsProps,
  SectionHeadingProps
} from './types';
import { splitCamelCaseString } from './utils';

export const PrimaryDetails: React.FC<PrimaryDetailsProps> = ({ title, value, hide = false }) => {
  const titleFormatted = splitCamelCaseString(title);
  const show = hide === false ? hide : true;

  if (!value || value === ` `) {
    return null;
  }

  if (show) {
    return (
      <Details noPadding={true}>
        <Wrap>
          <Typography variant="body1">{titleFormatted}: </Typography>
          <ElementDataWrap>{value}</ElementDataWrap>
        </Wrap>
      </Details>
    );
  }
  return null;
};

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ data }) => {
  const theme = useTheme();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <IconButton onClickCapture={copyToClipboard} style={{ paddingBlock: '4px' }}>
        <CopyIcon height={20} width={20} fill={theme.palette.icon.secondary} />
      </IconButton>
    </span>
  );
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return <Typography variant="body1">{children + ':'}</Typography>;
};

export const LongDetails: React.FC<LongDetailsProps> = ({ title, value }) => {
  const titleFormatted = splitCamelCaseString(title);

  if (!value || value === ` `) {
    return null;
  }

  return (
    <Details noPadding={true}>
      <LongWrap>
        <SectionHeading>{titleFormatted}</SectionHeading>
        {/* <CodeFormatter data={value} /> */}
      </LongWrap>
    </Details>
  );
};

export const EnvironmentVariables: React.FC<EnvironmentVariablesProps> = ({ title, value }) => {
  return (
    <Details noPadding>
      <LongWrap>
        <VariableSubfield>
          {title}:{value}
        </VariableSubfield>
      </LongWrap>
    </Details>
  );
};

export const Category: React.FC<CategoryProps> = ({ title, hide = false }) => {
  const show = hide === false ? hide : true;

  if (show) {
    return (
      <Heading>
        <Title>{title}</Title>
      </Heading>
    );
  }
  return null;
};

export const NumberStateFormatter: React.FC<NumberStateFormatterProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <StyledNumberBox>
      {data.map((item) => (
        <NumberState
          key={item.title}
          title={item.title}
          value={item.value}
          quantity={item.quantity}
        />
      ))}
    </StyledNumberBox>
  );
};

export const ActionIconButton: React.FC<ActionIconButtonProps> = ({ title, Icon, onClick }) => {
  const theme = useTheme();
  return (
    <CustomTooltip title={title}>
      <div>
        <IconButton size="small" onClickCapture={onClick}>
          <Icon {...iconSmall} fill={theme.palette.icon.default} />
        </IconButton>
      </div>
    </CustomTooltip>
  );
};

export const KeyValueInRow: React.FC<KeyValueProps> = ({ Key, Value, showFold = false }) => {
  const [isFolded, setIsFolded] = useState(true);

  if (!Value || !Key) return null;

  const handleToggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <KeyValueGrid container>
      <React.Fragment key={Key}>
        <KeyValueGridCell container xs={3} spacing={1}>
          <KeyValueGridTitle>{Key}</KeyValueGridTitle>
          {showFold && (
            <IconButton onClick={handleToggleFold}>
              {isFolded ? (
                <UnfoldMoreIcon style={iconXSmall} />
              ) : (
                <UnfoldLessIcon style={iconXSmall} />
              )}
            </IconButton>
          )}
        </KeyValueGridCell>
        <Grid item xs={9}>
          <div
            style={{
              maxHeight: showFold && isFolded ? '200px' : 'none',
              overflow: showFold ? 'auto' : 'none'
            }}
          >
            {React.isValidElement(Value) ? Value : String(Value)}
          </div>
        </Grid>
      </React.Fragment>
    </KeyValueGrid>
  );
};
