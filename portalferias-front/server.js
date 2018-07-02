const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 8071

const app = express()

app.use(history())
app.use(serveStatic(`${__dirname}/dist/spa-mat`))
app.listen(port)

console.log('server started ' + port)
