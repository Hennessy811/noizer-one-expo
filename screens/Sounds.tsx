import { Ionicons } from '@expo/vector-icons';
import { entries, groupBy } from 'lodash';
import { Box, Text, Flex, Heading, ScrollView, VStack, HStack, Button, Icon, useDisclose } from 'native-base';
import React, { useState } from 'react';
import SoundItem from '../components/SoundItem';
import { useAppSelector } from '../store/hooks';

const Sounds = () => {
  const { muted, playing, sounds } = useAppSelector(store => store.player);

  const groupedSounds = groupBy(sounds, s => s.group);

  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
    <ScrollView safeAreaBottom={4} scrollEnabled={scrollEnabled}>
      <VStack mb={120}>
        {entries(groupedSounds).map(([group, sounds]) => (
          <Box key={group}>
            <HStack my={2}>
              <Heading size="lg" fontWeight={300}>
                {group}
              </Heading>

              <Button disabled size="xs" variant="ghost" mt={1} ml={1}>
                <Icon as={<Ionicons name="shuffle" />} color="#227C9D" size={5}></Icon>
              </Button>
            </HStack>
            <Flex wrap="wrap" direction="row">
              {sounds.map(item => (
                <SoundItem
                  onSlideEnd={() => setScrollEnabled(true)}
                  onSlideStart={() => setScrollEnabled(false)}
                  item={item}
                  key={item.path}
                />
              ))}
            </Flex>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Sounds;
