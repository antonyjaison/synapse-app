import { View, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const ChatHeaderRight = () => {
  return (
    <View className="mr-3 rounded-full overflow-hidden">
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#ECDEDE", true)}
        onPress={() => console.log("Notification icon pressed")}
        useForeground // Ensure ripple is in the foreground
      >
        <View className="bg-[#FFE8E8] w-12 h-12 justify-center items-center rounded-full">
          <FontAwesome name="ellipsis-v" size={20} color="black" />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default ChatHeaderRight