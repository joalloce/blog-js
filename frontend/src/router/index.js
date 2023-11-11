import { createRouter, createWebHistory } from "vue-router";

import CreateArticle from "@/views/article/Create.vue";
import EditArticle from "@/views/article/Edit.vue";
import EditProfile from "@/views/profile/Edit.vue";
import Home from "@/views/Home.vue";
import ListArticle from "@/views/article/List.vue";
import NotFound from "@/views/NotFound.vue";
import ShowArticle from "@/views/article/Show.vue";
import ShowProfile from "@/views/profile/Show.vue";

import { SITE_TITLE } from "@/config.js";

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: `Home - ${SITE_TITLE}`,
      },
    },
    {
      path: "/articles/",
      name: "Articles",
      component: ListArticle,
      meta: {
        title: `Articles - ${SITE_TITLE}`,
      },
    },
    {
      path: "/show-article/:id",
      name: "Article",
      component: ShowArticle,
      meta: {
        title: `Article - ${SITE_TITLE}`,
      },
    },
    {
      path: "/show-profile/:id",
      name: "Profile",
      component: ShowProfile,
      meta: {
        title: `Profile - ${SITE_TITLE}`,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not Found",
      component: NotFound,
      meta: {
        title: `Not Found - ${SITE_TITLE}`,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
