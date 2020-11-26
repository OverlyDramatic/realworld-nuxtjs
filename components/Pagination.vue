<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        :class="[parseInt(index) + 1 === currentPage ? 'active' : '']"
        v-for="(item, index) in new Array(totalPages)">
        <a class="page-link" :key="`page${parseInt(index) + 1}`" v-text="parseInt(index) + 1" @click="$emit('changePage', parseInt(index) + 1)"></a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
}
</script>
<style></style>
