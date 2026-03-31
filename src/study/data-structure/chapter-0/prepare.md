---
title: 第零章——第一幕：启程——准备环境
icon: material-symbols:power-outline
order: 1
category:
  - 数据结构
tag:
  - C/C++
---

## 准备

为了开始我们的数据结构之旅，我们需要准备一些必要的工具。目前我们需要的工具有：**gcc** **git**，以及最重要的：编辑器。

这里我们选用**nvim**。期间如果需要其他工具或者美化配置，请自行安装，此处不再赘述。既然你选择阅读这份学习笔记，我们默认你拥有最基本的自行解决问题以及信息搜集与整合的能力。

由于笔者是Arch Linux环境，所以这里只讲述Arch Linux上这些工具的安装方式。其他环境请自行STFW，或者ATFA。
<!-- more -->
首先更新pacman本地数据库：
```bash
sudo pacman -Syu
```
等待更新完成后，然后安装前面提到的这些工具链。
```bash
sudo pacman -S gcc git
```
安装好后，我们找一个喜欢的地方，创建我们的数据结构学习文件夹。

```bash
mkdir ~/data_structure
cd ~/data_structure
```

然后，我们就可以用nvim打开这个文件夹，开始我们的编辑了。

```bash
nvim .
```

为了进行我们的学习进度追踪，以及更好地debug，强烈推荐对这个文件夹 git 化。

可以通过在终端中执行
```bash
git init
```
来进行初始化。

::: important
nvim 怎么用？ STFW，RTFM。

git 怎么用？ STFW，RTFM。
:::