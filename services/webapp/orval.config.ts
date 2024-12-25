import { defineConfig } from 'orval'
import { env } from './src/env'

export default defineConfig({
  api: {
    input: '../api/src/swagger.json',
    output: {
      clean: true,
      target: './src/hooks/api/api.ts',
      mode: 'tags-split',
      httpClient: 'fetch',
      client: 'fetch',
      baseUrl: `${env.REACT_APP_API_URL}:3000`
    }
  }
})