/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FileInfoType,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  TranslatableString,
  type WidgetProps,
  getTemplate,
  useFileWidgetProps
} from '@rjsf/utils';
import React, { type ChangeEvent } from 'react';
import { Box } from '../../../../base/Box';
import { Link } from '../../../../base/Link';
import { List } from '../../../../base/List';
import { ListItem } from '../../../../base/ListItem';
import { Typography } from '../../../../base/Typography';
import { useTheme } from '../../../../theme';

function FileInfoPreview<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  fileInfo,
  registry
}: {
  fileInfo: FileInfoType;
  registry: WidgetProps<T, S, F>['registry'];
}): React.JSX.Element | null {
  const { translateString } = registry;
  const { dataURL, type, name } = fileInfo;
  if (!dataURL) {
    return null;
  }
  if (type && (type.startsWith('image/') || ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'].includes(type))) {
    return (
      <img
        src={dataURL}
        alt={name || 'preview'}
        style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 4, marginTop: 8 }}
      />
    );
  }
  return (
    <Link
      download={`preview-${name}`}
      href={dataURL}
      sx={{ ml: 1, fontSize: '0.875rem' }}
    >
      {translateString(TranslatableString.PreviewLabel)}
    </Link>
  );
}

function FilesInfo<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  filesInfo,
  registry,
  preview,
  onRemove,
  options,
  disabled
}: {
  filesInfo: FileInfoType[];
  registry: WidgetProps<T, S, F>['registry'];
  preview?: boolean;
  onRemove: (index: number) => void;
  options: WidgetProps<T, S, F>['options'];
  disabled?: boolean;
}): React.JSX.Element | null {
  const theme = useTheme();
  if (filesInfo.length === 0) {
    return null;
  }
  const { RemoveButton } = getTemplate<'ButtonTemplates', T, S, F>(
    'ButtonTemplates',
    registry,
    options
  );

  return (
    <List dense sx={{ mt: 1 }}>
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        const handleRemove = (): void => {
          if (!disabled) {
            onRemove(key);
          }
        };
        return (
          <ListItem
            key={fileInfo.name ? `${fileInfo.name}-${key}` : key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              py: 0.5
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {name}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                ({type || 'unknown'}, {size ? `${(size / 1024).toFixed(1)} KB` : '0 KB'})
              </Typography>
              {preview && <FileInfoPreview fileInfo={fileInfo} registry={registry} />}
            </Box>
            <RemoveButton onClick={handleRemove} registry={registry} disabled={disabled} />
          </ListItem>
        );
      })}
    </List>
  );
}

/**
 * Sistent's `FileWidget` renders file upload inputs with Sistent-styled file list info and previews.
 */
export default function FileWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const { disabled, readonly, required, multiple, onChange, value, options, registry } = props;
  const { filesInfo, handleChange, handleRemove } = useFileWidgetProps(value, onChange, multiple);
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>(
    'BaseInputTemplate',
    registry,
    options
  );

  const handleOnChangeEvent = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      void handleChange(event.target.files);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BaseInputTemplate
        {...props}
        disabled={disabled || readonly}
        type="file"
        required={filesInfo.length > 0 ? false : required}
        onChangeOverride={handleOnChangeEvent}
        value=""
        accept={options.accept ? String(options.accept) : undefined}
      />
      <FilesInfo
        filesInfo={filesInfo}
        onRemove={handleRemove}
        registry={registry}
        preview={Boolean(options.filePreview)}
        options={options}
        disabled={disabled || readonly}
      />
    </Box>
  );
}
