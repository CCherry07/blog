export const userList = [
  {
    username: 'cherry', password: 'cherry', id: 1, avatar: 'https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667235600&t=c35915a8d34897267688ebc08bcf8c4c', email: 'c_chenjunguang@163.com',
    token: '',tag:'antdv'
  },
  {
    username: 'cherry7', password: 'cherry7', id: 2, avatar: 'https://avatars.githubusercontent.com/u/24776491?v=4', email: 'cherry7@163.com',
    token: ''
  },
]

export interface Comment {
  id: number
  userImg: string
  content: string
  tag: string[]
  timestamp: string
}
export interface Post {
  id: number,
  title: string,
  content: string,
  status: string,
  like: number,
  image?: string,
  userImg?: string
  tag?: string[]
  username?: string,
  comments: Comment[]
}

export const postsData: Post[] = [

]
