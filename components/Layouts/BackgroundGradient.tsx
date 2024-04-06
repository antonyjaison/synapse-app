import { ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

type BackgroundGradientProps = {
  children: React.ReactNode
}

const BackgroundGradient = ({ children }: BackgroundGradientProps) => {
  return (
    <LinearGradient className="w-full h-screen" colors={["#fff", "#FCDBD5"]}>
      <ScrollView className="px-5">
        {children}
      </ScrollView>
    </LinearGradient>
  )
}

export default BackgroundGradient