import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/styles/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import "element-theme-chalk";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(ElementPlus, {
  // size: "small",
  zIndex: 3000,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
