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

  it('lets the card grow for a wrapped title instead of clipping to a fixed height', () => {
    // Regression: the outer wrapper used a fixed `height: 16rem`. When a long
    // title wrapped to two lines the inner card (which has its own minHeight)
    // overflowed the wrapper and overlapped the next card in the flex-wrap
    // grid. The wrapper must use minHeight so it expands to contain content.
    const { container } = renderWithTheme(
      <LearningCard
        tutorial={{
          frontmatter: {
            ...baseFrontmatter,
            title: 'DigitalOcean Certified AI Engineer (DO-CAIE) Exam'
          }
        }}
        courseCount={2}
        courseType="exam"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    const computed = window.getComputedStyle(wrapper);
    // JSDOM may keep rem as-authored or normalize it to px (1rem = 16px), so
    // accept either form rather than pinning the assertion to one.
    expect(['16rem', '256px']).toContain(computed.minHeight);
    // The wrapper must NOT carry a fixed height — that is what re-clips a
    // wrapped title. (JSDOM reports an unset height as '' or 'auto', so assert
    // it simply isn't fixed to the baseline rather than matching an exact "".)
    expect(computed.height).not.toBe('16rem');
    expect(computed.height).not.toBe('256px');
    // The wrapper is a flex column so the inner card chain stretches to equal
    // heights across a flex-wrap row (the consuming grid uses align-items:
    // stretch); without this a shorter card leaves empty space below its body.
    expect(computed.display).toBe('flex');
    expect(computed.flexDirection).toBe('column');
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
