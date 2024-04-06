import { Image } from 'react-native'
import React from 'react'

const Avatar = () => {
  return (
    <Image className='w-10 h-10' source={require("@/assets/images/avatar.png")}/>

  )
}

export default Avatar