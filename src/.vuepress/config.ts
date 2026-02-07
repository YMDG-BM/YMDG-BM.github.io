import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "KanaDE Wiki",
      description: "KanaDE的个人笔记存储站",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
