import type { NextApiRequest, NextApiResponse } from 'next'
import { postsData } from 'pages/api/baseData'
type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 匹配到 /posts/[number]/comments
  const baseUrl = req.url?.match(/\/posts\/\d+\/comments/)?.[0]
  const id = baseUrl?.match(/\d+/)?.[0]
  if (req.method === 'POST') {
    // update post comment
    postsData.forEach((post) => {
      if (post.id === Number(id)) {
        post.comments.unshift({
          id: post.comments.length + 1,
          content: req.body.comment,
          timestamp: req.body.timestamp,
          userImg: req.body.userImg,
          tag: req.body.tag
        })
      }
    })
    res.status(200).json({
      code: 0,
      msg: '更新成功',
    })
  }
}
