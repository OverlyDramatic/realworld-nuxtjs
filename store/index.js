// * cookie解析器
const cookieparser = process.server ? require('cookieparser') : undefined
// * module
import article from './article'

// * 服务端渲染期间运行的都是同一个实例
// * 将store放在函数里，防止数据冲突
export const state = () => {
  return {
    // * 当前登录用户的登录状态
    user: null,
    ...article.state()
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  ...article.mutations
}

export const actions = {
  // * nuxtServerInit 一个特殊的action方法
  // * 会在服务端渲染期间自动调用
  // * 作用：初始化容器数据，传递给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      // * 使用coolieparser把cookie字符串转为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  },
  ...article.actions
}
