export function getImg(imagePath) {
    if (!imagePath) {
      return '/placeholder.svg';
    }
  
    const baseUrl = 'http://35.196.79.227:8000';
  
    return imagePath.startsWith('/')
      ? `${baseUrl}${imagePath}`
      : `${baseUrl}/${imagePath}`;
}