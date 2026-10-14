import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true → acessível por outros dispositivos na mesma rede (Wi-Fi)
  // porta exclusiva (strictPort: não "pula" para outra porta se estiver ocupada,
  // assim o endereço da rede é sempre o mesmo e não se confunde com outros projetos)
  server: { host: true, port: 5190, strictPort: true },
  preview: { host: true, port: 4190, strictPort: true },
})
