// const { default: axios } = require("axios");
// import axios from "axios";
// import { axios } from 'axios'

new Vue({
  el: '#app2',
  data() {
    return {
      posts: [],
      // post: {
      //   title: '',
      //   body: ''
      // }
    }
  },
  methods: {
   async fetchPosts() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
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