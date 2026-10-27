import { load } from 'js-yaml';
import type { SuggestedPattern } from './CustomCard';

const checkImageUrlValidity = async (
  url: string,
  appendHostUrl = true,
  getHostUrl?: () => string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    // Only append host if the URL does not start with "http" or "https"
    if (appendHostUrl && !url.startsWith('http')) {
      img.src = (getHostUrl ? getHostUrl() : '') + url;
    } else {
      img.src = url;
    }
    img.onload = () => {
      // Check if the image loaded successfully
      resolve(true);
    };

    img.onerror = () => {
      // Handle the case where the image could not be loaded
      resolve(false);
    };
  });
};

const getValidSvgPaths = async (
  technologies: string[],
  basePath: string,
  subBasePath: string
): Promise<string[]> => {
  const validSvgPaths: string[] = [];
  for (const technology of technologies) {
    const svgIconPath = `${basePath}/${technology.toLowerCase()}/${subBasePath}/${technology.toLowerCase()}-color.svg`;
    const isSvgPathValid = await checkImageUrlValidity(svgIconPath as string);
    if (isSvgPathValid) {
      validSvgPaths.push(technology);
    }
  }
  return validSvgPaths;
};

// Parses the pattern file content (YAML) and returns the version field.
// If parsing fails or version is missing, returns the default version.
const getWorkingVersionFromPatternFile = (patternFileContent?: string) => {
  if (!patternFileContent) {
    return DEFAULT_DESIGN_VERSION;
  }
  try {
    const patternFile = load(patternFileContent);
    const version =
      patternFile && typeof patternFile === 'object' && 'version' in patternFile
        ? patternFile.version
        : undefined;
    return version ? String(version) : DEFAULT_DESIGN_VERSION;
  } catch (e) {
    console.error('Failed to parse pattern file to get version:', e);
    return DEFAULT_DESIGN_VERSION;
  }
};

interface HandleImageProps {
  technologies: string[];
  basePath?: string;
  subBasePath?: string;
  setAvailableTechnologies: (technologies: string[]) => void;
}

export const handleImage = async ({
  technologies,
  basePath = '',
  subBasePath = '',
  setAvailableTechnologies
}: HandleImageProps) => {
  const validSvgPaths = await getValidSvgPaths(technologies, basePath, subBasePath);
  setAvailableTechnologies(validSvgPaths);
};

// `sanitizeCatalogImageUrl` lives in a dependency-free leaf module; re-exported
// here to keep the existing `from './Helper'` import path working for internal
// consumers.
export { sanitizeCatalogImageUrl } from './sanitizeCatalogImageUrl';

export const DEFAULT_DESIGN_VERSION = '0.0.0';

// Returns the version of a design based on its visibility.
// - For 'published' designs, returns the stable published version.
// - For 'public' or 'private', returns the working version from the pattern file.
// - Defaults to the working version if visibility is unrecognized.
export const getVersion = (design: {
  visibility?: string;
  patternFile?: string;
  catalogData?: {
    publishedVersion?: string;
  };
}) => {
  switch (design.visibility) {
    case 'published':
      return design.catalogData?.publishedVersion || DEFAULT_DESIGN_VERSION;
    case 'public':
    case 'private':
      return getWorkingVersionFromPatternFile(design.patternFile);
    default:
      return getWorkingVersionFromPatternFile(design.patternFile);
  }
};

export const getCatalogImageURLs = (pattern?: SuggestedPattern): string[] | undefined => {
  const catalogData = pattern?.catalogData;
  if (!catalogData) {
    return undefined;
  }
  if ('imageURL' in catalogData && catalogData.imageURL?.[0]) {
    return catalogData.imageURL;
  }
  if ('snapshotURL' in catalogData && catalogData.snapshotURL) {
    return catalogData.snapshotURL;
  }
  return undefined;
};

export const getCatalogClassName = (pattern?: SuggestedPattern): string => {
  const catalogData = pattern?.catalogData;
  if (!catalogData) {
    return '';
  }
  if ('contentClass' in catalogData && catalogData.contentClass) {
    return catalogData.contentClass;
  }
  if ('class' in catalogData && catalogData.class) {
    return catalogData.class;
  }
  return '';
};
