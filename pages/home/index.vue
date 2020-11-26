<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="[tab === 0 ? 'active' : '', user ? '' : 'disabled']"
                  @click.prevent="clickTab(0)"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="[tab === 1 ? 'active' : '']"
                  @click.prevent="clickTab(1)"
                  >Global Feed</a
                >
              </li>
              <li class="nav-item" v-if="tab === 2">
                <a class="nav-link active" @click.prevent="clickTab(2)"
                  ><i class="ion-pound"></i> {{ currentTag }}</a
                >
              </li>
            </ul>
          </div>

          <div v-if="articleList && articleList.articles.length">
            <div
              class="article-preview"
              v-for="item in articleList.articles"
              :key="`article${item.slug}`"
            >
              <div class="article-meta">
                <nuxt-link :to="`/profile/${item.author.username}`"
                  ><img
                    :src="item.author.image || ''"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="`/profile/${item.author.username}`"
                    class="author"
                    >{{ item.author.username }}</nuxt-link
                  >
                  <span class="date">{{ item.updatedAt.slice(0, 10) }}</span>
                </div>
                <button
                  class="btn btn-sm pull-xs-right"
                  :class="[
                    item.favorited ? 'btn-primary' : 'btn-outline-primary'
                  ]"
                >
                  <i class="ion-heart"></i> {{ item.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="`/article/${item.slug}`" class="preview-link">
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </div>
          <div v-else-if="articleList && !articleList.articles.length">
            No articles are here... yet.
          </div>
          <div v-else>Loading articles...</div>

          <Pagination
            :totalPages="totalPages"
            :currentPage="page"
            @changePage="changePage"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                class="tag-pill tag-default"
                :class="[]"
                v-for="(item, index) in tags"
                :key="`tags${index}`"
                @click.prevent="
                  tab = 2
                  currentTag = item
                  getHomeData()
                "
                >{{ item }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import { mapState, mapActions } from 'vuex'
import { getTags } from '@/api/article'

export default {
  name: 'Home',
  components: {
    Pagination
  },
  data() {
    return {
      tab: 1, // * 0-yourFeed 1-globalFeed 2-tag
      page: 1,
      pageSize: 20,
      currentTag: undefined
    }
  },
  async asyncData(context) {
    const tags = await context.store.dispatch('getTags')
    return { tags }
  },
  computed: {
    ...mapState(['user', 'articleList']),
    totalPages() {
      return this.articleList
        ? this.articleList.articlesCount / this.pageSize
        : 0
    }
  },
  methods: {
    ...mapActions(['getListArticles']),
    calcOffset() {
      return this.pageSize * (this.page - 1)
    },
    clickTab(tab) {
      if (!tab && !this.user) {
        return
      }
      if (this.tab !== tab) {
        this.tab = tab
        this.getHomeData()
      }
    },
    changePage(event) {
      this.page = event
      this.getHomeData()
    },
    getHomeData() {
      const query = {
        offset: this.calcOffset(),
        limit: this.pageSize
      }
      if (this.tab === 0) {
        query.author = this.user.username
      } else if (this.tab === 2) {
        query.tag = this.currentTag
      }
      this.getListArticles(query)
    }
  },
  created() {
    if (this.user) {
      this.tab = 0
    }
    this.getHomeData()
  }
}
</script>
<style>
.nav-link {
  cursor: pointer;
}
.tag-default:focus,
.tag-default:hover {
  background-color: #687077;
  cursor: pointer;
}
</style>
