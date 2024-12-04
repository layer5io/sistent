import { ListItemText } from '@layer5/sistent';
import Link from 'next/link';
import React from 'react';

export const ExtensionPointContent = ({ href, name, updateExtensionType }) => {
  const content = (
    <div>
      <ListItemText>{name}</ListItemText>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <span onClick={() => updateExtensionType(name)}>{content}</span>
      </Link>
    );
  }
  return content;
};
