import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sounds from '../constants/sounds';
import produce from 'immer';

export interface ISoundItem {
  group: string;
  icon?: string;
  asset: NodeRequire;
  sound: string;
  variantName: string;
  free: boolean;
}

export interface StoredSound extends ISoundItem {
  playing: boolean;
  volume: number;
}

interface PlayerState {
  muted: boolean;
  playing: boolean;
  masterVolume: number;
  sounds: StoredSound[];
  setMuted: (muted: boolean) => void;
  toggleSound: (sound: StoredSound) => void;
  setMasterVolume: (volume: number) => void;
}

type State = {
  count: number;
  increment: () => void;
  decrement: () => void;
} & { player: PlayerState };

const soundsSlice = (set: SetState<State>, get: GetState<State>): PlayerState => ({
  muted: false,
  playing: false,
  masterVolume: 1,
  sounds: sounds.map(sound => ({ ...sound, playing: false, volume: 1 })) as StoredSound[],
  setMuted: (muted: boolean) => set(state => ({ ...state, muted })),
  toggleSound: (sound: StoredSound) => {
    const sounds = get().player.sounds;
    const index = sounds.findIndex(s => s.sound === sound.sound && s.variantName === sound.variantName);
    if (index === -1) {
      return;
    }
    const newSounds = [...sounds];
    newSounds[index] = { ...newSounds[index], playing: !newSounds[index].playing };

    set(
      produce(state => {
        state.player.sounds = newSounds;
      })
    );
  },
  setMasterVolume: (volume: number) => set(state => ({ ...state, masterVolume: volume })),
});

const useStore = create<State>(
  // persist(
  (set, get) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
    player: { ...soundsSlice(set, get) },
  })
  //   {
  //     name: 'app',
  //     getStorage: () => AsyncStorage,
  //   }
  // )
);

export default useStore;
