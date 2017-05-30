Vue.component("task", {
  template: `<div>
                <h3>Tittle</h3>
                <slot></slot>
            Foobar</div>`
});

var Task = new Vue({
  el: "#root"
});
