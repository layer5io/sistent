type DispatchImageFunction = (url: string) => void;

const handleImageValidation = async (url: string, dispatchImage: DispatchImageFunction): Promise<boolean> => {
  try {
    const img = new Image();
    img.src = url;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    });

    dispatchImage(url);
    return true; // Image loaded successfully
  } catch (error) {
    return false; // Image failed to load
  }
};

export default handleImageValidation;
