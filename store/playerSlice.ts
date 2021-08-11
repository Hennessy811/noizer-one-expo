import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { random, sortBy } from 'lodash';
import Sounds, { SoundItem } from '../constants/Sounds';

export interface PlayerSoundItem extends SoundItem {
  volume: number;
  playing: boolean;
}

interface PlayerSlice {
  playing: boolean;
  muted: boolean;
  sounds: PlayerSoundItem[];
}

const initialState: PlayerSlice = {
  playing: false,
  muted: false,
  sounds: sortBy(
    Sounds.map(i => ({ ...i, volume: 0.5, playing: false })),
    i => i.name
  ),
};

const randomSlice = <T>(arr: T[], n: number): T[] => arr.sort(() => Math.random() - Math.random()).slice(0, n);

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSound: (state, action: PayloadAction<{ sound: PlayerSoundItem }>) => {
      const _items = state.sounds.map(i => ({ ...i, playing: action.payload.sound.path === i.path ? !i.playing : i.playing }));
      state.sounds = _items;
    },
    playRandomSet: state => {
      const _itemsSlice = randomSlice(state.sounds, random(2, 4));
      const _items = state.sounds.map(i => {
        const occurrence = _itemsSlice.find(j => j.path === i.path);
        return { ...i, playing: !!occurrence, volume: !!occurrence ? +random(0.2, 0.8).toFixed(1) : i.volume };
      });
      state.sounds = sortBy(_items, i => i.name);
    },
    adjustVolume: (state, action: PayloadAction<{ volume: number; sound: PlayerSoundItem }>) => {
      const _items = state.sounds.map(i => ({ ...i, volume: action.payload.sound.path === i.path ? action.payload.volume : i.volume }));
      state.sounds = _items;
    },
    stop: state => {
      state.playing = false;
      const _items = state.sounds.map(i => ({ ...i, playing: false, volume: 0.5 }));
      state.sounds = _items;
    },
    toggleMute: state => {
      state.muted = !state.muted;
    },
  },
});
