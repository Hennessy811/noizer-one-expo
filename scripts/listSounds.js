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
      path: `../assets/audio/${f}`,
      variantName: clearName(variant),
      sound: clearName(sound),
      asset: `require('../assets/audio/${f}')`,
      audio: `Audio.Sound.createAsync(require('../assets/audio/${f}')).then(({ sound }) => sound)`,
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
  `
import { ISoundItem } from '../store';
import { Audio } from 'expo-av';

  

export const getSounds = async () => {
  const sounds = ${JSON.stringify(
    orderedPaths.map(i => {
      if (freeVariants.find(v => v.path === i.path)) return { ...i, free: true };
      else return { ...i, free: false };
    }),
    null,
    2
  )} as ISoundItem[];

  return sounds;
};
  `
);
