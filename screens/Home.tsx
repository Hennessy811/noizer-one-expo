import { Box, Divider, Text, View } from 'native-base';
import React from 'react';
import TopNav from '../components/TopNav';
import Sounds from './Sounds';

const Home = () => {
  return (
    <Box
      safeArea
      px={4}
      bg={{
        linearGradient: {
          colors: ['primary.50', 'red.100'],
          start: [0, 0],
          end: [1, 1],
        },
      }}
    >
      <View>
        <TopNav />
        <Divider mt={2} />

        <Sounds />
      </View>
    </Box>
  );
};

export default Home;
