import { env } from './env'
import { app } from './app'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(resolve(__dirname, 'swagger.json'), JSON.stringify(spec, null, 2), 'utf8')
})