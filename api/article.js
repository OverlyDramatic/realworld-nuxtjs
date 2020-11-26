import request from '@/utils/request'

// * List Articles
export async function listArticles(params) {
  return await request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// * single Article
export async function singleArticle(slug) {
  return await request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

// * tags
export async function getTags() {
  return await request({
    method: 'GET',
    url: '/api/tags'
  })
}
