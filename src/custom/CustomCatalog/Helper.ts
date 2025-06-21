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

export const getVersion = (design: Pattern) => {
  if (design.visibility === 'published') {
    return design?.catalog_data?.published_version || DEFAULT_DESIGN_VERSION;
  }
  try {
    const patternFile = jsyaml.load(design.pattern_file);
    return patternFile?.version || DEFAULT_DESIGN_VERSION;
  } catch (e) {
    console.error(e);
    return DEFAULT_DESIGN_VERSION;
  }
};
