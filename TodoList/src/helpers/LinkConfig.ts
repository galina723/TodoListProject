import {Linking} from 'react-native';

const config = {
  screens: {
    Tab: {
      path: 'tabnavigator',
      screens: {
        Todolist: {
          path: 'todolist',
          screens: {
            TodolistScreen: {
              path: 'todolistscreen/:refresh',
            },
          },
        },

        Note: {
          path: 'note',
          screens: {
            NoteScreen: {
              path: 'notescreen/:refresh',
            },
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['exp://app', 'https://'],
  config,
};

export default linking;

export const handleLink = async (url: string) => {
  await Linking.canOpenURL(url)
    .then(res => {
      if (res) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
