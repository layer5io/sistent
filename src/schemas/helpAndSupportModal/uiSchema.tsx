/**
 * Represents UI schema for help and support modal
 */
const helpAndSupportModalUiSchema = {
  subject: {
    'ui:placeholder': 'Summary or title for your support request'
  },
  message: {
    'ui:placeholder': 'Detailed description of your support request'
  },
  scope: {
    'ui:widget': 'radio'
  }
};

export default helpAndSupportModalUiSchema;
