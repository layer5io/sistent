import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ActionButton, Option } from '../custom/ActionButton';

describe('ActionButton Component', () => {
  const mockOptions: Option[] = [
    {
      label: 'Validate',
      icon: <span data-testid="icon-validate">V</span>,
      onClick: jest.fn()
    },
    {
      label: 'Dry Run',
      icon: <span data-testid="icon-dryrun">D</span>,
      onClick: jest.fn()
    },
    {
      label: 'Deploy',
      icon: <span data-testid="icon-deploy">Dep</span>,
      onClick: jest.fn(),
      disabled: true
    },
    {
      label: 'Hidden Option',
      icon: <span>H</span>,
      onClick: jest.fn(),
      show: false
    },
    {
      label: 'Divider',
      icon: null,
      onClick: jest.fn(),
      isDivider: true
    },
    {
      label: 'Undeploy',
      icon: <span data-testid="icon-undeploy">U</span>,
      onClick: jest.fn()
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default label "Action" when no label is passed', () => {
    render(<ActionButton options={mockOptions} />);
    expect(screen.getByRole('button', { name: /^Action$/i })).not.toBeNull();
  });

  it('renders with custom label when provided', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);
    expect(screen.getByRole('button', { name: /^Actions$/i })).not.toBeNull();
  });

  it('executes defaultActionClick when primary button is clicked and callback provided', () => {
    const handleDefaultClick = jest.fn();
    render(
      <ActionButton
        label="Actions"
        defaultActionClick={handleDefaultClick}
        options={mockOptions}
      />
    );

    const mainButton = screen.getByRole('button', { name: /^Actions$/i });
    fireEvent.click(mainButton);
    expect(handleDefaultClick).toHaveBeenCalledTimes(1);
  });

  it('toggles dropdown menu when primary button is clicked and defaultActionClick is not provided', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    expect(screen.queryByRole('menu')).toBeNull();
    const mainButton = screen.getByRole('button', { name: /^Actions$/i });
    fireEvent.click(mainButton);

    expect(screen.getByRole('menu')).not.toBeNull();
    expect(screen.getByText(mockOptions[0].label)).not.toBeNull();
  });

  it('toggles dropdown menu when the dropdown arrow button is clicked', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    expect(screen.queryByRole('menu')).toBeNull();

    const buttons = screen.getAllByRole('button');
    const dropdownArrowButton = buttons[1];

    // Open menu
    fireEvent.click(dropdownArrowButton);
    expect(screen.getByRole('menu')).not.toBeNull();

    mockOptions.forEach((option) => {
      if (option.show !== false && !option.isDivider) {
        expect(screen.getByText(option.label)).not.toBeNull();
      }
    });

    // Toggle menu closed
    fireEvent.click(dropdownArrowButton);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('calls option onClick handler and closes menu when an option is clicked', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    const buttons = screen.getAllByRole('button');
    const dropdownArrowButton = buttons[1];
    fireEvent.click(dropdownArrowButton);

    const validateItem = screen.getByText(mockOptions[0].label);
    fireEvent.click(validateItem);

    expect(mockOptions[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('does not invoke onClick for disabled options', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    const deployItem = screen.getByText(mockOptions[2].label);
    fireEvent.click(deployItem);

    expect(mockOptions[2].onClick).not.toHaveBeenCalled();
  });

  it('does not render options with show set to false', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(screen.queryByText(mockOptions[3].label)).toBeNull();
  });

  it('disables primary button when defaultActionDisabled is true', () => {
    render(<ActionButton label="Actions" defaultActionDisabled={true} options={mockOptions} />);

    const mainButton = screen.getByRole('button', { name: /^Actions$/i });
    expect(mainButton.hasAttribute('disabled')).toBe(true);
  });

  it('anchors popper with default placement bottom-end', () => {
    render(<ActionButton label="Actions" options={mockOptions} />);

    const buttons = screen.getAllByRole('button');
    const dropdownArrowButton = buttons[1];
    fireEvent.click(dropdownArrowButton);

    const menu = screen.getByRole('menu');
    expect(menu).not.toBeNull();

    const popper = menu.closest('[data-popper-placement]');
    expect(popper).not.toBeNull();
    expect(popper?.getAttribute('data-popper-placement')).toBe('bottom-end');
  });

  it('anchors popper with custom placement when provided', () => {
    render(
      <ActionButton label="Actions" options={mockOptions} placement="bottom-start" />
    );

    const buttons = screen.getAllByRole('button');
    const dropdownArrowButton = buttons[1];
    fireEvent.click(dropdownArrowButton);

    const menu = screen.getByRole('menu');
    expect(menu).not.toBeNull();

    const popper = menu.closest('[data-popper-placement]');
    expect(popper).not.toBeNull();
    expect(popper?.getAttribute('data-popper-placement')).toBe('bottom-start');
  });
});
