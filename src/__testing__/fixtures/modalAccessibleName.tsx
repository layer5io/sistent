// Type-level fixture for Modal accessible name contract (#1864).
// It is compiled by `modalAccessibleNameTypes.test.ts` via `tsc --noEmit`,
// never executed, and is deliberately outside jest's `*.test.*` glob so jest
// does not collect it.
import { Modal } from '../../custom/Modal';

const closeModal = () => {};

// Valid combination 1: title only
export const withTitle = <Modal open title="Visible Title" closeModal={closeModal} />;

// Valid combination 2: aria-label only
export const withAriaLabel = <Modal open aria-label="Accessible Label" closeModal={closeModal} />;

// Valid combination 3: aria-labelledby only
export const withAriaLabelledby = (
  <Modal open aria-labelledby="external-title-id" closeModal={closeModal} />
);

// Self-check / negative case: modal without title, aria-label, or aria-labelledby
// is rejected at compile time by the ModalProps union.
// @ts-expect-error Modal without title must provide aria-label or aria-labelledby
export const rejectsNameless = <Modal open closeModal={closeModal} />;
