import { defineConfig } from 'vite'
import { resolve } from "path";

export default defineConfig({

  root:"",
  base:"",
  build:{
    rollupOptions:{
        input:resolve(__dirname,"index.html"),
        
        
    },
    
    outDir: resolve(__dirname,"public")
  },
  
  emptyOutDir: true,
  
})
