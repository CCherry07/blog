import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
import { userList } from './baseData';
type Data = {

}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }
  const { username, password } = req.body
  if (userList.some(item => item.username === username)) {
    res.status(200).json({
      code: 1,
      msg: '用户名已存在'
    })
    return
  } else {
    const user = {
      id: mock('@guid'),
      username,
      password,
      avatar: mock('@image(200x200)'),
      token: mock('@guid'),
      email: mock('@email')
    }
    userList.push(user)
    res.status(200).json({
      code: 0,
      msg: '注册成功',
      user
    })
  }
}
