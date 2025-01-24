import React, {createContext, useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TabNavigator from './src/navigators/TabNavigator';
import StackNavigator from './src/navigators/TodoListNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodoListNavigator from './src/navigators/TodoListNavigator';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import LoginNavigator from './src/navigators/LoginNavigator';
import {Database} from './src/helpers/database';
import LayoutDemo from './src/screens/LayoutDemo';
import linking from './src/helpers/LinkConfig';

const App = () => {
  const NavigationContext = createContext({});
  const NavigationProvider = NavigationContext.Provider;

  const navigationRef: any = useNavigationContainerRef();
  const routeNameRef: any = useRef();

  const updateRoutesToContext = () => {
    const currentRoute = navigationRef.current.getCurrentRoute();
    routeNameRef.current = {
      routeName: currentRoute.name,
      params: currentRoute.params,
    };
  };

  const createDB = async () => {
    await Database.createTable(
      'user',
      'id TEXT PRIMARY KEY, userName TEXT, fullName TEXT, pass TEXT',
    );

    await Database.createTable(
      'note',
      'id TEXT PRIMARY KEY, title TEXT, content TEXT, status TEXT',
    );

    await Database.createTable(
      'todo',
      'id TEXT PRIMARY KEY, content TEXT, status TEXT',
    );
  };

  useEffect(() => {
    createDB();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationProvider value={routeNameRef?.current ?? ''}>
        <NavigationContainer
          onReady={() => {
            updateRoutesToContext();
          }}
          onStateChange={async () => {
            updateRoutesToContext();
          }}
          ref={navigationRef}
          linking={linking}>
          <LoginNavigator />
        </NavigationContainer>
      </NavigationProvider>
    </GestureHandlerRootView>
    //<LayoutDemo />
  );
};

export default App;
