import { Ionicons } from '@expo/vector-icons';
import { Box, Button, HStack, Icon } from 'native-base';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerSlice } from '../store/playerSlice';

const SoundsPlayerControls = () => {
  const dispatch = useAppDispatch();
  const { muted } = useAppSelector(store => store.player);

  return (
    <Box position="absolute" bottom={100} left={0} width="100%">
      <HStack width="100%" justifyContent="center" alignItems="center">
        <HStack
          bg={{
            linearGradient: {
              colors: ['lightBlue.400', 'violet.800'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          borderRadius={25}
          px={4}
          py={2}
        >
          <Button onPress={() => dispatch(playerSlice.actions.playRandomSet())} size="xs" variant="ghost">
            <Icon as={<Ionicons name="shuffle" />} color="white" size={7}></Icon>
          </Button>
          <Button onPress={() => dispatch(playerSlice.actions.stop())} size="xs" variant="ghost" ml={4}>
            <Icon as={<Ionicons name="stop" />} color="white" size={7}></Icon>
          </Button>
          <Button onPress={() => dispatch(playerSlice.actions.toggleMute())} size="xs" variant="ghost" ml={4}>
            <Icon as={<Ionicons name={muted ? 'volume-high-sharp' : 'volume-mute-sharp'} />} color="white" size={7}></Icon>
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default SoundsPlayerControls;
