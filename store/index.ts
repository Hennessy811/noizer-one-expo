import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sounds from '../constants/sounds';
import produce from 'immer';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { getSounds } from '../constants/sounds';
import * as MediaLibrary from 'expo-media-library';

export interface ISoundItem {
  group: string;
  icon?: string;
  asset: any;
  path: string;
  audio: Promise<Audio.Sound>;
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
  getSounds: () => Promise<ISoundItem[]>;
  setMuted: (muted: boolean) => void;
  toggleSound: (sound: StoredSound) => void;
  setMasterVolume: (volume: number) => void;
}

type State = { player: PlayerState };

const soundsSlice = (set: SetState<State>, get: GetState<State>): PlayerState => ({
  muted: false,
  playing: false,
  masterVolume: 1,
  sounds: [],
  getSounds: async () => {
    const s = await getSounds();
    await Audio.setAudioModeAsync({
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    // for await (const item of s) {
    //   const asset = await Audio.Sound.createAsync({
    //     uri: 'http://localhost:1337/uploads/Cars_trains_320_cd90d63968.m4a',
    //   });
    //   console.log(asset);
    // }

    set(state => ({ ...state, player: { ...state.player, sounds: s.map(i => ({ ...i, playing: false, volume: 0.5 })) } }));

    return s;
  },
  setMuted: (muted: boolean) => set(state => ({ ...state, muted })),
  toggleSound: async (sound: StoredSound) => {
    const sounds = get().player.sounds;
    const index = sounds.findIndex(s => s.sound === sound.sound && s.variantName === sound.variantName);
    if (index === -1) {
      return;
    }
    const newSounds = [...sounds];
    newSounds[index] = { ...newSounds[index], playing: !newSounds[index].playing };

    const audio = await newSounds[index].audio;
    console.log({ audio });

    // const uri = Asset.fromModule(sound.asset)
    //   .downloadAsync()
    //   .then(v => {
    //     console.log(v);
    //   });

    // FileSystem.readDirectoryAsync('file:///assets/audio/').then(files => {
    //   console.log(files);
    // });

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
    player: { ...soundsSlice(set, get) },
  })
  //   {
  //     name: 'app',
  //     getStorage: () => AsyncStorage,
  //   }
  // )
);

export default useStore;
