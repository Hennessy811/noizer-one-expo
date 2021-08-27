import { Box, Divider, Text, View } from 'native-base';
import React from 'react';
import SoundsPlayerControls from '../components/SoundsPlayerControls';
import TopNav from '../components/TopNav';
import Sounds from './Sounds';

const Home = () => {
  return (
    <Box
      safeArea
      px={4}
      bg={{
        linearGradient: {
          colors: ['amber.200', 'red.300', 'violet.400'],
          start: [0, 0],
          end: [1, 0.5],
        },
      }}
    >
      <View>
        <TopNav />
        <Divider mt={2} />

        <Sounds />
        <SoundsPlayerControls />
      </View>
    </Box>
  );
};

export default Home;
