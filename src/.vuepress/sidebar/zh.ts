import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    "portfolio",
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
  ],
});
