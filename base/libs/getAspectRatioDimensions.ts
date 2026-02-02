export const getAspectRatioDimensions = (originalWidth: number, originalHeight: number, ratio: [number, number]) => {
  const aspectRatio = ratio[0] / ratio[1]; // 4:6 aspect ratio

  // Calculate the aspect ratio of the original image
  const originalAspectRatio = originalWidth / originalHeight;

  let width, height;

  // If the original image is wider than the desired aspect ratio
  if (originalAspectRatio > aspectRatio) {
    // Use the original width as the base
    width = originalWidth;
    height = Math.round(width / aspectRatio);
  } else {
    // Use the original height as the base
    height = originalHeight;
    width = Math.round(height * aspectRatio);
  }

  return { width, height };
};
