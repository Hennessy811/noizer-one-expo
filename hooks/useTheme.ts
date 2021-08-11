import { useState } from 'react';
import Colors from '../constants/Colors';
import useColorScheme from './useColorScheme';

const useTheme = () => {
  const colorScheme = useColorScheme();
  const [theme] = useState(Colors[colorScheme]);

  return theme;
};

export default useTheme;
