// const { default: axios } = require("axios");
// import axios from "axios";
// import { axios } from 'axios'

new Vue({
  el: '#app2',
  data() {
    return {
      posts: [],
      pageNumber: 1,
      limitPerPage: 9,
      totalPages: 0,
      searchQuery: ''
    }
  },
  methods: {
    changePage(page) {
      this.pageNumber = page
      this.fetchPosts()
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          params: {
            _page: this.pageNumber,
            _limit: this.limitPerPage,
          }
        })
        this.totalPages = Math.ceil((response.headers['x-total-count'] - 4900) / this.limitPerPage)
        this.posts = response.data
        console.log(response)
      } catch(e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
 })