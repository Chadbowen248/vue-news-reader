// PARENT

Vue.component("news-container", {
  template: `<div>
                  <news-source v-for="source in sources"
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
      ]
    };
  }
});

// CHILD

Vue.component("news-source", {
  props: ["source"],
  template: `<div :class="source">
              <h3>{{source.toUpperCase()}}</h3>
              <div v-for="article in news">
                {{article.title}}
              </div>
            </div>`,
  data() {
    return { news: [] };
  },
  mounted() {
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
