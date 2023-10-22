export const isArchive = (ext: string) => {
  return ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(ext);
};
