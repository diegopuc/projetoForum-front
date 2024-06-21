import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

setInterval(() => {
  useAuthStore().checkAutoLogout();
}, 60 * 60 * 1000);

app.mount("#app");
