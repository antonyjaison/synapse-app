import { View, Text } from 'react-native'
import React from 'react'
import DocumentCard from './DocumentCard'

const DocumentsSection = () => {
  return (
    <View className="bg-[#FFFEFE] px-6 py-5 rounded-2xl flex-col">
      <Text className='font-medium text-lg'>Your Documents</Text>

      <View className=' flex-row flex-wrap justify-around py-2'>
        <DocumentCard/>
        <DocumentCard/>
        <DocumentCard/>
        <DocumentCard/>
      </View>
    </View>
  )
}

export default DocumentsSection