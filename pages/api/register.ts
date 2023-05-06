import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
import { userList } from './baseData';
import { sleep } from './login';
type Data = {

}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }
  await sleep(2000)
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
      tag: mock('@name'),
      avatar: mock('@image(200x200, @color, @color, @word)'),
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
