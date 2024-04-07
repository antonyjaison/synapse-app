import GraphCard from "@/components/GraphCard";
import { View, Text } from 'react-native'
import React from 'react'
import BackgroundGradient from '@/components/Layouts/BackgroundGradient'

const HealthTab = () => {
  return (
    <BackgroundGradient>
      <View>
        <Text>HealthTab</Text>
      </View>
      <View className="px-5 pt-4 flex-1">{/* <GraphCard /> */}</View>
    </BackgroundGradient>
  );
}

export default HealthTab