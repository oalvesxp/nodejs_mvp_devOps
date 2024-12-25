import { env } from './env'
import { app } from './app'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

app.addHook('onResponse', async (req, rep) => {
  const logData = {
    method: req.method,
    path: req.url,
    statusCode: rep.statusCode,
  };

  console.log(`[${new Date().toISOString()}] ${logData.method} ${logData.path} -> ${logData.statusCode}`);
});

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server is running on port: ${env.PORT}`)
  })

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(resolve(__dirname, 'swagger.json'), JSON.stringify(spec, null, 2), 'utf8')
})
