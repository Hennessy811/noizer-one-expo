import { entries, pick } from 'lodash';
import { Box, Text, ScrollView, VStack, Column } from 'native-base';
import React from 'react';
import SoundItem from '../components/SoundItem';
import useStore, { StoredSound } from '../store';

export type GroupedSounds = Record<string, Record<string, StoredSound[]>>;

const listSounds = (sounds: StoredSound[]): GroupedSounds =>
  sounds.reduce((result: Record<string, Record<string, StoredSound[]>>, item) => {
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
  const sounds = useStore(state => state.player.sounds);
  const groupedSounds = listSounds(sounds);

  // console.log(groupedSounds, sounds);

  return (
    <Box pb={160}>
      <ScrollView>
        <VStack>
          {entries(pick(groupedSounds, 'Locations', 'Background', 'Tweak', 'Color noise', 'Others', 'ASMR')).map(([group, items]) => (
            <Box key={group}>
              <Text fontSize="3xl" mt={4} fontWeight="500" mb={2}>
                {group}
              </Text>

              <Column space={3}>
                {entries(items).map(([sound, variants]) => (
                  <SoundItem key={sound} name={sound} variants={variants} />
                ))}
              </Column>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Sounds;
