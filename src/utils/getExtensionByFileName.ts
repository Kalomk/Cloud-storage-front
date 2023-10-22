export const getExtensionByFileName = (fileName: string) => {
  return fileName.split('.').pop();
};
