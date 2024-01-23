import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

import ForecastInfoCard from "@/components/ForecastInfoCard.vue";

const app = createApp(App);

app.component("forecast-card", ForecastInfoCard);
app.use(router);
app.mount("#app");
