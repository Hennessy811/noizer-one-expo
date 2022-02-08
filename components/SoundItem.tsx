// import FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

import { Actionsheet, Box, Pressable, Row, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';
import useStore, { StoredSound } from '../store';

interface Props {
  name: string;
  variants: StoredSound[];
}

const SoundItem = ({ variants, name }: Props) => {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const toggleSound = useStore(state => state.player.toggleSound);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playingVariantIdx = variants.findIndex(v => v.playing);
  const playing = playingVariantIdx === -1;

  const activeVariant = variants[playing ? activeVariantIdx : playingVariantIdx];

  const { isOpen, onOpen, onClose } = useDisclose();

  const changeActiveVariant = (idx: number) => {
    if (!playing) {
      setActiveVariantIdx(idx);
    } else {
      toggleSound(activeVariant);
      setActiveVariantIdx(idx);
      toggleSound(variants[idx]);
    }

    onClose();
  };

  const playSound = async () => {
    // console.log('playSound', FileSystem.documentDirectory);
    // if (sound) await sound.unloadAsync();
    // else {
    //   const { sound } = await Audio.Sound.createAsync(
    //     {
    //       // localUri: '../assets/audio/Locations/Basketball court_fa-basketball/Basketball game.mp3',
    //       uri: '../assets/audio/Locations/Basketball court_fa-basketball/Basketball game.mp3',
    //       type: 'mp3',
    //     },
    //     {
    //       shouldPlay: true,
    //       volume: 1,
    //     }
    //   );
    //   setSound(sound);
    // }
  };

  return (
    <Box>
      <Pressable
        onLongPress={() => onOpen()}
        onPress={() => {
          toggleSound(activeVariant);
          playSound();
        }}
      >
        <Box px={3} py={3} bg="light.50" borderRadius="xl" borderWidth={2} borderColor={playing ? 'light.50' : 'primary.500'}>
          <Row space={1} ml={0.5}>
            {variants.map((variant, idx) => (
              <Box
                key={variant.variantName}
                w={1}
                h={1}
                bg={activeVariantIdx === idx ? 'primary.500' : 'muted.300'}
                borderRadius={50}
              ></Box>
            ))}
          </Row>

          <Text fontWeight={600} fontSize={18}>
            {name}
          </Text>
          <Text>{activeVariant.variantName}</Text>
        </Box>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="3xl"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            >
              Variants selection
            </Text>
          </Box>
          {variants.map((v, idx) => (
            <Actionsheet.Item onPress={() => changeActiveVariant(idx)} key={v.variantName}>
              {v.variantName}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default SoundItem;
