const fs = require('fs');
const path = require('path');

const { orderBy, uniqBy, groupBy, entries, first } = require('lodash');

const getFiles = () => {
  const files = [];

  const getFilesRecursively = directory => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
      } else {
        files.push(absolute);
      }
    }
  };
  getFilesRecursively(path.join(__dirname, '../assets/audio'));
  return files;
};

const clearName = s => s.replace('.mp3', '');

const r = getFiles()
  .filter(i => i.match(/\.mp3/))
  .map(file => {
    const f = file.split('/audio/')[1];

    const [group, s, variant] = f.split('/');
    const [sound, icon] = s.split('_');

    return {
      group,
      icon,
      path: `../assets/${f}`,
      variantName: clearName(variant),
      sound: clearName(sound),
      asset: `require('../assets/audio/${f}')`,
    };
  });

const uniqPaths = uniqBy(r, 'path');
const orderedPaths = orderBy(uniqPaths, 'variantName');

const freeVariants = [];

entries(groupBy(uniqPaths, 'sound')).forEach(([sound, files]) => {
  const o = orderBy(files, 'variantName');
  const free = first(o);
  freeVariants.push(free);
});

fs.writeFileSync(
  path.join(__dirname, '../constants/sounds.ts'),
  `const sounds = ${JSON.stringify(
    orderedPaths.map(i => {
      const { path, ...j } = i;
      if (freeVariants.find(v => v.path === i.path)) return { ...j, free: true };
      else return { ...j, free: false };
    }),
    null,
    2
  )}; export default sounds;`
);
