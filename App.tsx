import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Box, Button, Divider, Flex, Heading, HStack, Icon, NativeBaseProvider, ScrollView, Text, View, VStack } from 'native-base';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Sounds from './screens/Sounds';
import { useAppDispatch } from './store/hooks';
import { playerSlice } from './store/playerSlice';
import TopNav from './components/TopNav';
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
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider config={config}>
          <SafeAreaProvider>
            <StatusBar />
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarLabelStyle: {
                    color: 'white',
                  },
                  tabBarIcon: ({ focused, color, size }) => {
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
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: {
                    backgroundColor: '#312e81',
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
      </Provider>
    );
  }
}
