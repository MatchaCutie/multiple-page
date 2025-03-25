# Project Structure Overview

VITE多页面入口打包配置
node版本：20.5.0（个人使用）

## 📁 Directory Structure

# 项目完整目录结构说明

以下是项目的详细目录结构及核心文件功能介绍：

---

## 📂 目录结构详解

### **`/dist/`**

- **构建输出目录**
- 通过 `npm run build` 打包
- 此目录内容可直接部署
- 入口文件全放在最外层（便于使用服务器地址直接加/welcome.html访问），资源文件统一放assets，区分各种文件的文件夹

### **`/pages/`**

- **页面组件目录**
- 多页面的独立入口的 HTML 文件
- **`/entries/`** 存放个各页面的入口ts

### **`/public/`**

- **静态资源目录**
- 直接复制到构建输出的根目录（`/dist/`），不会被 Vite 处理
- `favicon.ico`：网站图标文件，浏览器标签页显示

---

## 📄 关键文件说明

### **`index.html`**

- **主入口 HTML 文件**
- Vite 构建的默认入口，包含 `<div id="root">` 挂载点
- 自动注入打包后的 JS/CSS 资源

## 开发流程

- 开发可以使用 http://localhost:3000/pages/welcome.html
- 或者想看部署效果，可以先 `npm run build` ,然后执行 `npm run preview`
