// PARENT

Vue.component("news-container", {
  template: `<div>
               
                  <news-source v-for="article in news" 
                    
                    :title="article.title"
                    :image="article.urlToImage"
                    :URL="article.url"
                    :key="Date.now()">
                  </news-source>
             
              </div>`,
  data() {
    var sources = [
      "?source=the-washington-post&sortBy=top",
      "?source=buzzfeed&sortBy=top",
      "?source=mashable&sortBy=top"
    ];
    var news = [];
    var isLoading = true;
    return {
      news,
      isLoading,
      sources
    };
  },
  //move to child component, pass source string as prop is child --- maybe
  mounted() {
    const APIkey = "&apiKey=26ce81bcd5214311bb4c8d1bd8761e20";
    const endPoint = "https://newsapi.org/v1/articles";
    axios.get(endPoint + this.sources[2] + APIkey).then(res => {
      this.news = res.data.articles.slice(1, 9);
      this.isLoading = false;
    });
  }
});

// CHILD

Vue.component("news-source", {
  props: ["title", "image", "URL", "source"],
  template: `<div>
              <a :href="URL">
                {{title}}
              </a>
              {{source}}
              <img :src="image">
            </div>`
});

new Vue({
  el: "#root"
});
