const koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const api = require('./router/index')
const app = new koa()
const mongoose = require('mongoose')
const config = require('./config')
mongoose.connect(config.db, (err) => {
    if (err) {
      console.err('Faild to connect mongodb')
    } else {
        console.log('success connected')
    }
})

app.use(require('koa-static')(__dirname + '/public'))
app.use(logger())
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world'
}).routes()
app.use(index)
app.use(bodyParser())
app.use(api.routes())

app.listen(3000)