// PARENT

Vue.component("news-container", {
  template: `<div class="news-container">
                  <news-source v-for="(source,index) in sources"
                    :source="source.name"
                    :visible="source.visible"
                    :resetNews="resetNews"
                    :index="index"
                    :key="Date.now()">
                  </news-source>
              </div>`,
  data() {
    return {
      sources: [
        { name: "bbc-news", visible: false },
        { name: "the-washington-post", visible: false },
        { name: "associated-press", visible: false },
        { name: "cnn", visible: false },
        { name: "buzzfeed", visible: false },
        { name: "mashable", visible: false },
        { name: "hacker-news", visible: false },
        { name: "techcrunch", visible: false }
      ]
    };
  },
  methods: {
    resetNews(target) {
      this.sources.forEach(function(key) {
        if (target === this.index) {
          console.log("its the same");
        } else {
          key.visible = false;
        }
      });
      this.sources[target].visible = true;
      console.log(this.sources);
    }
  }
});

// CHILD //

Vue.component("news-source", {
  props: ["source", "index", "visible", "resetNews"],
  template: `<div :class="source">
                <h4 @click="resetNews(index)">{{source.toUpperCase()}}</h4>
              <div v-if="this.isVisible" class="articles">
                <div v-for="article in news">
                  <h6>{{article.title}}</h6>
                </div>
              </div>
            </div>`,
  data() {
    return {
      news: [],
      isVisible: this.visible
    };
  },
  created() {
    const APIkey = "&sortBy=top&apiKey=26ce81bcd5214311bb4c8d1bd8761e20";
    const endPoint = "https://newsapi.org/v1/articles?source=";
    axios.get(endPoint + this.source + APIkey).then(res => {
      this.news = res.data.articles;
    });
  }
});

new Vue({
  el: "#root"
});
