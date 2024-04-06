import { View, Text } from 'react-native'
import React from 'react'
import BackgroundGradient from '@/components/Layouts/BackgroundGradient'
import ChatInput from '@/components/ChatInput'

const ChatTab = () => {
  return (
    <BackgroundGradient>
      <ChatInput/>
    </BackgroundGradient>
  )
}

export default ChatTab