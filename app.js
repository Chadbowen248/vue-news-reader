// PARENT

Vue.component("news-container", {
  template: `<div class="news-container">
                  <div class="sources">
                    <h3 @click="showArticles" v-for="(source,index) in sources">
                    {{source.toUpperCase()}} - {{index}}
                    </h3>
                  </div>
                  <news-source v-for="source in sources"
                    :articlesVisible="articlesVisible"
                    :source="source"
                    :key="Date.now()">
                  </news-source>
              </div>`,
  data() {
    return {
      sources: [
        "bbc-news",
        "the-washington-post",
        "associated-press",
        "cnn",
        "buzzfeed",
        "mashable",
        "hacker-news",
        "techcrunch"
      ],
      articlesVisible: false
    };
  },
  methods: {
    showArticles(e) {
      console.log(e.target.innerHTML.trim());
      this.articlesVisible = !this.articlesVisible;
    }
  }
});

// CHILD

Vue.component("news-source", {
  props: ["source", "articlesVisible"],
  template: `<div :class="source">
              <div v-if="articlesVisible" class="articles">
                <div v-for="article in news">
                  <h6>{{article.title}}</h6>
                </div>
              </div>
            </div>`,
  data() {
    return {
      news: []
    };
  },
  created() {
    const APIkey = "&sortBy=top&apiKey=26ce81bcd5214311bb4c8d1bd8761e20";
    const endPoint = "https://newsapi.org/v1/articles?source=";
    axios.get(endPoint + this.source + APIkey).then(res => {
      console.log(this.source);
      this.news = res.data.articles;
    });
  }
});

new Vue({
  el: "#root"
});
