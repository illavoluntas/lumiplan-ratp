import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Screen from "./pages/Screen.vue";
import ScreenIDFM from "./pages/ScreenIDFM.vue";
import Editor from "./pages/Editor.vue";

const routes = [
  { path: "/", component: Home },
  {
    name: "DesserteDetails",
    path: "/screen/:line?/:trip?",
    component: Screen,
  },
  {
    name: "DesserteDetailsIDFM",
    path: "/idfm/:line?/:trip?",
    component: ScreenIDFM,
  },
  {
    name: "Editor",
    path: "/editor/:line?/:trip?",
    component: Editor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
