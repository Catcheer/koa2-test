const Koa = require('koa')
const fs = require('fs')
const LoggerAsync = require("./middle-ware/logger-async")
const TimeNow = require("./middle-ware/timeNow")
const app = new Koa()


// app.use(LoggerAsync())
// app.use(TimeNow())


var readHtml = function (page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}


async function route(url) {
  let view = '/404.html'
  switch (url) {
    case "/":
    case "/index":
      view = "index.html"
      break;
    case "/todo":
      view = "todo.html"
      break;
    default:
      break;
  }
  var html = await readHtml(view)
  return html

}


app.use(async (ctx) => {
  const url = ctx.request.url
  console.log(url)
  const page = await route(url)
  console.log(page)
  ctx.body = page
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')