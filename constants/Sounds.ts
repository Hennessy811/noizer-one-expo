export interface SoundItem {
  emoji?: string;
  path: string;
  name: string;
  file: any;
}

export default [
  { emoji: '✈️', path: '../assets/audio/airplane.mp3', file: require('../assets/audio/airplane.mp3'), name: 'airplane' },
  { emoji: '🕊', path: '../assets/audio/birds.mp3', file: require('../assets/audio/birds.mp3'), name: 'birds' },
  { emoji: '☕️', path: '../assets/audio/cafe.mp3', file: require('../assets/audio/cafe.mp3'), name: 'cafe' },
  { emoji: '🌆', path: '../assets/audio/city.mp3', file: require('../assets/audio/city.mp3'), name: 'city' },
  { emoji: '🌬', path: '../assets/audio/fan.mp3', file: require('../assets/audio/fan.mp3'), name: 'fan' },
  { emoji: '🔥', path: '../assets/audio/fire.mp3', file: require('../assets/audio/fire.mp3'), name: 'fire' },
  { emoji: '⛈', path: '../assets/audio/forest_rain.mp3', file: require('../assets/audio/forest_rain.mp3'), name: 'forest rain' },
  { emoji: '🏡', path: '../assets/audio/garden.mp3', file: require('../assets/audio/garden.mp3'), name: 'garden' },
  { emoji: '🚶‍♂️', path: '../assets/audio/gravel_walk.mp3', file: require('../assets/audio/gravel_walk.mp3'), name: 'gravel walk' },
  { emoji: '🏢', path: '../assets/audio/office.mp3', file: require('../assets/audio/office.mp3'), name: 'office' },
  { emoji: '👽', path: '../assets/audio/omnious.mp3', file: require('../assets/audio/omnious.mp3'), name: 'omnious' },
  { emoji: '🐈', path: '../assets/audio/purr.mp3', file: require('../assets/audio/purr.mp3'), name: 'purr' },
  { emoji: '🛤', path: '../assets/audio/railway.mp3', file: require('../assets/audio/railway.mp3'), name: 'railway' },
  { emoji: '⛈', path: '../assets/audio/rain.mp3', file: require('../assets/audio/rain.mp3'), name: 'rain' },
  { emoji: '🍃', path: '../assets/audio/soft_wind.mp3', file: require('../assets/audio/soft_wind.mp3'), name: 'soft wind' },
  { emoji: '🛰', path: '../assets/audio/space.mp3', file: require('../assets/audio/space.mp3'), name: 'space' },
  { emoji: '🌪', path: '../assets/audio/storm.mp3', file: require('../assets/audio/storm.mp3'), name: 'storm' },
  { emoji: '🌃', path: '../assets/audio/summer_night.mp3', file: require('../assets/audio/summer_night.mp3'), name: 'summer night' },
  { emoji: '🌊', path: '../assets/audio/waves.mp3', file: require('../assets/audio/waves.mp3'), name: 'waves' },
  { emoji: '🎧', path: '../assets/audio/white_noise.mp3', file: require('../assets/audio/white_noise.mp3'), name: 'white noise' },
  { emoji: '🌳', path: '../assets/audio/windy_forest.mp3', file: require('../assets/audio/windy_forest.mp3'), name: 'windy forest' },
] as SoundItem[];
