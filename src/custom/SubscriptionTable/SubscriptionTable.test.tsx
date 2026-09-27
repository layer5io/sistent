import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubscriptionTable, PlanFeature } from './SubscriptionTable';

const mockFeatures: PlanFeature[] = [
  {
    featureName: 'Cloud Storage',
    freePlan: '5GB',
    teamPlan: '50GB',
    enterprisePlan: 'Unlimited'
  },
  {
    featureName: 'Priority Support',
    freePlan: false,
    teamPlan: true,
    enterprisePlan: true
  }
];

describe('SubscriptionTable Component', () => {
  it('renders table title and feature rows correctly', () => {
    render(<SubscriptionTable title="Custom Pricing Table" features={mockFeatures} />);
    expect(screen.getByText('Custom Pricing Table')).toBeInTheDocument();
    expect(screen.getByText('Cloud Storage')).toBeInTheDocument();
    expect(screen.getByText('Priority Support')).toBeInTheDocument();
    expect(screen.getByText('5GB')).toBeInTheDocument();
  });

  it('renders boolean indicators with accessibility labels', () => {
    render(<SubscriptionTable features={mockFeatures} />);
    // Assert actual accessible text labels instead of test IDs
    expect(screen.getAllByLabelText('Included').length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText('Not included').length).toBeGreaterThan(0);
  });

  it('calls onPlanSelect when action buttons are clicked', () => {
    const handlePlanSelect = jest.fn();
    render(<SubscriptionTable features={mockFeatures} onPlanSelect={handlePlanSelect} />);

    fireEvent.click(screen.getByText('Get Started'));
    expect(handlePlanSelect).toHaveBeenCalledWith('free');

    fireEvent.click(screen.getByText('Upgrade'));
    expect(handlePlanSelect).toHaveBeenCalledWith('team');

    fireEvent.click(screen.getByText('Contact Us'));
    expect(handlePlanSelect).toHaveBeenCalledWith('enterprise');
  });

  it('renders custom labels when passed via props', () => {
    render(
      <SubscriptionTable
        features={mockFeatures}
        featuresLabel="Key Capabilities"
        freePlanLabel="Starter"
        freePlanButtonLabel="Join Now"
      />
    );
    expect(screen.getByText('Key Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Join Now')).toBeInTheDocument();
  });
});
