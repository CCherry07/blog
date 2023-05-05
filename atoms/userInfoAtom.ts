
import {atom} from 'recoil'

export const userinfoState = atom({
  key:"userinfoState",
  default:{
    id: 1,
    name: 'cherry',
    email: '',
    avatar: 'https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667235600&t=c35915a8d34897267688ebc08bcf8c4c'
  },
})
