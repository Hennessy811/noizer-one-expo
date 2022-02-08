/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const Lame = require('node-lame').Lame;

const SOURCE_FOLDER = 'wavs';
const OUT_FOLDER = 'mp3s';

let count = 0;
console.time('convert');

// new Lame

const readDirConvert = async dir => {
  const p = path.join(__dirname, dir);
  if (!fs.existsSync(path.join(__dirname, dir.replace(SOURCE_FOLDER, OUT_FOLDER))) && !dir.match(/\.wav/gi)) {
    fs.mkdirSync(path.join(__dirname, dir.replace(SOURCE_FOLDER, OUT_FOLDER)));
  }

  if (fs.lstatSync(p).isDirectory()) {
    const children = fs.readdirSync(p);
    // console.log(children);
    for await (const child of children) {
      await readDirConvert(`/${dir}/${child}`);
    }
  } else {
    const splitpath = dir.split('.');
    if (splitpath[splitpath.length - 1] === 'wav') {
      const filename = dir.replace(/\/{2,}/gi, './');
      const trackname = _.last(filename.replace(SOURCE_FOLDER, '').replace('.wav', '').split('/'));
      console.time(`${count} | ${trackname}`);

      for await (rate of [320]) {
        const encoder = new Lame({
          output: filename.replace(SOURCE_FOLDER, OUT_FOLDER).replace('.wav', `.mp3`),
          bitrate: rate,
        }).setFile(filename);
        await encoder.encode();
      }
      console.timeEnd(`${count} | ${trackname}`);
      count++;
    }
  }
};

const f = async () => {
  await readDirConvert(`/${SOURCE_FOLDER}`);
  console.timeEnd('convert');
};

f();

// const filexist = fs.existsSync(path.join(__dirname, '/clocks.wav'));
// console.log(filexist);

// const getFiles = () => {
//   const files = [];

//   const getFilesRecursively = directory => {
//     const filesInDirectory = fs.readdirSync(directory);
//     for (const file of filesInDirectory) {
//       const absolute = path.join(directory, file);
//       if (fs.statSync(absolute).isDirectory()) {
//         getFilesRecursively(absolute);
//       } else {
//         files.push(absolute);
//       }
//     }
//   };
//   getFilesRecursively(path.join(__dirname, '/noizer-sounds'));
//   return files;
// };
// getFiles();
