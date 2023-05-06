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
    const mockData = mock({
      'list|10': [{
        'id|+1': 100,
        title: '@title(5, 10)',
        content: '@paragraph(1, 3)',
        'status|1': ['published', 'draft', 'deleted'],
        like: '@integer(0, 100)',
        'author|1': ['@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name'],
        'comment|1-100': 1,
        'star|1-100': 1,
        'view|1-100': 1,
        img: '@image(200x200, @color, @color, @word)',
        userImg: '@image(200x200, @color, @color, @word)',
        timestamp: '@datetime',
        tag: ['@name'],
        comments: mock({
          'list|10': [{
            'id|+1': 1000,
            title: '@title(5, 10)',
            content: '@paragraph(1, 3)',
            'status|1': ['published', 'draft', 'deleted'],
            like: '@integer(0, 100)',
            'author|1': ['@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name'],
            'comment|1-100': 1,
            'star|1-100': 1,
            'view|1-100': 1,
            img: '@image(200x200, @color, @color, @word)',
            userImg: '@image(200x200, @color, @color, @word)',
            timestamp: '@datetime',
            tag: ['@name'],
          }]
        }).list
      }]
    }).list
    if (postsData.length < 10) {
      postsData.push(...mockData)
    }
    res.status(200).json({
      code: 0,
      msg: '获取成功',
      data: postsData
    })
  } else if (req.method === 'POST') {
    postsData.unshift({
      id: postsData.length + 1,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      like: req.body.like,
      image: req.body.image,
      username: req.body.username,
      userImg: req.body.userImg,
      tag: ['@name'],
      timestamp: '@datetime',
      comments: mock({
        'list|10': [{
          'id|+1': 1000,
          title: '@title(1, 3)',
          content: '@paragraph(1, 3)',
          'status|1': ['published', 'draft', 'deleted'],
          like: 0,
          'author|1': ['@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name', '@name'],
          'comment|1-100': 1,
          'star|1-100': 1,
          'view|1-100': 1,
          image: '@image(200x200, @color, @color, @word)',
          userImg: '@image(200x200, @color, @color, @word)',
          timestamp: '@datetime',
          tag: ['@name'],
        }]
      }).list
    })


    res.status(200).json({
      code: 0,
      msg: '创建成功',
    })
  } else if (req.method === 'DELETE') {
    const id = Number(req.body.id)
    if (deletePostById(id)) {
      res.status(200).json({
        code: 0,
        msg: '删除成功',
      })
    } else {
      res.status(200).json({
        code: 1,
        msg: '删除失败',
      })
    }
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
