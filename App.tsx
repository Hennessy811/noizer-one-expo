import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import ZenScreen from './screens/ZenScreen';
import { LinearGradient } from 'expo-linear-gradient';
import PoolScreen from './screens/PoolScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e2fbf3',
      100: '#c4eadc',
      200: '#a2dbc4',
      300: '#7fcbaa',
      400: '#5dbc90',
      500: '#43a27c',
      600: '#327e66',
      700: '#215a4d',
      800: '#0f3730',
      900: '#001510',
    },
  },
});
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider config={config} theme={theme}>
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabelStyle: {
                  color: '#1c1917',
                },
                tabBarIcon: ({ color, size }) => {
                  switch (route.name) {
                    case 'Sounds':
                      return <Ionicons name="play" size={size} color={color} />;
                    case 'Zen mode':
                      return <Entypo name="infinity" size={size} color={color} />;
                    case 'Settings':
                      return <Ionicons name="settings-sharp" size={size} color={color} />;
                    case 'Pool':
                      return <MaterialCommunityIcons name="format-wrap-tight" size={size} color={color} />;

                    default:
                      return <Ionicons name="code-slash-outline" size={size} color={color} />;
                  }
                },
                tabBarActiveTintColor: '#43a27c',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                  backgroundColor: 'primary.500',
                },
              })}
            >
              <Tab.Screen name="Sounds" component={Home} />
              <Tab.Screen name="Zen mode" component={ZenScreen} />
              <Tab.Screen name="Pool" component={PoolScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
