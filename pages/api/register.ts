import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
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
  res.status(200).json({
    code: 0,
    msg: '注册成功',
    token: mock('@guid')
  })
}
