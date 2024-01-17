import React from 'react';
import Paragraph from '../../UI/Paragraph';
import ColorStylesWrapper from './color.style';
import ContentHeading1 from '../../UI/ContentHeading1';
import ContentHeading2 from '../../UI/ContentHeading2';
import TonalPalettes from '../../../assets/images/TonalPalettes.svg';
import ContextVisuals1 from '../../../assets/images/ContextVisuals1.svg';
import ContextVisuals2 from '../../../assets/images/ContextVisuals2.svg';
import ContextVisuals3 from '../../../assets/images/ContextVisuals3.svg';
import ContextVisuals4 from '../../../assets/images/ContextVisuals4.svg';

const Overview = () => {
  return (
    <ColorStylesWrapper>
      <Paragraph>
        In order to achieve the aim of maintaining a consistent and engaging digital interface
        across Layer5, whether it is in the form of websites, applications, or experiences, a
        detailed explanation of color application along with practical use cases is needed. To this
        end, the following concepts help to shape a suitable identity as we aim for balance
        throughout our User Interface.
      </Paragraph>
      <div className="section">
        <ContentHeading1>Introduction</ContentHeading1>
        <Paragraph>
          When the color palette is accurately put to use, it ensures a recognizable consistency in
          Layer5’s array of digital interfaces and products. This is made possible due to adherence
          to well defined rules which though specific, are also flexible and give ample room for
          professionals to curate appealing solutions across themes.
        </Paragraph>
      </div>
      <div className="section">
        <ContentHeading1>The Basics</ContentHeading1>
        <Paragraph>
          Let’s start with a few of the common terms that we will come across frequently, as
          understanding what they mean will inform us of applicable use cases and proper procedures
          that should not be overlooked.
        </Paragraph>
        <ContentHeading2>Theme</ContentHeading2>
        <Paragraph>
          By definition, a theme is a cohesive and consistent look and feel for a product. This
          consistent look can be achieved with the use of harmonious color palettes, legible fonts
          and layout patterns. Currently, sistent outlines specifications for light and dark themes.
        </Paragraph>
        <ContentHeading2>Value</ContentHeading2>
        <Paragraph>
          A value is the unique visual attribute assigned to a token through the use of themes. This
          could range from hex codes to rgba values which are used to highlight specific colors in
          any given instance. We highly recommend that no exact values be referenced anywhere in the
          design in order to avoid errors and ensure consistency. Instead, tokens should be used to
          curate and implement the reusable values. More on tokens next.
        </Paragraph>
        <ContentHeading2>Tokens</ContentHeading2>
        <Paragraph>
          Tokens can be regarded as a shared language between design and development for
          communicating detailed information about how to build user interfaces. Generally, a rule
          of thumb is to represent the context (background, text, component), role (success,
          warning, brand, inverse), and modifier(s) (secondary, tertiary, hover) in a string of text
          that will represent set values gotten from the colors in the color palette.
        </Paragraph>
        <ContentHeading2>Role</ContentHeading2>
        <Paragraph>
          Roles are parameters that specify the context that colors are being applied to and while
          different roles can share the same value, the token structure means that they will have
          different use cases. These values can be different though depending on the current theme.
        </Paragraph>
      </div>
      <div className="section">
        <ContentHeading1>Color Anatomy</ContentHeading1>
        <Paragraph>
          Sistent’s default themes are derived from Layer5’s color palette of which the Keppel Green
          color serves as the dominant primary action color with subtle shifts in value to enable
          the required visual accessibility as recommended in the WCAG (Web Content Accessibility
          Guidelines) 2.1 compliance standards. It is also sometimes combined with Saffron Yellow
          and Caribbean Green colors accentuate some other parts of the user interface like CTA
          buttons as well as illustrations and icons.
        </Paragraph>
        <Paragraph>
          The Charcoal color as well as another accent grey serve as neutrals to complement these
          greens and create harmonious implementations. These five colors combine to form a
          foundation for the color system.
        </Paragraph>
        <div className="image">
          <img src={TonalPalettes} alt="Color Tonal Palettes" />
        </div>
      </div>
      <div className="section">
        <ContentHeading1>Layer Hierarchy</ContentHeading1>
        <Paragraph>
          For backgrounds and surfaces, colors in the neutral palettes are used cohesively to create
          depth and spatial associations. This hierarchical pattern defines the logic of how colors
          stack on top of each other in a UI when implementing Sistent themes. This logical pattern
          goes beyond just themes but is also built across components and accounted for in suggested
          color tokens as well.
        </Paragraph>
        <Paragraph>
          There is an alternate relationship between the layer hierarchy in both light and dark
          themes:
          <ul>
            <li>
              In the light theme, as layers are stacked towards the topmost surface, they become
              progressively darker.
            </li>
            <li>
              In the dark theme, as layers are stacked towards the topmost surface, they become
              progressively lighter.
            </li>
          </ul>
          <div>
            This means, in effect, that while there is a fine blend of surfaces on any given UI
            theme, there is also strict adherence to accessibility guidelines and recommendations.
          </div>
        </Paragraph>
        <div className="image">
          <img src={ContextVisuals1} alt="Color Context Visuals 1" />
        </div>
        <Paragraph>
          A similar hierarchy pattern as above is adopted for brilliantly colored backgrounds like
          brand and alert colors when it comes to interactive states. So as interactions progress
          from default to hover to pressed, this same principle may apply. However, when trying to
          establish prominence for other user interface needs, an inverse relationship may be more
          suitable. Hence, for these brilliant colors:
          <ul>
            <li>In the light theme, as prominence reduces, layers become progressively lighter.</li>
            <li>In the dark theme, as prominence reduces, layers become progressively darker.</li>
          </ul>
        </Paragraph>
        <div className="image">
          <img src={ContextVisuals2} alt="Color Context Visuals 2" />
        </div>
      </div>
      <div className="section">
        <ContentHeading1>Green Color Accessibility</ContentHeading1>
        <Paragraph>
          In the use of green, Sistent design system ensures compliance with WCAG 2.1 standards for
          distinguishable text and color. (
          <a target="_blank" href="https://www.w3.org/TR/WCAG21/#use-of-color">
            See criteria 1.4.1 and 1.4.3
          </a>
          ) Accessibility is a major consideration for Sistent, and as such, accessibility research
          and guidelines are kept at the core of the color selection process.
          <div>
            There is further specification on how to maintain compliance with these standards in
            both light and dark themes:
          </div>
        </Paragraph>
        <ContentHeading2>Light Theme</ContentHeading2>
        <Paragraph>
          In order to ensure the minimum contrast of the Keppel Green in the the light theme, a
          variation of it is used in the light theme to ensure proper contrast.
        </Paragraph>
        <div className="image">
          <img src={ContextVisuals3} alt="Color Context Visuals 2" />
        </div>
        <ContentHeading2>Dark Theme</ContentHeading2>
        <Paragraph>
          For the dark theme, the Keppel Green meets the contrast requirement easily and as such can
          be used as the primary accent color for all necessary use cases.
        </Paragraph>
        <div className="image">
          <img src={ContextVisuals4} alt="Color Context Visuals 2" />
        </div>
        <div className="note">Note:</div>
        <Paragraph>
          Take note that if the primary accent color in use meets accessibility standards for both
          intended backgrounds in the light and dark themes, there might be no need to have a
          variation of its hue represent it, as is evident in the example above.
        </Paragraph>
      </div>
    </ColorStylesWrapper>
  );
};

export default Overview;
