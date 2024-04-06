import { View, Text, Image } from 'react-native'
import React from 'react'

const HomeHeaderTitle = () => {
  return (
    <View className=' h-fit flex-row gap-3'>
        <Image className='w-10 h-10' source={require("@/assets/images/avatar.png")}/>
        <View>
            <Text className='font-medium text-base'>Good Morning</Text>
            <Text className=' text-xs'>Sarah</Text>
        </View>
    </View>
  )
}

export default HomeHeaderTitle