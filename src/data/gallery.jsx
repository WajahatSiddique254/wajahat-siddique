const imageModules = import.meta.glob('/src/assets/gallery/*.{png,jpeg,jpg,JPG,JPEG}', { eager: true, import: 'default' });

const imageEntries = Object.entries(imageModules);
imageEntries.sort((a, b) => {
  const numA = parseInt(a[0].match(/(\d+)/)?.[1] || '0', 10);
  const numB = parseInt(b[0].match(/(\d+)/)?.[1] || '0', 10);
  return numA - numB;
});

export const galleryImages = imageEntries.map(([, url]) => url);
