// import { useState } from 'react'
import {atom} from 'recoil'

// const [modalState , setModalState] = useState(false)

export const PostState = atom({
  key:"postState",
  default:false,
})
