const fs = require('fs');
const path = require('path');

const dir = fs.readdirSync(path.join(__dirname, '/assets/audio'));

const res = dir.map(name => ({
  path: path.join('..', `/assets/audio/${name}`),
  name,
}));

console.log(res);
