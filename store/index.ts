import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sounds, { ISoundItem } from '../constants/sounds';

type State = {
  count: number;
  increment: () => void;
  decrement: () => void;
} & SoundsState;

interface SoundsState {
  sounds: ISoundItem[];
}

const soundsSlice = (set: SetState<State>, get: GetState<State>): SoundsState => ({
  sounds: sounds,
});

const useStore = create<State>(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 })),
      decrement: () => set(state => ({ count: state.count - 1 })),
      ...soundsSlice(set, get),
    }),

    {
      name: 'app',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useStore;
