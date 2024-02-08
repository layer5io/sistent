import { List, ListItemButton } from '@layer5/sistent';
import { Fragment } from 'react';

import { ExtensionPointContent } from './extensionPointContent';

const RenderAccountExtension = ({ accountExtensions }) => {
  if (accountExtensions && accountExtensions.length > 0) {
    return (
      <List disablePadding>
        {accountExtensions.map(({ id, href, title, show: showc }) => {
          if (typeof showc !== 'undefined' && !showc) {
            return '';
          }
          return (
            <Fragment key={id}>
              <ListItemButton key={id}>
                <ExtensionPointContent
                  href={href}
                  name={name}
                  updateExtensionType={updateExtensionType}
                />
              </ListItemButton>
            </Fragment>
          );
        })}
      </List>
    );
  }
};

export default RenderAccountExtension;
