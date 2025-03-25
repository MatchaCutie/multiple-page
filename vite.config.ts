import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { renameSync, readFileSync, writeFileSync, readdirSync } from 'fs'

// loadEnv(MODE, process.cwd())相当于拿.env.MODE中的配置文件，注：VITE开头的变量会被暴露到浏览器环境中
// console.log('loadEnv', loadEnv('development', process.cwd()))

function autoFindEntries() {
  const pagesDir = resolve(__dirname, 'pages')

  return readdirSync(pagesDir)
    .filter((file) => file.endsWith('.html'))
    .reduce(
      (entries, file) => {
        const entryName = file.replace('.html', '')
        entries[entryName] = resolve(pagesDir, file)
        return entries
      },
      {} as Record<string, string>,
    )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'move-html',
      closeBundle() {
        for (const entryName in autoFindEntries()) {
          const srcPath = `dist/pages/${entryName}.html`
          const destPath = `dist/${entryName}.html`
          renameSync(srcPath, destPath)
          let html = readFileSync(destPath, 'utf-8')
          html = html.replace(/"\.\.\//g, '"./')
          writeFileSync(destPath, html)
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        ...autoFindEntries(),
      },
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  base: './',
  server: {
    open: true,
    port: 3000,
  },
})
