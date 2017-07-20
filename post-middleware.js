const koa = require("koa")
const fs = require("fs")
const bodyParser = require('koa-bodyparser')
const app = new koa()
app.use(bodyParser())
var reader = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
app.use(async (ctx) => {
  if (ctx.url == "/" && ctx.method == "GET") {
    const html = await reader('./view/from.html')
    ctx.body = html
  } else if (ctx.url == "/" && ctx.method == "POST") {
    const postData = ctx.request.body
    ctx.body = postData
  } else {
    const html = await reader('./view/404.html')
    ctx.body = html
  }
})
app.listen(4000, () => {
  console.log('listening in 4000')
})
