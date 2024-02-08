/**
 * @typedef {{
 *   title: string;
 *   onClickCallback: number;
 *   href: string;
 *   component: string;
 *   icon: string;
 *   children: NavigatorSchema[];
 *   type: string;
 *   isBeta?: boolean;
 * }} NavigatorSchema
 */

/**
 * @typedef {{
 *   component: string;
 *   type: string;
 * }} UserPreferenceSchema
 */

/**
 * @typedef {{
 *   title: string;
 *   onClickCallback: number;
 *   href: string;
 *   component: string;
 *   children: AccountSchema[];
 *   type: string;
 * }} AccountSchema
 */

/**
 * @typedef {{
 *   title: string;
 *   onClickCallback: number;
 *   href: string;
 *   component: string;
 *   children: AccountSchema[];
 *   type: string;
 * }} FullPageExtensionSchema
 */

/**
 * @typedef {NavigatorSchema | UserPreferenceSchema | AccountSchema | FullPageExtensionSchema} ExtensionSchema
 */

/**
 * Validates extension point schema based on provided type.
 * @param {"navigator" | "user_prefs" | "account"} type - Type of the schema.
 * @returns {(content: any) => ExtensionSchema[]} A function that validates the content and returns an array of ExtensionSchema.
 */
export default function extensionPointSchemaValidator(type) {
  switch (type) {
    case 'navigator':
      return navigatorExtensionSchemaDecoder;
    case 'user_prefs':
      return userPreferenceExtensionSchemaDecoder;
    case 'account':
      return accountExtensionSchemaDecoder;
    default:
      return () => [];
  }
}

/**
 * Decodes navigator extension schema.
 * @param {any[]} content - Content to decode.
 * @returns {NavigatorSchema[]} Decoded navigator schema.
 */
function navigatorExtensionSchemaDecoder(content) {
  if (Array.isArray(content)) {
    return content.map((item) => {
      return {
        title: item.title || '',
        href: prepareHref(item.href),
        component: item.component || '',
        onClickCallback: item?.on_click_callback || 0,
        icon: (item.icon && '/api/provider/extension/' + item.icon) || '',
        show: !!item.show,
        children: navigatorExtensionSchemaDecoder(item.children),
        full_page: item.full_page,
        isBeta: item.isBeta ?? false,
        type: 'navigator', // Add the 'type' property with the value 'navigator'
      };
    });
  }

  return [];
}

/**
 * Decodes user preference extension schema.
 * @param {any} content - Content to decode.
 * @returns {UserPreferenceSchema[]} Decoded user preference schema.
 */
function userPreferenceExtensionSchemaDecoder(content) {
  if (Array.isArray(content)) {
    return content.map((item) => {
      return {
        component: item.component || '',
        type: 'user_prefs', // Add the 'type' property with the value 'user_prefs'
      };
    });
  }

  return [];
}

/**
 * Decodes account extension schema.
 * @param {any} content - Content to decode.
 * @returns {AccountSchema[]} Decoded account schema.
 */
function accountExtensionSchemaDecoder(content) {
  if (Array.isArray(content)) {
    return content.map((item) => {
      return {
        title: item.title || '',
        href: prepareHref(item.href),
        component: item.component || '',
        onClickCallback: item?.on_click_callback || 0,
        show: !!item.show,
        children: accountExtensionSchemaDecoder(item.children),
        full_page: item.full_page,
        type: 'account', // Add the 'type' property with the value 'account'
      };
    });
  }

  return [];
}

/**
 * Prepares href based on provided data.
 * @param {any} href - Href data.
 * @returns {string} Prepared href.
 */
function prepareHref(href) {
  if (href.external) return href.uri || '';

  return '/extension' + (href.uri || '');
}
