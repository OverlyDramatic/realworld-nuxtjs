import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fcf993dc = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4efac9c7 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _ded290fe = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _c224a87e = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _27be3068 = () => interopDefault(import('..\\pages\\setting' /* webpackChunkName: "" */))
const _75b45c55 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _f49021e4 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _fcf993dc,
    children: [{
      path: "",
      component: _4efac9c7,
      name: "home"
    }, {
      path: "/login",
      component: _ded290fe,
      name: "login"
    }, {
      path: "/register",
      component: _ded290fe,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _c224a87e,
      name: "profile"
    }, {
      path: "/setting",
      component: _27be3068,
      name: "setting"
    }, {
      path: "/editor",
      component: _75b45c55,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _f49021e4,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
