import jsyaml from 'js-yaml';

export const downloadYaml = (filteredData: string, itemName: string): void => {
  const yamlData = Array.isArray(filteredData)
    ? jsyaml.dump(filteredData.find((item) => item.name === itemName))
    : filteredData;
  const blob = new Blob([yamlData], { type: 'application/yaml' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.href = url;
  element.download = `${itemName}.yaml`;
  // document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  URL.revokeObjectURL(url);
};

export function slugify(str: string): string {
  if (!str) return str;
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing whitespace
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export const downloadPattern = (
  id: string,
  name: string,
  getDownloadUrl: (id: string) => string
): void => {
  const downloadUrl = getDownloadUrl(id);

  const fileNameWithExtension = `${name}.yaml`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', downloadUrl);
  linkElement.setAttribute('download', fileNameWithExtension);
  linkElement.click();
  linkElement.remove();
};

export const formatToTitleCase = (value: string): string => {
  if (typeof value === 'string') {
    return value.substring(0, 1).toUpperCase().concat('', value.substring(1).toLowerCase());
  }
  return '';
};

interface HeadingProps {
  type: string;
  userProfile?: {
    first_name?: string;
  };
  organizationName?: string;
  fetchingOrgError: boolean;
}

export const getHeadingText = ({
  type,
  userProfile,
  organizationName,
  fetchingOrgError
}: HeadingProps): string => {
  const designType = type.toLowerCase() === 'my-designs' ? 'public' : 'published';
  const firstName = formatToTitleCase(userProfile?.first_name ?? '');
  const orgText = fetchingOrgError ? '' : `under ${organizationName}`;

  return `Other ${designType} design by ${firstName} ${orgText}`;
};
