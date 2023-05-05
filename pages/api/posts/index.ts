import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs';
import { Post, postsData } from '../baseData';
export type Data = {
  code: number,
  msg: string,
  data?: Array<Post> | Post
}

// Posts Data
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.status(200).json({
      code: 0,
      msg: '获取成功',
      data: [
        ...postsData,
        ...mock({
          'list|10': [{
            'id|+1': 1,
            title: '@ctitle(5, 10)',
            content: '@cparagraph(5, 10)',
            'status|1': ['published', 'draft', 'deleted'],
            like: '@integer(0, 100)',
            'author|1': ['@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname'],
            'comment|1-100': 1,
            'star|1-100': 1,
            'view|1-100': 1,
            img: '@image(200x200, @color, @color, @word)',
            userImg: '@image(200x200, @color, @color, @word)',
            timestamp: '@datetime',
            tag: ['@tag', '@tag'],
            comments: mock({
              'list|10': [{
                'id|+1': 1,
                title: '@ctitle(5, 10)',
                content: '@cparagraph(5, 10)',
                'status|1': ['published', 'draft', 'deleted'],
                like: '@integer(0, 100)',
                'author|1': ['@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname'],
                'comment|1-100': 1,
                'star|1-100': 1,
                'view|1-100': 1,
                img: '@image(200x200, @color, @color, @word)',
                userImg: '@image(200x200, @color, @color, @word)',
                timestamp: '@datetime',
                tag: ['@tag', '@tag'],
              }]
            }).list
          }]
        }).list
      ]
    })
  } else if (req.method === 'POST') {
    postsData.push({
      id: postsData.length + 1,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      like: req.body.like,
      image: req.body.image,
      username:req.body.username,
      userImg: req.body.userImg,
      tag: ["live"],
      comments: mock({
        'list|10': [{
          'id|+1': 1,
          title: '@ctitle(5, 10)',
          content: '@cparagraph(5, 10)',
          'status|1': ['published', 'draft', 'deleted'],
          like: '@integer(0, 100)',
          'author|1': ['@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname', '@cname'],
          'comment|1-100': 1,
          'star|1-100': 1,
          'view|1-100': 1,
          image: '@image(200x200, @color, @color, @word)',
          userImg: '@image(200x200, @color, @color, @word)',
          timestamp: '@datetime',
          tag: ['@tag', '@tag'],
        }]
      }).list
    })


    res.status(200).json({
      code: 0,
      msg: '创建成功',
    })
  }
}

// delete post by id

function deletePostById(id: number): boolean {
  const postIndex = postsData.findIndex(post => post.id === id)
  if (postIndex > -1) {
    postsData.splice(postIndex, 1)
    return true
  }
  return false
}

// update post by id

function updatePostById(id: number, post: Post): boolean {
  const postIndex = postsData.findIndex(post => post.id === id)
  if (postIndex > -1) {
    postsData.splice(postIndex, 1, post)
    return true
  }
  return false
}
