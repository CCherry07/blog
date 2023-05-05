import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
import { userList } from './baseData'
const sleep = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, timeout);
  })
}
type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await sleep(3000) // 不知道为啥不生效
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }
  const { username, password } = req.body;
  const user = userList.find((user) => user.username === username && user.password === password)
  if (user) {
    const token = mock('@guid')
    user.token = token
    res.status(200).json({
      code: 0,
      msg: '登录成功',
      user: {
        token,
        id: user.id,
        name:user.username,
        email: user.email,
        avatar: user.avatar || 'https://avatars.githubusercontent.com/u/24776491?v=4'
      }
    })
  } else {
    res.status(401).json({
      code: 1,
      msg: '用户名或密码错误'
    })
  }
}
