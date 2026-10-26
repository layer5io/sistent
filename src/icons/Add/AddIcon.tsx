import { createIcon } from '../createIcon';

export const AddIcon = createIcon({
  displayName: 'AddIcon',
  d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  defaultProps: {
    'data-testid': 'add-icon-svg'
  }
});

export default AddIcon;
