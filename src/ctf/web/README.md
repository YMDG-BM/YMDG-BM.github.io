---
title: Web安全
order: 4
dir:
  order: 4
  link: true
index: false
icon: ri:earth-fill
category:
  - CTF
  - Web
---

网络协议与代码逻辑交织成层层迷雾，Web安全便是这场博弈的棋盘。SQL 注入、XSS、CSRF、SSRF、反序列化——每个漏洞都是一扇虚掩的后门，考验你对输入输出的绝对掌控。在 CTF 的 Web 赛题中，你既是用户也是攻击者，从 URL 参数、Cookie、Header 中寻找那一丝被忽略的信任边界。真正的挑战不在于工具的数量，而在于能否像开发者一样思考，再像破坏者一样重构。

### 🗺️ 技能地图
Web 方向是 CTF 中入门最快、也最贴近日常开发的赛道。你需要掌握以下核心板块：
- **前置知识**：HTTP/HTTPS 协议原理、Linux 基础操作、前端三剑客（HTML/JS/CSS）。
- **后端语言**：PHP（世界上最好的语言，CTF中出现频率极高）、Python、Java（进阶必修）、Go/Node.js。
- **常见漏洞**：
  - 注入类：SQL 注入、命令注入（RCE）、模板注入（SSTI）。
  - 客户端与跨站：XSS、CSRF、SSRF。
  - 文件处理：文件上传漏洞、文件包含漏洞。
  - 高阶利用：PHP/Java 反序列化、内存马、各种 Bypass（绕过）技巧。

### 🛠️ 军火库（常用工具）
- **Burp Suite**：Web 安全的灵魂，抓包、改包、重放、爆破的终极利器。
- **HackBar**：浏览器插件，便于快速修改参数和提交 Payload。
- **Dirsearch / 御剑**：目录与敏感文件扫描工具。
- **Sqlmap**：自动化 SQL 注入工具（但在 CTF 中，多数情况需要你手写 Payload）。
- **AntSword (蚁剑) / 冰蝎 / 哥斯拉**：WebShell 连接与管理工具。
::: note
这些工具都需要你自己去寻找与安装。
:::
### 💡 萌新建议
不要一开始就陷入“用工具一把梭”的陷阱！遇到漏洞，先弄清楚**代码为什么会出问题**。建议在本地用 Docker 搭建漏洞环境（如 DVWA、sqli-labs），一边写代码，一边黑掉它。

受限于技术与能力，本部分我们只更新新手入门最常见的几种题型。
<Catalog />