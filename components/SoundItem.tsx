import { Ionicons } from '@expo/vector-icons';
import { Sound } from 'expo-av/build/Audio';
import { Audio } from 'expo-av';

import { capitalize } from 'lodash';
import { Actionsheet, Box, Flex, HStack, Icon, Pressable, Slider, Switch, Text, useDisclose } from 'native-base';
import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerSlice, PlayerSoundItem } from '../store/playerSlice';

const SoundItem = ({ item, onSlideEnd, onSlideStart }: { item: PlayerSoundItem; onSlideStart: () => void; onSlideEnd: () => void }) => {
  const dispatch = useAppDispatch();
  const { muted } = useAppSelector(store => store.player);

  const { isOpen, onOpen, onClose } = useDisclose();
  const [sound, setSound] = useState<Sound>();

  const [localVolume, setLocalVolume] = useState(item.volume);
  const debouncedVolume = useDebounce(localVolume, 400);

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

  const toggleSound = async () => {
    if (item.playing) {
      dispatch(playerSlice.actions.playSound({ sound: item }));
    } else {
      dispatch(playerSlice.actions.playSound({ sound: item }));
    }
  };

  // console.log(item.playing);

  return (
    <Box w="45%" m={2} shadow={1} bg="amber.50" rounded={10} position="relative">
      <Flex
        position="absolute"
        width="100%"
        top={0}
        left={0}
        height="100%"
        justifyContent="center"
        alignItems="center"
        opacity={0.3}
        zIndex={1}
      >
        <Text textAlign="center" fontSize={82}>
          {item.emoji}
        </Text>
      </Flex>
      <Switch size="sm" position="absolute" right={0} top={0} isChecked={item.playing} zIndex={6} onToggle={toggleSound} />
      <Box pt={8} px={4} pb={5} position="relative" zIndex={4}>
        <Pressable onLongPress={onOpen}>
          <Text textAlign="center" fontSize="xl">
            {capitalize(item.name)}
          </Text>
        </Pressable>
        <Box width="100%" mt={2}>
          <Slider
            isDisabled={!item.playing}
            zIndex={5}
            opacity={item.playing ? 1 : 0.5}
            defaultValue={item.volume}
            value={localVolume}
            onChange={_v => {
              const v = +_v.toFixed(1);
              setLocalVolume(v);
            }}
            // onSlideStart=
            onTouchStart={() => onSlideStart()}
            onTouchEnd={() => onSlideEnd()}
            maxValue={1}
            step={0.1}
            minValue={0}
            colorScheme="red"
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Box>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item endIcon={<Icon as={<Ionicons name="checkmark" />} color="#40c556" size={7}></Icon>}>Variant 1</Actionsheet.Item>
          <Actionsheet.Item endIcon={<Icon as={<Ionicons name="color-wand" />} color="#626262" size={5}></Icon>} disabled>
            Variant 2 (Pro)
          </Actionsheet.Item>
          <Actionsheet.Item endIcon={<Icon as={<Ionicons name="color-wand" />} color="#626262" size={5}></Icon>} disabled>
            Variant 3 (Pro)
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default SoundItem;
