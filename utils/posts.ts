import * as React from 'react'
// @ts-ignore
import { useQuery, queryCache, useQueryClient, QueryKey } from 'react-query'
import { useClient } from 'context/auth-context'
import type { Client } from './api-client'

const loadingPost = {
  title: 'Loading...',
  author: 'loading...',
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingPost: true,
}

const loadingPosts = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-post-${index}`,
  ...loadingPost,
}))

const postQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const usePostsConfig = (queryKey: any, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
      async onMutate(target: any) {
        const previousItems = queryClient.getQueriesData(queryKey)
        queryClient.setQueryData(queryKey, (old?: any[]) => {
          return callback(target, old)
        })
        return { previousItems }
      },
      onError(error: any, newItem: any, context: any) {
        queryClient.setQueryData(queryKey, (context as { previousItems: any[] }).previousItems)
      },
      onSuccess: () => queryClient.invalidateQueries(queryKey),
  }
}

const getPostsSearchConfig = (client: Client, id: number) => ({
  queryKey: ['postSearch', { id }],
  queryFn: () =>
    client(`posts/${encodeURIComponent(id)}`).then(data => data.data),
  config: {
    onSuccess(posts: any) {
      for (const post of posts) {
        queryCache.setQueryData(
          ['post', { postId: post.id }],
          post,
          postQueryConfig,
        )
      }
    },
  },
})

function usePostSearch(id: number) {
  const client = useClient()
  const result = useQuery(getPostsSearchConfig(client, id))
  return { ...result, post: result.data ?? loadingPosts }
}

function usePost(postId: number) {
  const client = useClient()
  const { data } = useQuery({
    queryKey: ['post', { postId }],
    queryFn: () => client(`posts/${postId}`).then(data => data.data),
    ...postQueryConfig,
  })
  return data ?? loadingPost
}

export const useDeleteUpdate = (queryKey: QueryKey) =>
  usePostsConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditUpdate = (queryKey: QueryKey) =>
  usePostsConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? {
    ...item
    , ...target
  } : item) || [])
export const useAddUpdate = (queryKey: QueryKey) => usePostsConfig(queryKey, (target, old) => old ? [...old, target] : [])


function useRefetchPostSearchQuery() {
  const client = useClient()
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries('postSearch')
      await queryCache.prefetchQuery(getPostsSearchConfig(client, 0))
    },
    [client],
  )
}

function setQueryDataForPost(post: any) {
  queryCache.setQueryData(['post', { postId: post.id }], post, postQueryConfig)
}

export { usePost, usePostSearch, useRefetchPostSearchQuery, setQueryDataForPost }
