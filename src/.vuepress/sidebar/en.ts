import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "档案主页",
      icon: "address-card",
      prefix: "/portfolio/",
      link: "/portfolio/",
      children: "structure",
    },
    {
      text: "指南",
      icon: "compass",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "运维",
      icon: "laptop-code",
      prefix: "operation/",
      link: "operation/",
      children: "structure",
    },
    {
      text: "纸上得来",
      icon: "codicon:note",
      prefix: "articles/",
      link: "articles/",
      children: "structure",
    },
    {
      text: "学习笔记",
      icon: "book",
      prefix: "study/",
      link: "study/",
      children: "structure",
    },
    {
      text: "CTF",
      icon: "flag",
      prefix: "ctf/",
      link: "ctf/",
      children: "structure",
    },
    {
      text: "Wiki",
      icon: "mdi:earth",
      prefix: "wiki/",
      link: "wiki/",
      children: "structure",
    },
    {
      text: "除此之外...",
      icon: "eos-icons:miscellaneous",
      prefix: "misc/",
      link: "misc/",
      children: "structure",
    },
  ],
});
