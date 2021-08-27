import { Ionicons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Button } from 'native-base';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerSlice } from '../store/playerSlice';

const TopNav = () => {
  return (
    <HStack mt={4}>
      <Heading>Noizer One</Heading>
    </HStack>
  );
};

export default TopNav;
