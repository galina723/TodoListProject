import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
