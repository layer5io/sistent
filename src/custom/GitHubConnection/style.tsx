import { alpha, styled, type Palette } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { Accordion, Box, Button, StepConnector } from '../../base';
import { charcoal } from '../../theme/colors/colors';

/**
 * Presentational styles for the GitHub connection primitives.
 *
 * The wizard values are lifted from Meshery Cloud's connect wizard
 * (`ui/components/connect/styles.tsx`, `stepper/info-panel.tsx`,
 * `stepper/stepper-content.tsx`) and re-expressed in Sistent tokens, so the
 * light theme matches Cloud and the dark theme stops depending on values that
 * only work on a white page (Cloud's `#d7d7d9` rings and its
 * `brand -> text.default` gradient, which turns white in dark mode). The notice
 * callouts follow `DangerConfirmationModal`'s tinted, left-ruled convention.
 */

/** Diameter of a step badge; Cloud and `CustomizedStepper` both use 50px. */
const STEP_ICON_SIZE = 50;
const STEP_ICON_SIZE_COMPACT = 35;
/** Ring width of a step badge, drawn with `outline` so it never shifts layout. */
const STEP_RING_WIDTH = 3;

export const WizardRoot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minWidth: 0
}));

/**
 * Horizontal scroller for the step rail: seven steps need ~560px, so narrow
 * hosts (a Kanvas side panel, a phone) scroll the rail instead of crushing it.
 */
export const StepRail = styled(Box)(({ theme }) => ({
  // Positioned so a step's offsetLeft is measured from the rail when the
  // wizard scrolls the active step into view.
  position: 'relative',
  width: '100%',
  overflowX: 'auto',
  // Room for the badge ring, which `outline` paints outside the box.
  paddingTop: STEP_RING_WIDTH,
  marginBottom: theme.spacing(3),
  '& .MuiStepper-root': {
    minWidth: 560,
    padding: 0
  },
  '& .MuiStep-root': {
    padding: theme.spacing(0, 0.5)
  },
  '& .MuiStepLabel-labelContainer': {
    width: '100%'
  },
  '& .MuiStepLabel-label': {
    display: 'block',
    width: '100%',
    maxWidth: 'none',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  '& .MuiStepLabel-label.Mui-active, & .MuiStepLabel-label.Mui-completed': {
    color: theme.palette.text.default
  }
}));

export const StepLabelPrimary = styled('span')(({ theme }) => ({
  ...theme.typography.textL2Regular,
  display: 'block',
  lineHeight: 1.2
}));

export const StepLabelSecondary = styled('span')(({ theme }) => ({
  ...theme.typography.textL2Regular,
  display: 'block',
  fontSize: '0.7rem',
  lineHeight: 1.2
}));

export const WizardStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    // Vertically centres the 3px line on the 50px badge.
    top: (STEP_ICON_SIZE - STEP_RING_WIDTH) / 2,
    left: `calc(-50% + ${STEP_ICON_SIZE / 2 + STEP_RING_WIDTH}px)`,
    right: `calc(50% + ${STEP_ICON_SIZE / 2 + STEP_RING_WIDTH}px)`,
    [theme.breakpoints.down('md')]: {
      top: (STEP_ICON_SIZE_COMPACT - STEP_RING_WIDTH) / 2,
      left: `calc(-50% + ${STEP_ICON_SIZE_COMPACT / 2 + STEP_RING_WIDTH}px)`,
      right: `calc(50% + ${STEP_ICON_SIZE_COMPACT / 2 + STEP_RING_WIDTH}px)`
    }
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}, &.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]:
    {
      borderColor: theme.palette.background.brand?.default
    },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: STEP_RING_WIDTH,
    borderColor: theme.palette.background.tertiary,
    borderRadius: 1
  }
}));

export interface StepBadgeOwnerState {
  active: boolean;
  completed: boolean;
  optional: boolean;
}

export const StepBadge = styled('div', {
  shouldForwardProp: (prop) => prop !== 'ownerState'
})<{ ownerState: StepBadgeOwnerState }>(({ theme, ownerState }) => {
  const { active, completed, optional } = ownerState;
  const brand = theme.palette.background.brand?.default;
  const ringStyle = optional ? 'dashed' : 'solid';
  const ringColor = active || completed ? brand : theme.palette.background.tertiary;

  return {
    zIndex: 1,
    width: STEP_ICON_SIZE,
    height: STEP_ICON_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: completed ? brand : theme.palette.background.card,
    color: completed ? theme.palette.text.constant?.white : theme.palette.icon.secondary,
    outline: `${STEP_RING_WIDTH}px ${ringStyle} ${ringColor}`,
    transition: theme.transitions.create(['background-color', 'outline-color', 'color'], {
      duration: theme.transitions.duration.short
    }),
    '& svg': {
      width: 24,
      height: 24,
      // Hosts may pass icons with hard-coded fills (Cloud's own step icons do).
      // On the filled "completed" badge, force them to the same white glyph as
      // `currentColor` icons rather than leaving a dark icon on brand teal.
      ...(completed && { filter: 'brightness(0) invert(1)' })
    },
    [theme.breakpoints.down('md')]: {
      width: STEP_ICON_SIZE_COMPACT,
      height: STEP_ICON_SIZE_COMPACT,
      '& svg': {
        width: 18,
        height: 18
      }
    }
  };
});

export const WizardBody = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasInfo'
})<{ hasInfo: boolean }>(({ theme, hasInfo }) => ({
  display: 'grid',
  gridTemplateColumns: hasInfo ? 'minmax(0, 2fr) minmax(0, 3fr)' : 'minmax(0, 1fr)',
  gap: theme.spacing(4),
  alignItems: 'stretch',
  minHeight: 0,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)'
  }
}));

/**
 * The explanatory pane. Cloud draws it as a brand-to-ink gradient; the ink end
 * is pinned to `charcoal[10]` (Cloud's light-mode `text.default`) because the
 * semantic text token flips to near-white in dark mode, which turned Cloud's
 * panel into white text on a white gradient.
 */
export const InfoPane = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  color: theme.palette.text.constant?.white,
  background: `linear-gradient(359deg, ${theme.palette.background.brand?.default} -6.26%, ${charcoal[10]} 85.81%)`,
  '& a': {
    color: 'inherit',
    textDecoration: 'underline'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const ActionPane = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0
}));

export const StepFrame = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minWidth: 0
}));

export const StepBody = styled(Box)(() => ({
  flexGrow: 1,
  minWidth: 0
}));

/** Cloud's tips strip: a faint brand wash behind supporting copy. */
export const TipsCallout = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.brand?.default ?? theme.palette.primary.main, 0.1)
}));

export const StepFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

export const FooterGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

/**
 * Cloud's grey BACK / CANCEL button: the design system's `button-secondary`
 * (`colors.secondary` fill, `on-secondary` text), via the neutral background
 * token so it inverts correctly in dark mode.
 */
export const NeutralButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.background.neutral?.default,
    color: theme.palette.text.inverse,
    '&:hover': {
      backgroundColor: theme.palette.background.neutral?.hover
    }
  }
}));

export type NoticeTone = 'neutral' | 'success' | 'error' | 'warning' | 'info';

const toneColor = (palette: Palette, tone: NoticeTone): string | undefined => {
  switch (tone) {
    case 'success':
      return palette.status.success;
    case 'error':
      return palette.status.error;
    case 'warning':
      return palette.status.warning;
    case 'info':
      return palette.status.info;
    default:
      return undefined;
  }
};

export const NoticeCallout = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tone'
})<{ tone: NoticeTone }>(({ theme, tone }) => {
  const accent = toneColor(theme.palette, tone) ?? theme.palette.border.normal;
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.shape.borderRadius,
    borderLeft: `3px solid ${accent}`,
    backgroundColor: alpha(accent, 0.08),
    color: theme.palette.text.default,
    overflowWrap: 'anywhere',
    '& > svg, & > .MuiCircularProgress-root': {
      flexShrink: 0,
      marginTop: 2,
      color: accent
    }
  };
});

export const NoticeContent = styled(Box)(() => ({
  flex: 1,
  minWidth: 0
}));

export const NoticeEmpty = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(4, 2),
  color: theme.palette.text.secondary,
  '& > svg': {
    color: theme.palette.icon.secondary,
    opacity: 0.6
  }
}));

export const NoticeActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1, 2),
  marginTop: theme.spacing(1.5)
}));

export const StatusRoot = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(0.5),
  minWidth: 0
}));

export const StatusRow = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0
}));

export const StatusPill = styled('span', {
  shouldForwardProp: (prop) => prop !== 'accent'
})<{ accent: string }>(({ theme, accent }) => ({
  ...theme.typography.textB3Regular,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  padding: theme.spacing(0.25, 1.25, 0.25, 1),
  borderRadius: 9999,
  border: `1px solid ${alpha(accent, 0.5)}`,
  backgroundColor: alpha(accent, 0.12),
  // The label stays on the default ink; the state colour lives on the icon and
  // the tint, because state colours like keppel teal fail 4.5:1 as body text.
  color: theme.palette.text.default,
  position: 'relative',
  whiteSpace: 'nowrap',
  '& .github-status-indicator': {
    display: 'inline-flex',
    color: accent
  }
}));

export const StatusIdentity = styled('span')(({ theme }) => ({
  ...theme.typography.textB3Regular,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  minWidth: 0,
  color: theme.palette.text.default,
  fontWeight: 600,
  overflowWrap: 'anywhere',
  '& > svg': {
    flexShrink: 0,
    color: theme.palette.icon.default
  }
}));

/**
 * The file tree's scroll container. Cloud scrolls each repository's tree
 * inside its accordion and pages in more files at the bottom.
 */
export const FileTreeScroller = styled(Box)(() => ({
  overflowY: 'auto',
  overflowX: 'hidden',
  minWidth: 0
}));

export const FileTreeList = styled('ul', {
  shouldForwardProp: (prop) => prop !== 'nested'
})<{ nested?: boolean }>(({ theme, nested }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  ...(nested && {
    // Cloud's guide line down an expanded folder, aligned under its chevron.
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
    borderLeft: `1.5px solid ${theme.palette.border.normal}`
  })
}));

export const FileTreeRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<{ selected?: boolean }>(({ theme, selected }) => ({
  // Anchors a visually hidden control, so focusing it scrolls its own row into view.
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  minWidth: 0,
  padding: theme.spacing(0.25, 1, 0.25, 0.5),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.default,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  // The single-select file row: the selected tint of a MUI menu item, as on
  // `GitHubRepositoryPicker singleSelect`, with the focus ring of its hidden control.
  ...(selected && {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
      )
    }
  }),
  '&:has(input.choice:focus-visible)': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2
  },
  '& > svg': {
    flexShrink: 0,
    color: theme.palette.icon.secondary
  },
  // Holds the place of a folder's disclosure button so file and folder icons align.
  '& .slot': {
    flexShrink: 0,
    width: 24,
    height: 24
  },
  '& .label': {
    flex: 1,
    minWidth: 0,
    overflowWrap: 'anywhere'
  },
  '& .disclosure': {
    color: theme.palette.icon.secondary,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  '& .disclosure.expanded': {
    transform: 'rotate(90deg)'
  }
}));

export const FileTreeStatus = styled('span', {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: 'imported' | 'error' }>(({ theme, status }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  color: status === 'imported' ? theme.palette.status.success : theme.palette.status.error
}));

export const FileTreeEmpty = styled(Box)(({ theme }) => ({
  ...theme.typography.textB3Regular,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.border.normal}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.secondary
}));

/**
 * A repository's section on the import and Finish steps. Cloud draws it with a
 * `text.disabled` border and header fill, which reads as a gray slab in dark
 * mode; the border and header here use the surface tokens instead.
 */
export const RepositorySectionRoot = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.normal}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.card,
  boxShadow: 'none',
  '&::before': {
    display: 'none'
  },
  '& .MuiAccordionSummary-root': {
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.default
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.icon.secondary
  },
  '& .MuiAccordionSummary-content': {
    minWidth: 0
  }
}));

export const RepositorySectionTitle = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  width: '100%',
  minWidth: 0,
  marginRight: theme.spacing(1),
  '& .name': {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 500
  },
  '& .badges': {
    display: 'inline-flex',
    flexShrink: 0,
    gap: theme.spacing(0.5)
  }
}));

/**
 * Count badge in a repository header. Cloud filled it with the brand or error
 * colour under white text; the tint-and-ink form keeps the count legible in
 * both modes, as `StatusPill` does.
 */
export const CountBadge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone'
})<{ tone: NoticeTone }>(({ theme, tone }) => {
  const accent = toneColor(theme.palette, tone) ?? theme.palette.border.strong;
  return {
    ...theme.typography.textB3Regular,
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    borderRadius: 9999,
    border: `1px solid ${alpha(accent, 0.5)}`,
    backgroundColor: alpha(accent, 0.12),
    color: theme.palette.text.default,
    whiteSpace: 'nowrap'
  };
});

export const FinishList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: 0,
  '& ul.outcomes': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: theme.spacing(1)
  },
  '& .MuiAccordionDetails-root': {
    overflowWrap: 'anywhere'
  }
}));

/** Mirrors MUI's `visuallyHidden` utility. */
const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
} as const;

/** Text for assistive technology only. */
export const VisuallyHidden = styled('span')(visuallyHidden);

/** A native control that keeps its semantics and keyboard behaviour but draws nothing. */
export const VisuallyHiddenInput = styled('input')(visuallyHidden);
