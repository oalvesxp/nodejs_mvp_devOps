import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: '../api/src/swagger.json',
    output: {
      clean: true,
      target: './src/hooks/api/api.ts',
      mode: 'tags-split',
      httpClient: 'fetch',
      client: 'fetch',
      baseUrl: 'http://localhost:3000'
    }
  }
})