import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { useEffect, useState } from 'react';
import { Switch, TouchableHighlight } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import { capitalize } from 'lodash';
import useTheme from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerSlice, PlayerSoundItem } from '../store/playerSlice';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import useDebounce from '../hooks/useDebounce';

const SoundItemView = ({
  item,
  onSlideEnd,
  onSlideStart,
}: {
  item: PlayerSoundItem;
  onSlideStart?: () => void;
  onSlideEnd?: () => void;
}) => {
  const theme = useTheme();
  const [sound, setSound] = useState<Sound>();

  const { muted } = useAppSelector(store => store.player);
  const dispatch = useAppDispatch();
  const [localVolume, setLocalVolume] = useState(item.volume);
  const debouncedVolume = useDebounce(localVolume, 400);

  const toggleSound = async () => {
    if (item.playing) {
      dispatch(playerSlice.actions.playSound({ sound: item }));
    } else {
      dispatch(playerSlice.actions.playSound({ sound: item }));
    }
  };

  useEffect(() => {
    const init = async () => {
      const { sound: playbackSound } = await Audio.Sound.createAsync(item.file, {
        isLooping: true,
        volume: 1,
      });
      setSound(playbackSound);
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true });
    };
    init();
  }, []);

  useEffect(() => {
    sound?.setIsMutedAsync(muted);
  }, [muted]);

  useEffect(() => {
    if (item.playing) sound?.playAsync();
    else sound?.pauseAsync();
  }, [item.playing]);

  useEffect(() => {
    dispatch(playerSlice.actions.adjustVolume({ sound: item, volume: localVolume }));
  }, [debouncedVolume]);

  useEffect(() => {
    sound?.setVolumeAsync(item.volume);
    setLocalVolume(item.volume);
  }, [item.volume]);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  return (
    <View
      style={{
        width: '100%',
        padding: 10,
        borderColor: theme.borderColor,
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
        marginVertical: 0,
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, alignItems: 'flex-start', width: '65%', color: theme.text }}>{capitalize(item.name)}</Text>
      </View>
      <View style={{ marginHorizontal: 0, flexDirection: 'row', position: 'absolute', top: 5, right: 5, borderRadius: 10 }}>
        <Switch value={item.playing} onChange={toggleSound} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text style={{ alignItems: 'center', fontSize: 24, marginRight: 15 }}>{item.emoji}</Text>
        <MultiSlider
          onValuesChange={([_v]) => {
            const v = +_v.toFixed(1);
            setLocalVolume(v);
          }}
          onValuesChangeStart={onSlideStart}
          onValuesChangeFinish={onSlideEnd}
          sliderLength={85}
          values={[localVolume]}
          markerStyle={{
            width: 20,
            height: 20,
            backgroundColor: item.playing ? theme.background : theme.backgroundDisabled,
            borderRadius: 50,
            borderColor: theme.borderColor,
            borderWidth: 1,
          }}
          selectedStyle={{
            backgroundColor: item.playing ? theme.tint : theme.borderColor,
          }}
          max={1}
          min={0}
          step={0.1}
        />
      </View>
    </View>
  );
};

const TopButton = ({ children, icon, onPress }: { children: React.ReactNode; icon?: React.ReactNode; onPress: () => void }) => {
  const theme = useTheme();

  return (
    <TouchableHighlight onPress={onPress} style={{ borderRadius: 10 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: theme.text, paddingHorizontal: 5 }}>
        {!!icon && icon}
        <Text style={{ fontSize: 18, padding: 10, color: theme.text }}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default function SoundsScreen() {
  const theme = useTheme();
  const { muted, playing, sounds } = useAppSelector(store => store.player);
  const dispatch = useAppDispatch();

  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor: theme.borderColor,
          borderBottomWidth: 1,
        }}
      >
        <TopButton
          onPress={() => {
            dispatch(playerSlice.actions.playRandomSet());
          }}
          icon={<Ionicons name="ios-shuffle-outline" size={16} color={theme.text} />}
        >
          Play random
        </TopButton>
        <TopButton
          onPress={() => {
            dispatch(playerSlice.actions.toggleMute());
          }}
          icon={<Ionicons name="volume-mute" size={16} color={theme.text} />}
        >
          {muted ? 'Unmute' : 'Mute'}
        </TopButton>
        <TopButton
          onPress={() => {
            dispatch(playerSlice.actions.stop());
          }}
          icon={<Ionicons name="ios-stop" size={16} color={theme.text} />}
        >
          Stop
        </TopButton>
      </View>

      <FlatGrid
        scrollEnabled={scrollEnabled}
        itemDimension={140}
        data={sounds}
        renderItem={({ item }) => (
          <SoundItemView onSlideEnd={() => setScrollEnabled(true)} onSlideStart={() => setScrollEnabled(false)} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
