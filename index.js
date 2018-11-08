const Koa = require('koa')
const app = new Koa()



const server = async (ctx, next) => {
  let result = {
    success: true,
    data: null
  }

  if (ctx.method === 'GET') {
    if (ctx.url === '/getString.json') {
      result.data = 'this is string data'
    } else if (ctx.url === '/getNumber.json') {
      result.data = 123456
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else if (ctx.method === 'POST') {
    if (ctx.url === '/postData.json') {
      result.data = 'ok'
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else {
    ctx.body = 'hello world'
    next && next()
  }
}

app.use(server)
console.log(process.env.PORT)
app.listen(process.env.PORT ||5000,()=>{
  console.log('[demo]')
})

module.exports = app
