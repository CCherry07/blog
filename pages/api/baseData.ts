export const userList = [
  {
    username: 'cherry', password: 'cherry', id: 1, avatar: 'https://avatars.githubusercontent.com/u/24776491?v=4', email: 'c_chenjunguang@163.com',
    token: ''
  },
  {
    username: 'admin', password: 'admin', id: 2, avatar: 'https://avatars.githubusercontent.com/u/24776491?v=4', email: '',
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
