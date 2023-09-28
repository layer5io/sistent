# [Sistent](https://design.layer5.io) UX Design System: Empty State Patterns

## Overview

Empty states are essential components used to occupy spaces when no content has been added yet, or when content is temporarily unavailable due to the nature of the feature. The [Sistent](https://design.layer5.io) design system provides comprehensive guidelines for creating effective empty states using the BlankSlate component.

### BlankSlate Component

The BlankSlate component comprises various elements that work together to inform the user about a feature and guide them on how to proceed. Here are the key elements of the BlankSlate component and how to customize them:

1. **Graphic**

   - Graphics should be purposefully placed to convey the intention of the content, whether it's to bring delight, preview an interface element, or represent the feature's goal.
   - Different graphics may hold different meanings and appeal to users, which is why the BlankSlate component offers multiple variations.

2. **Primary Text**

   - Use primary text to explain the purpose of the empty state, making users comfortable to engage with the content or start a feature flow. It should be welcoming, human, and clearly convey the feature's intention.

3. **Secondary Text**

   - This optional text provides more detailed information about the feature. It should be concise and non-redundant, allowing users to understand the general purpose and benefits of the feature.

4. **Primary Action**

   - Encourage the use of one primary action button that leads to a feature or component creation flow. The button copy should be brief yet descriptive. Consider adding an Octicon for further specification if needed.

5. **Secondary Action**

   - A secondary action is optional and usually represented by a text link below the primary action button. It guides users to additional content related to the feature, such as "Learn more about X" or "Check out the guide on X."

6. **Border**
   - The border is invisible by default but can be added when needed to define the structure of the BlankSlate component, particularly in layouts where it's not the sole content.

### Variations

Empty states come in various forms to suit different contexts:

- **Layer5 Marketing Icons:** Utilize Layer5 marketing icons to represent the feature where the BlankSlate is placed. This helps establish a visual association.

- **Code Block BlankSlate:** Use this variation when providing steps or instructions in a code format, especially for features like getting started with packages in Layer5.

- **Code of Conduct Illustration BlankSlate:** This variation combines primary and secondary text to welcome users and inform them about community-building through a code of conduct.

- **First Time User BlankSlate:** Engage first-time users with playful illustrations introducing the [Five](https://layer5.io/brand) as a symbol of Layer5. Use primary text to welcome and secondary text to educate in a simple, less-technical manner.

## Empty States Goals

The primary goals of an empty state region in the [Sistent](https://design.layer5.io) design system are to:

1. Increase feature adoption.
2. Improve learnability and feature discovery.
3. Enhance usability.

## Solutions

When creating an empty state, consider unique features that can be incorporated to better achieve the above goals compared to using a fallback solution. Tailor each empty state to the specific context, ensuring it addresses the three main goals effectively.

## Analytics & Testing

All empty state solutions should include usage analytics for continuous improvement. Treat this as a solution development process and follow the solution validation process.

## Use Cases

### Blank Content Empty State

- **Description:** Serves as a placeholder when no content exists on a page, providing a call to action for content creation.
- **Specifications:**
  - Appears when no content exists within a configured feature.
  - Contains a method for creating content.
  - Hides unnecessary UI elements unless lazy loading populates content or there's hidden but accessible content on the page (e.g., archived content).
- **Content Examples:**
  - "Monitor vulnerabilities in your project"
  - "Get started with monitoring"

### Configuration Required Empty State

- **Description:** Placeholder for features requiring configuration before content creation is possible.
- **Specifications:**
  - Contains a primary action for configuring the feature.
  - Contains a secondary action to invite a member to configure the feature.
- **Content Examples:**
  - "Configuration required: Monitor vulnerabilities in your project"
  - "Configuration required: Get started with monitoring"

### Higher Tier Feature Empty State

- **Description:** Placeholder for a feature unavailable under the current tier.
- **Specifications:** Determined by the Maintainers in collaboration with the Product Manager.

### Empty Search Results Empty State

- **Description:** Placeholder when no search results are found after a search or filtering.
- **Specifications:**
  - Appears when no results are found after a search or filter.
  - Describes that a search or filter returned no results.
  - Does not contain a call to action.
- **Content Examples:**
  - Filter Component:
    - Title: "No results found"
    - Text: "Edit your search filter and try again"
  - Search Component:
    - Title: "No results found"
    - Text: "Edit your search and try again"

## Fallback Solution

If unable to meet the three primary goals of an empty state, a fallback solution may be used. The fallback should still contribute to achieving one of the goals and should include a way to track conversion.

**Example Fallback Solution:**

- `regions-empty-state--default`

---

**Note:** For Higher Tier empty state region specifications, consult the maintainer team.

---

_Note: This combined specification integrates the information from both provided design system specifications regarding empty state patterns under the [Sistent](https://design.layer5.io) UX Design System._
