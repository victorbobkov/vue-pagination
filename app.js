new Vue({
  el: '#app2',
  data() {
    return {
      landingPreviews: [],
      pageNumber: 1,
      limitPerPage: 9,
      totalPages: 0,
      searchQuery: ''
    }
  },
  methods: {
    changePage(page) {
      this.pageNumber = page;
      this.fetchLandingPreviews();
    },
    async fetchLandingPreviews() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          params: {
            _page: this.pageNumber,
            _limit: this.limitPerPage,
          }
        })
        this.totalPages = Math.ceil((response.headers['x-total-count'] - 4900) / this.limitPerPage);
        this.landingPreviews = response.data;
        console.log(response);
      } catch(e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchLandingPreviews()
  }
});