// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
type Data = {
  
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.status(405).end() //Method Not Allowed
    return
  }
  res.status(200).json(mock({ 
    "list|1-10":[{
      'id|+1':1,
      'name':'@cname',
      'age|18-60':1,
      'sex|1':['男','女'],
      'address':'@county(true)',
      'birth':'@date("yyyy-MM-dd")',
      'img':'@image("200x200")'
    }]
   }))
}

