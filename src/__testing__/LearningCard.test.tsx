import { render } from '@testing-library/react';
import React from 'react';
import { LearningCard } from '../custom/LearningCard';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

const baseFrontmatter = {
  disabled: 'no',
  themeColor: '#00b39f',
  title: 'INTRO Compliance',
  courseTitle: 'INTRO Compliance',
  description: 'How to be compliant in the cloud.',
  type: 'learning-path',
  level: 'beginner'
};

describe('LearningCard', () => {
  it('renders the banner img when cardImage is provided', () => {
    const { container } = renderWithTheme(
      <LearningCard
        tutorial={{
          frontmatter: { ...baseFrontmatter, cardImage: '/banner.svg' }
        }}
        courseCount={3}
        courseType="course"
      />
    );

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('/banner.svg');
    expect(img?.getAttribute('alt')).toBe(baseFrontmatter.title);
  });

  it('omits the img when cardImage is an empty string', () => {
    // Regression: empty src caused the browser to load the current page
    // URL as the image, producing a broken-image icon at the bottom of
    // every academy card that lacks a banner.
    const { container } = renderWithTheme(
      <LearningCard
        tutorial={{
          frontmatter: { ...baseFrontmatter, cardImage: '' }
        }}
        courseCount={1}
        courseType="course"
      />
    );

    expect(container.querySelector('img')).toBeNull();
  });

  it('omits the img when cardImage is undefined', () => {
    const { container } = renderWithTheme(
      <LearningCard
        tutorial={{
          frontmatter: { ...baseFrontmatter }
        }}
        courseCount={1}
        courseType="course"
      />
    );

    expect(container.querySelector('img')).toBeNull();
  });

  it('omits the img on the disabled "Coming Soon" branch when cardImage is missing', () => {
    const { container } = renderWithTheme(
      <LearningCard
        tutorial={{
          frontmatter: { ...baseFrontmatter, disabled: 'yes', cardImage: '' }
        }}
        courseCount={0}
        courseType="course"
      />
    );

    expect(container.querySelector('img')).toBeNull();
  });
});
