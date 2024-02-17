type DispatchImageFunction = (url: string) => void;
export const validateImageUrl = async (
  url: string,
  dispatchImage: DispatchImageFunction
): Promise<boolean> => {
  // Basic URL verification
  if (!isUrlValid(url)) {
    return false;
  }

  try {
    const img = new Image();
    img.src = url;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    });

    // Dispatch action after image is successfully loaded
    dispatchImage(url);

    return true; // Image loaded successfully
  } catch (error) {
    return false; // Image failed to load
  }
};

// Function to verify if URL is valid
const isUrlValid = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
