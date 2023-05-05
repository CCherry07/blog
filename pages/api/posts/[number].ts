import type { NextApiRequest, NextApiResponse } from 'next'
import { Post, postsData } from '../baseData';
export type Data = {
  code: number,
  msg: string,
  data?: Array<Post> | Post
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 获取 url 中的 id
  const id = req.url?.match(/\/posts\/(\d+)/)?.[1]
  // get post by id
  if (id) {
    const post = getPostById(Number(id))
    if (post) {
      res.status(200).json({
        code: 0,
        msg: '获取成功',
        data: post
      })
      return
    }
    res.status(404).json({
      code: 1,
      msg: '获取失败，文章不存在',
    })
  }
}


// get post by id
function getPostById(id: number): Post | undefined {
  return postsData.find(post => post.id === id)
}
