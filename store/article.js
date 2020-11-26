import { listArticles, singleArticle, getTags } from '@/api/article'

export default {
  state: () => {
    return {
      articleList: null,
      singleArticle: null,
      tags: []
    }
  },
  mutations: {
    getArticleList(state, data) {
      state.articleList = data
    },
    getSingleArticle(state, data) {
      state.singleArticle = data
    },
    updateTags(state, data) {
      state.tags = data
    }
  },
  actions: {
    async getListArticles({ commit }, params) {
      this.articleList = null
      const res = await listArticles(params)
      commit('getArticleList', res.data)
    },
    async getSingleArticle({ commit }, params) {
      this.singleArticle = null
      const res = await singleArticle(params)
      commit('getSingleArticle', res.data.article)
      return res.data.article
    },
    async getTags({ commit }) {
      const { data } = await getTags()
      commit('updateTags', data.tags)
      return data.tags
    }
  }
}
