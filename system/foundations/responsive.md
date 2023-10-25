---
title: Responsive
description: Supporting responsive experiences is an essential part of developing for the Web. Every page and feature at GitHub needs to adapt to the user’s device and their preferences.
category: foundations
---

## Definition

[Responsive web design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) is the practice of building a website suitable to work on every device and every screen size, no matter how large or small, mobile or desktop. Responsive web design is an accessibility requirement, focused around providing an intuitive and gratifying experience for everyone.

At Layer5, being Responsive means our experiences are inherently adaptive. Interfaces should not only adjust layout and spacing when resizing a page, but work efficiently to provide an experience that is tailored to match the paradigms and affordances of the person’s device:

- Responsive to the [form factor](<https://en.wikipedia.org/wiki/Form_factor_(design)>): adapt to viewport size, pointing device support, and to the device metaphors, power, and [affordances](https://www.interaction-design.org/literature/topics/affordances).
- Responsive to the user preferences: respect browser’s default font size, reduced motion, color scheme, contrast preferences, etc.

## Responsive to the device’s form factor

Designing for the web means that people can open your page from virtually any type of device. When designing for Layer5, picture our users using desktops, tablets, and smartphones, but also [custom-built tiny cyberdecks](https://www.reddit.com/r/cyberDeck/top/?t=year) and [VR headsets](https://en.wikipedia.org/wiki/Virtual_reality_headset).

### Device power

Layer5 cannot discriminate against devices and connection speeds. Experiences need to be fast and performant, even on low-powered devices and slow connections. [It’s not fully shipped until it’s fast](/foundations/zen).

### Viewport size

To guarantee maximum compatibility, pages should adapt to the [browser’s viewport size](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts), without loss of information or functionality, starting at the following dimensions:

Providing support at these smaller sizes enable people with low vision to use Layer5 with a browser zoom enabled, up to 400% on a 1280px wide screen. [Read more about this accessibility requirement](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html).

To understand how to break down a page to work on smaller viewports, check out [Responsive foundations](/foundations/layout) and [Responsive behavior](/foundations/layout) sections in the [Layout](/foundations/layout) page.


TODO: Capture SVG requirements and practices from Meshery.


- **Minimum viewport width**: 375px
- **Minimum viewport height**: 300px