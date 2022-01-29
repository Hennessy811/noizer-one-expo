import { Ionicons } from '@expo/vector-icons';
import { entries, groupBy, pick } from 'lodash';
import { Box, Text, Flex, Heading, ScrollView, HStack, Button, Icon, useDisclose, View, Divider, VStack } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import SoundItem from '../components/SoundItem';
import TopNav from '../components/TopNav';
import { ISoundItem } from '../constants/sounds';
import useStore from '../store';

export type GroupedSounds = Record<string, Record<string, ISoundItem[]>>;

const listSounds = (sounds: ISoundItem[]): GroupedSounds =>
  sounds.reduce((result: Record<string, Record<string, ISoundItem[]>>, item) => {
    // Get app object corresponding to current item from result (or insert if not present)
    const group = (result[item.group] = result[item.group] || {});

    // Get type array corresponding to current item from app object (or insert if not present)
    const sound = (group[item.sound] = group[item.sound] || []);

    // Add current item to current type array
    sound.push(item);

    // Return the result object for this iteration
    return result;
  }, {});

const Sounds = () => {
  const sounds = useStore(state => state.sounds);
  const groupedSounds = listSounds(sounds);

  return (
    <Box pb={160}>
      <ScrollView>
        <VStack>
          {entries(pick(groupedSounds, 'Locations', 'Background', 'Tweak', 'Color noise', 'Others', 'ASMR')).map(([group, items]) => (
            <Box key={group}>
              <Text fontSize="3xl" mt={8} fontWeight="500" mb={4}>
                {group}
              </Text>

              <Box>
                {entries(items).map(([sound, variants]) => (
                  <SoundItem key={sound} name={sound} variants={variants} />
                ))}
              </Box>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Sounds;
