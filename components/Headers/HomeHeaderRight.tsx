import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeHeaderRight = () => {

  return (
    <View className='bg-[#FFE8E8] p-3 rounded-full mr-2 relative'>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ECDEDE', true)}
        onPress={() => console.log('Notification icon pressed')}
      >
        <View accessible accessibilityRole="button">
          <FontAwesome name="bell-o" size={20} color="black" />
        </View>
      </TouchableNativeFeedback>
      <View className='w-3 h-3 bg-[#F19483] absolute right-0 rounded-full'></View>
    </View>
  );
};

export default HomeHeaderRight;
