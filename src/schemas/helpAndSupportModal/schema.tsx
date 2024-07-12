/**
 * Represents the JSON Schema for the Help and Support modal form.
 * This schema is designed to capture information for support request.
 *
 * Playground link -
 */
const helpAndSupportModalSchema = {
  title: 'Support Form',
  properties: {
    subject: {
      type: 'string',
      title: 'Subject',
      description:
        'Enter a concise and descriptive title for your support request. This will help us quickly understand the nature of your inquiry.',
      minLength: 1,
      'x-rjsf-grid-area': '12'
    },
    message: {
      type: 'string',
      title: 'Description',
      description:
        'Please provide a detailed description of your issue or question. Include any relevant information that you think will help us assist you more effectively. The more details you provide, the better we can understand and address your concerns.',
      minLength: 10,
      format: 'textarea',
      'x-rjsf-grid-area': '12'
    },
    scope: {
      type: 'string',
      enum: ['Support', 'Community', 'Account', 'Commercial'],
      title: 'Scope of Questions',
      description: 'Select the category that best represents the nature of your inquiry.',
      default: 'Technical'
    }
  },
  required: ['subject', 'message']
};

export default helpAndSupportModalSchema;
