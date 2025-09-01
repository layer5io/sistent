import jsyaml from 'js-yaml';
import { Pattern } from './CustomCard';

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
const getWorkingVersionFromPatternFile = (patternFileContent: string) => {
  try {
    const patternFile = jsyaml.load(patternFileContent);
    return patternFile?.version || DEFAULT_DESIGN_VERSION;
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
export const DEFAULT_DESIGN_VERSION = '0.0.0';

// Returns the version of a design based on its visibility.
// - For 'published' designs, returns the stable published version.
// - For 'public' or 'private', returns the working version from the pattern file.
// - Defaults to the working version if visibility is unrecognized.
export const getVersion = (design: Pattern) => {
  switch (design.visibility) {
    case 'published':
      return design?.catalog_data?.published_version || DEFAULT_DESIGN_VERSION;
    case 'public':
    case 'private':
      return getWorkingVersionFromPatternFile(design.pattern_file);
    default:
      return getWorkingVersionFromPatternFile(design.pattern_file);
  }
};
