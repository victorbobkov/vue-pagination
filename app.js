new Vue({
  el: '#app2',
  data() {
    return {
      landingPreviews: [],
      pageNumber: 1,
      limitPerPage: 9,
      totalPages: 0,
      searchQuery: '',
      modelValue: {},
      // options: [],
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
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
      } catch(e) {
        console.log(e);
      }
    },
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value); //update:selectedSort
    }
  },
  mounted() {
    this.fetchLandingPreviews();
  },
  computed: {
    searchedLandings() {
      return this.landingPreviews.filter(preview => preview.title.includes(this.searchQuery));
    }
  },
  watch: {
    selectedSort(newValue) {
      this.landingPreviews.sort((land1, land2) => {
        return land1[newValue]?.localeCompare(land2[newValue]);
      });
    }
  }
});