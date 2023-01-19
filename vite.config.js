import { defineConfig } from 'vite'
import { resolve } from "path";

export default defineConfig({

  root:"src",
  base:"",
  build:{
    rollupOptions:{
        input:resolve(__dirname,"src/index.html"),
    },
    outDir: resolve(__dirname,"public")
  },
  emptyOutDir: true,
  
})
