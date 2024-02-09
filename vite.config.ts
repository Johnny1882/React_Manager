import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import styleImport,{AntdResolve} from '/Users/wujunyi/React_Project_1/node_modules/vite-plugin-style-import/dist/index.js'
import * as path  from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // styleImport({
    //   resolves: [
    //     AntdResolve()
    //   ],
    // }),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})



