import type { NextApiRequest, NextApiResponse } from 'next'
import { userList } from './baseData';
type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'GET') {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const user = userList.find((user) => user.token === token)
      if (user) {
        res.status(200).json({
          code: 0,
          msg: '获取用户信息成功',
          user: {
            token: user?.token,
            id: 1,
            name: 'cherry',
            email: 'c_chenjunguang@163.com'
          }
        })
      } else {
        res.status(401).json({
          code: 1,
          msg: '用户不存在'
        })
      }
    }
  }
}
