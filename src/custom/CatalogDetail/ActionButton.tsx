import _ from 'lodash';
import React from 'react';
import { CircularProgress } from '../../base';
import { CopyIcon, KanvasIcon, PublishIcon } from '../../icons';
import Download from '../../icons/Download/Download';
import { charcoal } from '../../theme';
import { Pattern } from '../CustomCatalog/CustomCard';
import { downloadFilter, downloadYaml, slugify } from './helper';
import { ActionButton, LinkUrl, StyledActionWrapper, UnpublishAction } from './style';
import { RESOURCE_TYPES } from './types';

interface ActionButtonsProps {
  actionItems: boolean;
  details: Pattern;
  type: string;
  cardId: string;
  isCloneLoading: boolean;
  handleClone: (name: string, id: string) => void;
  mode: string;
  handleUnpublish?: () => void;
  isCloneDisabled: boolean;
  showOpenPlaygroundButton: boolean;
  showUnpublishAction: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  actionItems,
  details,
  type,
  cardId,
  isCloneLoading,
  handleClone,
  mode,
  isCloneDisabled,
  showOpenPlaygroundButton,
  showUnpublishAction,
  handleUnpublish
}) => {
  const cleanedType = type.replace('my-', '').replace(/s$/, '');
  const resourcePlaygroundType = Object.values({
    ..._.omit(RESOURCE_TYPES, ['FILTERS']),
    CATALOG: 'catalog'
  }).includes(cleanedType)
    ? cleanedType
    : 'design';
  return (
    <StyledActionWrapper>
      {actionItems && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.75rem',
            width: '100%'
          }}
        >
          <ActionButton
            sx={{
              borderRadius: '0.2rem',
              backgroundColor: charcoal[10],
              gap: '10px',
              color: charcoal[100]
            }}
            onClick={() =>
              cleanedType === RESOURCE_TYPES.FILTERS
                ? downloadFilter(details.id, details.name)
                : downloadYaml(details.pattern_file, details.name)
            }
          >
            <Download width={24} height={24} fill={charcoal[100]} />
            Download
          </ActionButton>

          {cleanedType !== RESOURCE_TYPES.FILTERS && (
            <ActionButton
              sx={{
                borderRadius: '0.2rem',
                gap: '10px',
                color: charcoal[100]
              }}
              onClick={() => handleClone(details?.name, details?.id)}
              disabled={isCloneDisabled}
            >
              {isCloneLoading ? (
                <CircularProgress size={24} color={'inherit'} />
              ) : (
                <>
                  <CopyIcon width={24} height={24} fill={charcoal[100]} />
                  Clone
                </>
              )}
            </ActionButton>
          )}
        </div>
      )}
      {showOpenPlaygroundButton && (
        <LinkUrl
          style={{ width: '100%' }}
          href={`https://playground.meshery.io/extension/meshmap?mode=${mode}&type=${resourcePlaygroundType}&id=${cardId}&name=${slugify(
            details.name
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <ActionButton
            sx={{
              borderRadius: '0.2rem',
              backgroundColor: 'background.cta.default',
              color: charcoal[10],
              gap: '10px',
              width: '100%'
            }}
          >
            <KanvasIcon width={24} height={24} primaryFill={charcoal[10]} fill={charcoal[10]} />
            Open in Playground
          </ActionButton>
        </LinkUrl>
      )}
      {showUnpublishAction && (
        <LinkUrl
          style={{ width: '100%' }}
          onClick={handleUnpublish}
          target="_blank"
          rel="noreferrer"
        >
          <UnpublishAction
            sx={{
              borderRadius: '0.2rem',
              gap: '10px',
              width: '100%'
            }}
          >
            <PublishIcon width={24} height={24} fill={charcoal[10]} />
            Unpublish
          </UnpublishAction>
        </LinkUrl>
      )}
    </StyledActionWrapper>
  );
};

export default ActionButtons;
